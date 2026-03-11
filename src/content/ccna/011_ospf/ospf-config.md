# OSPF Configuration

This module covers the practical configuration and verification of single-area OSPFv2 on Cisco IOS routers.

## Basic OSPFv2 Configuration

Enable OSPF and advertise networks into Area 0:

```
Router(config)# router ospf 1
Router(config-router)# router-id 1.1.1.1
Router(config-router)# network 192.168.1.0 0.0.0.255 area 0
Router(config-router)# network 10.0.0.0 0.0.0.3 area 0
```

- **Process ID** (1 in the example) is locally significant and does not need to match between neighbors.
- The **network** command matches interfaces whose IP addresses fall within the specified range and activates OSPF on those interfaces.
- All interfaces should be placed in **area 0** for single-area designs.

## Wildcard Mask Calculation

The wildcard mask is the inverse of the subnet mask. Subtract each octet of the subnet mask from 255:

| Subnet Mask | Wildcard Mask |
|---|---|
| 255.255.255.0 (/24) | 0.0.0.255 |
| 255.255.255.252 (/30) | 0.0.0.3 |
| 255.255.255.128 (/25) | 0.0.0.127 |
| 255.255.0.0 (/16) | 0.0.255.255 |
| 255.255.255.240 (/28) | 0.0.0.15 |

**Shortcut:** You can also advertise a single interface exactly by using `0.0.0.0` as the wildcard with the interface IP:

```
Router(config-router)# network 192.168.1.1 0.0.0.0 area 0
```

## Passive Interfaces

A passive interface participates in OSPF (its network is advertised) but does **not** send or receive Hello packets. Use this on LAN interfaces facing end devices:

```
Router(config-router)# passive-interface GigabitEthernet0/0
```

To make all interfaces passive by default and then selectively enable OSPF on uplinks:

```
Router(config-router)# passive-interface default
Router(config-router)# no passive-interface GigabitEthernet0/1
```

## OSPF Cost Calculation

OSPF cost is calculated as:

```
Cost = Reference Bandwidth / Interface Bandwidth
```

The default reference bandwidth is **100 Mbps** (100,000,000 bps).

| Interface | Bandwidth | Default Cost |
|---|---|---|
| Loopback | -- | 1 |
| GigabitEthernet (1 Gbps) | 1,000 Mbps | 1 |
| FastEthernet (100 Mbps) | 100 Mbps | 1 |
| Serial (1.544 Mbps) | 1.544 Mbps | 64 |

Notice that FastEthernet and GigabitEthernet both compute to cost 1 with the default reference bandwidth. This makes OSPF unable to distinguish between them.

### Changing Reference Bandwidth

Increase the reference bandwidth on **all** routers in the OSPF domain to differentiate high-speed links:

```
Router(config-router)# auto-cost reference-bandwidth 10000
```

With a 10,000 Mbps reference:

| Interface | New Cost |
|---|---|
| 10 GigabitEthernet | 1 |
| GigabitEthernet | 10 |
| FastEthernet | 100 |

### Manual Cost Assignment

Override the calculated cost on a specific interface:

```
Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip ospf cost 50
```

## Router ID Configuration

Explicitly set the router ID (recommended best practice):

```
Router(config)# router ospf 1
Router(config-router)# router-id 1.1.1.1
```

If changed after OSPF is running, reload the process:

```
Router# clear ip ospf process
```

## Verification Commands

| Command | Purpose |
|---|---|
| `show ip ospf neighbor` | Display neighbor adjacencies, states, DR/BDR info |
| `show ip ospf interface` | Show OSPF-enabled interfaces, cost, timers, area |
| `show ip ospf interface brief` | Summary of OSPF interfaces with cost and state |
| `show ip route ospf` | Display only OSPF-learned routes |
| `show ip ospf database` | View the LSDB contents |
| `show ip protocols` | Confirm OSPF process, RID, networks, and passive interfaces |

```
Router# show ip ospf neighbor

Neighbor ID  Pri  State       Dead Time  Address       Interface
2.2.2.2        1  FULL/BDR    00:00:33   10.0.0.2      Gi0/1
3.3.3.3        1  FULL/DR     00:00:37   10.0.0.3      Gi0/1
```

Consistently verify adjacency states. A neighbor stuck in **INIT** or **2-WAY** indicates a configuration mismatch or DR/BDR election issue.
