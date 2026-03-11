# Routing Concepts

Routing is the process by which a router selects a path to forward packets toward a destination network. Understanding how routers make forwarding decisions is fundamental to network engineering.

## Routing Table Structure

Every router maintains a routing table containing known destination networks. Each entry includes:

| Field | Description |
|---|---|
| **Network Destination** | The destination network address (e.g., 192.168.1.0) |
| **Subnet Mask / Prefix** | Defines the network portion (e.g., /24 or 255.255.255.0) |
| **Next-Hop** | IP address of the next router in the path |
| **Exit Interface** | Local interface used to reach the next hop |
| **Metric** | Cost value used to compare routes within the same protocol |
| **Administrative Distance (AD)** | Trustworthiness rating used to compare routes from different sources |

### Show IP Route Example

```
Router# show ip route
Codes: C - connected, S - static, O - OSPF, D - EIGRP, R - RIP

Gateway of last resort is 10.0.0.1 to network 0.0.0.0

C    192.168.1.0/24 is directly connected, GigabitEthernet0/0
L    192.168.1.1/32 is directly connected, GigabitEthernet0/0
O    10.10.10.0/24 [110/20] via 10.0.0.1, 00:05:32, GigabitEthernet0/1
S    172.16.0.0/16 [1/0] via 10.0.0.1
S*   0.0.0.0/0 [1/0] via 10.0.0.1
```

The format `[AD/metric]` appears beside each route. For example, `[110/20]` means AD of 110 (OSPF) with a metric of 20.

## Administrative Distance Values

When multiple routing sources provide a route to the same destination, the router prefers the source with the **lowest AD**.

| Route Source | Administrative Distance |
|---|---|
| Connected | 0 |
| Static | 1 |
| eBGP | 20 |
| EIGRP (internal) | 90 |
| OSPF | 110 |
| IS-IS | 115 |
| RIP | 120 |
| EIGRP (external) | 170 |
| iBGP | 200 |

## Connected and Local Routes

When an interface is configured with an IP address and brought up, two routes are automatically added:

- **Connected route (C)** -- Represents the network attached to the interface (e.g., `C 192.168.1.0/24`). Used to reach any host on that subnet.
- **Local route (L)** -- A /32 host route for the router's own interface IP (e.g., `L 192.168.1.1/32`). Used for traffic destined to the router itself.

## Longest Prefix Match

When multiple routes match a destination, the router selects the route with the **longest prefix** (most specific match). AD and metric are only compared among routes with the same prefix length from different sources or same-protocol paths.

**Example:** A packet destined for `10.1.1.50` matches all of the following:

| Route | Prefix Length | Selected? |
|---|---|---|
| 10.0.0.0/8 | /8 | No |
| 10.1.0.0/16 | /16 | No |
| 10.1.1.0/24 | /24 | Yes -- longest match |

## Routing Decision Process

A router follows these steps when forwarding a packet:

1. **Receive packet** on an ingress interface.
2. **Read the destination IP** in the packet header.
3. **Search the routing table** for all matching entries.
4. **Apply longest prefix match** to select the most specific route.
5. If multiple routes share the same prefix length and protocol, **compare metrics** (lower is better).
6. If routes come from different sources with the same prefix, **compare AD** (lower is better).
7. **Forward the packet** out the exit interface toward the next-hop address.
8. If **no match** is found and no default route exists, **drop the packet** and optionally send an ICMP Destination Unreachable message.

Understanding these fundamentals ensures you can read, interpret, and troubleshoot any Cisco routing table on the CCNA exam.
