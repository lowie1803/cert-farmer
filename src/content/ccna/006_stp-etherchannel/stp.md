# Spanning Tree Protocol

Spanning Tree Protocol (STP), defined in IEEE 802.1D, prevents Layer 2 loops in networks with redundant switch links. Without STP, broadcast storms, MAC table instability, and duplicate frames would render a switched network unusable.

## Bridge ID and Root Bridge Election

Every switch running STP has a **Bridge ID (BID)** composed of two fields:

| Field | Size | Default |
|-------|------|---------|
| Bridge Priority | 16 bits (in multiples of 4096) | 32768 |
| MAC Address | 48 bits | Switch base MAC |

The switch with the **lowest BID** is elected the **root bridge**. Priority is compared first; if tied, the lowest MAC address wins. You can influence the election:

```
Switch(config)# spanning-tree vlan 1 priority 4096
Switch(config)# spanning-tree vlan 1 root primary
```

## STP Port Roles

- **Root Port (RP)** — the port on a non-root switch with the lowest cost path to the root bridge. One per non-root switch.
- **Designated Port (DP)** — the port on each segment that forwards traffic toward the root bridge. The root bridge has all designated ports.
- **Non-Designated (Blocked) Port** — a port that does not forward traffic; it receives BPDUs to monitor the topology.

## STP Port States

| State | Forwards Data | Learns MACs | Duration |
|-------|:---:|:---:|----------|
| Blocking | No | No | Until topology change |
| Listening | No | No | 15 seconds (forward delay) |
| Learning | No | Yes | 15 seconds (forward delay) |
| Forwarding | Yes | Yes | Stable state |
| Disabled | No | No | Administratively shut down |

## STP Timers

| Timer | Default | Purpose |
|-------|---------|---------|
| Hello | 2 seconds | Interval between BPDU transmissions from root |
| Forward Delay | 15 seconds | Time in listening and learning states |
| Max Age | 20 seconds | Time a switch stores a BPDU before discarding |

Convergence with classic STP can take **30-50 seconds** (max age + 2x forward delay).

## Rapid Spanning Tree Protocol (RSTP) — 802.1w

RSTP dramatically improves convergence to **sub-second** times through active topology negotiation instead of passive timer expiration.

### RSTP Port States

| STP State | RSTP State |
|-----------|------------|
| Blocking | Discarding |
| Listening | Discarding |
| Learning | Learning |
| Forwarding | Forwarding |

RSTP introduces **alternate ports** (backup for root port) and **backup ports** (backup for designated port), enabling immediate failover.

## PortFast and BPDU Guard

**PortFast** transitions an access port directly to forwarding, skipping listening and learning. Use it only on ports connected to end devices, never on switch-to-switch links.

**BPDU Guard** shuts down a PortFast-enabled port if it receives a BPDU, preventing rogue switches from disrupting the topology.

```
Switch(config)# spanning-tree portfast default
Switch(config)# spanning-tree portfast bpduguard default

Switch(config-if)# spanning-tree portfast
Switch(config-if)# spanning-tree bpduguard enable
```

## Verification Commands

```
Switch# show spanning-tree
Switch# show spanning-tree vlan 1
Switch# show spanning-tree summary
Switch# show spanning-tree interface gi0/1 detail
Switch# show spanning-tree root
```

These commands display the root bridge ID, local port roles and states, and active timers for each VLAN.
