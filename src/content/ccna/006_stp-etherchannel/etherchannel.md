# EtherChannel and Discovery Protocols

## EtherChannel Overview

EtherChannel bundles multiple physical switch links (up to 8) into a single logical link. STP treats the bundle as one interface, so no ports are blocked. This provides increased bandwidth, redundancy, and load balancing without triggering spanning tree recalculations.

### Benefits

- **Aggregated bandwidth** — a 4-port GigabitEthernet bundle provides up to 4 Gbps throughput
- **Redundancy** — if one member link fails, traffic redistributes across remaining links
- **Load balancing** — based on source/destination MAC, IP, or port numbers
- **STP efficiency** — one logical link means no blocked redundant ports

## Negotiation Protocols

| Feature | LACP (802.3ad) | PAgP (Cisco Proprietary) |
|---------|----------------|--------------------------|
| Standard | IEEE 802.3ad | Cisco only |
| Modes | Active / Passive | Desirable / Auto |
| Max Links | 16 (8 active + 8 standby) | 8 |
| Recommendation | Preferred (industry standard) | Legacy Cisco environments |

### Mode Combinations

| Side A | Side B | Channel Forms? |
|--------|--------|:--------------:|
| LACP Active | LACP Active | Yes |
| LACP Active | LACP Passive | Yes |
| LACP Passive | LACP Passive | No |
| PAgP Desirable | PAgP Desirable | Yes |
| PAgP Desirable | PAgP Auto | Yes |
| PAgP Auto | PAgP Auto | No |
| On | On | Yes (no negotiation) |

At least one side must be in the initiating mode (active or desirable) for the channel to form.

## EtherChannel Configuration

```
Switch(config)# interface range gi0/1 - 2
Switch(config-if-range)# channel-group 1 mode active
Switch(config-if-range)# exit
Switch(config)# interface port-channel 1
Switch(config-if)# switchport mode trunk
```

All member ports must share the same speed, duplex, VLAN assignment, and trunking mode.

### Verification

```
Switch# show etherchannel summary
Switch# show etherchannel port-channel
Switch# show etherchannel load-balance
```

## Cisco Discovery Protocol (CDP)

CDP is a **Cisco proprietary** Layer 2 protocol that discovers directly connected Cisco devices. It runs by default on all Cisco interfaces and shares:

- Device ID (hostname)
- Local and remote interface IDs
- Platform and capabilities
- IP address of the neighbor
- Native VLAN and duplex settings

### CDP Commands

```
Switch# show cdp neighbors
Switch# show cdp neighbors detail
Switch# show cdp entry *
Switch(config)# no cdp run                    ! Disable globally
Switch(config-if)# no cdp enable              ! Disable per interface
```

## Link Layer Discovery Protocol (LLDP)

LLDP (IEEE 802.1AB) is the **vendor-neutral** alternative to CDP. It must be explicitly enabled on Cisco devices and provides similar neighbor discovery across multi-vendor networks.

### LLDP Commands

```
Switch(config)# lldp run
Switch(config-if)# lldp transmit
Switch(config-if)# lldp receive
Switch# show lldp neighbors
Switch# show lldp neighbors detail
```

### CDP vs LLDP Comparison

| Feature | CDP | LLDP |
|---------|-----|------|
| Standard | Cisco proprietary | IEEE 802.1AB |
| Default State | Enabled on Cisco | Disabled on Cisco |
| Layer | 2 | 2 |
| Timer | 60 seconds | 30 seconds |
| Holdtime | 180 seconds | 120 seconds |

Both protocols are essential for network documentation and troubleshooting neighbor connectivity issues.
