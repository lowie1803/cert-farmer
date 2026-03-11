# FHRP Concepts

First Hop Redundancy Protocols (FHRPs) provide default gateway redundancy so that hosts can continue reaching remote networks even if their primary gateway router fails.

## The Problem: Single Point of Failure

End hosts typically configure a single default gateway IP. If that gateway router goes down, the host loses all connectivity to remote networks -- even if an alternate router exists on the same subnet. FHRPs solve this by allowing multiple routers to share a **virtual IP address** that hosts use as their default gateway.

## HSRP -- Hot Standby Router Protocol

HSRP is a **Cisco proprietary** FHRP and the most commonly tested on the CCNA exam.

### How HSRP Works

- Two or more routers form an HSRP group and share a **virtual IP** and **virtual MAC** address.
- One router is elected **Active** (forwards traffic for the virtual IP).
- One router is elected **Standby** (monitors the Active and takes over if it fails).
- All other routers in the group are in the **Listen** state.

### HSRP Timers and Properties

| Property | Value |
|---|---|
| Hello timer | 3 seconds |
| Hold (dead) timer | 10 seconds |
| Default priority | 100 |
| Preemption | Disabled by default |
| Virtual MAC (v1) | 0000.0c07.acXX (XX = group number in hex) |
| Virtual MAC (v2) | 0000.0c9f.fXXX (XXX = group number in hex) |

### HSRP v1 vs v2

| Feature | HSRPv1 | HSRPv2 |
|---|---|---|
| Group range | 0-255 | 0-4095 |
| Multicast address | 224.0.0.2 | 224.0.0.102 |
| IPv6 support | No | Yes |

### Election Rules

1. **Highest priority** wins the Active role (default priority is 100).
2. If priority is tied, the **highest IP address** on the HSRP interface wins.
3. **Preemption** must be explicitly enabled for a higher-priority router to reclaim the Active role after recovering from a failure.

### Basic HSRP Configuration

```
Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip address 192.168.1.2 255.255.255.0
Router(config-if)# standby 1 ip 192.168.1.1
Router(config-if)# standby 1 priority 110
Router(config-if)# standby 1 preempt
Router(config-if)# standby version 2
```

Hosts on the LAN configure **192.168.1.1** (the virtual IP) as their default gateway.

### Verification

```
Router# show standby
Router# show standby brief
```

## VRRP -- Virtual Router Redundancy Protocol

VRRP is an **IEEE standard** (RFC 5798) that operates similarly to HSRP.

| VRRP Term | HSRP Equivalent |
|---|---|
| Master | Active |
| Backup | Standby |

Key differences from HSRP:

- **Open standard** -- Works across multiple vendors.
- **Preemption enabled by default** (unlike HSRP).
- The virtual IP **can be** the same as a physical interface IP (the router owning that IP automatically becomes Master).
- Default priority is **100** (same as HSRP).

## GLBP -- Gateway Load Balancing Protocol

GLBP is a **Cisco proprietary** protocol that provides both redundancy and **load balancing** across multiple routers.

### GLBP Roles

- **Active Virtual Gateway (AVG)** -- One router per GLBP group answers ARP requests for the virtual IP and assigns virtual MACs.
- **Active Virtual Forwarder (AVF)** -- Each participating router forwards traffic for one virtual MAC address.

When a host ARPs for the virtual IP, the AVG responds with different virtual MACs in a round-robin fashion, distributing traffic across all AVF routers.

## FHRP Comparison Table

| Feature | HSRP | VRRP | GLBP |
|---|---|---|---|
| Standard | Cisco proprietary | IEEE (RFC 5798) | Cisco proprietary |
| Active role name | Active | Master | AVG |
| Standby role name | Standby | Backup | AVF |
| Load balancing | No (Active/Standby) | No (Master/Backup) | Yes (multiple AVFs) |
| Default priority | 100 | 100 | 100 |
| Preemption default | Disabled | Enabled | Disabled |
| Transport | UDP 1985 | IP protocol 112 | UDP 3222 |

Understanding FHRP behavior ensures you can design resilient default gateway architectures and answer scenario-based CCNA questions about failover and election mechanics.
