# Layer 2 Security

Layer 2 attacks exploit the trust inherent in switching operations. DHCP snooping, Dynamic ARP Inspection (DAI), and port security are essential defenses that protect the access layer from common attacks.

## DHCP Snooping

DHCP snooping prevents rogue DHCP servers from distributing incorrect IP configuration to clients. It works by classifying switch ports as **trusted** or **untrusted**.

- **Trusted ports** — Connected to legitimate DHCP servers or uplinks (allow all DHCP messages)
- **Untrusted ports** — Connected to end hosts (block DHCP server messages like OFFER and ACK)

DHCP snooping builds a **binding table** that maps client MAC addresses to assigned IP addresses, lease times, VLAN, and interface. This table is also used by DAI and IP Source Guard.

### DHCP Snooping Configuration

```
Switch(config)# ip dhcp snooping
Switch(config)# ip dhcp snooping vlan 10,20
Switch(config)# no ip dhcp snooping information option
Switch(config)# interface gi0/1
Switch(config-if)# ip dhcp snooping trust
Switch(config-if)# exit
Switch# show ip dhcp snooping binding
```

By default, all ports are untrusted. Only configure trusted on uplinks and ports connected to legitimate DHCP servers. The `no ip dhcp snooping information option` command is often needed when the switch is not a relay agent to prevent DHCP failures.

## Dynamic ARP Inspection (DAI)

DAI validates ARP packets using the DHCP snooping binding table. It prevents **ARP spoofing** (ARP poisoning) attacks where an attacker sends false ARP replies to redirect traffic through their device (man-in-the-middle).

### DAI Configuration

```
Switch(config)# ip arp inspection vlan 10,20
Switch(config)# interface gi0/1
Switch(config-if)# ip arp inspection trust
Switch# show ip arp inspection
```

- Trusted ports skip ARP inspection (uplinks, connections to routers)
- Untrusted ports have all ARP packets validated against the DHCP snooping binding table
- DAI **requires DHCP snooping** to be enabled first (it uses the binding table)
- For hosts with static IPs, configure ARP ACLs to permit their traffic

## Port Security

Port security limits the number of MAC addresses allowed on a switch port, preventing MAC flooding attacks and unauthorized device connections.

### Port Security Configuration

```
Switch(config)# interface fa0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport port-security
Switch(config-if)# switchport port-security maximum 2
Switch(config-if)# switchport port-security mac-address sticky
Switch(config-if)# switchport port-security violation restrict
Switch# show port-security interface fa0/1
```

- Port security requires the port to be in **access** or **trunk** mode (not dynamic)
- **Sticky learning** dynamically learns MAC addresses and adds them to the running config
- The default maximum is 1 MAC address

### Violation Modes

| Mode | Drops Traffic | Logs / Sends SNMP | Increments Counter | Port State |
|------|:---:|:---:|:---:|------------|
| **Protect** | Yes | No | No | Stays up |
| **Restrict** | Yes | Yes | Yes | Stays up |
| **Shutdown** (default) | Yes | Yes | Yes | err-disabled |

### Recovery from err-disabled State

When a port enters err-disabled state due to a security violation, it must be manually recovered:

```
Switch(config)# interface fa0/1
Switch(config-if)# shutdown
Switch(config-if)# no shutdown
```

Or configure automatic recovery:

```
Switch(config)# errdisable recovery cause psecure-violation
Switch(config)# errdisable recovery interval 300
```

## Defense-in-Depth

These Layer 2 security features work together:

- **DHCP snooping** builds the binding table and stops rogue DHCP servers
- **DAI** uses the binding table to validate ARP and prevent spoofing
- **Port security** limits MAC addresses per port to prevent flooding attacks

Enable all three on access-layer switches for comprehensive Layer 2 protection.
