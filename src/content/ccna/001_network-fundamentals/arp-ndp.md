# ARP & Neighbor Discovery

## Address Resolution Protocol (ARP)

ARP resolves **IPv4 addresses to MAC addresses** so frames can be delivered on the local network. It operates at Layer 2/3 boundary.

### ARP Operation

1. **ARP Request** — Host broadcasts (ff:ff:ff:ff:ff:ff) asking "Who has 192.168.1.1? Tell 192.168.1.10"
2. **ARP Reply** — The owner of that IP responds unicast with its MAC address
3. The sender caches the mapping in its **ARP table**

### ARP Table (Cache)

- Stores recent IP-to-MAC mappings to avoid repeated broadcasts
- Entries expire after a timeout (typically 2–4 minutes on Cisco devices)
- View with `show arp` (router) or `show mac address-table` (switch)
- On a PC: `arp -a`

### Gratuitous ARP

A host sends an ARP reply **without being asked** — announcing its own IP-to-MAC mapping. Used for:
- Updating other hosts' ARP caches after a MAC change
- Detecting IP address conflicts
- HSRP/VRRP failover (new active router announces the virtual MAC)

### Proxy ARP

A router answers ARP requests **on behalf of hosts on another network**. The router replies with its own MAC address so traffic is forwarded through it. Enabled by default on Cisco routers.

### ARP Security Concerns

- **ARP spoofing/poisoning** — An attacker sends fake ARP replies to redirect traffic
- **Mitigation** — Dynamic ARP Inspection (DAI) validates ARP packets against the DHCP snooping binding table

---

## IPv6 Neighbor Discovery Protocol (NDP)

IPv6 replaces ARP with **NDP**, which uses ICMPv6 messages instead of broadcasts.

### Key ICMPv6 Message Types

| Type | Name | Purpose |
|------|------|---------|
| 133 | Router Solicitation (RS) | Host asks for router info |
| 134 | Router Advertisement (RA) | Router announces prefix, default gateway |
| 135 | Neighbor Solicitation (NS) | Resolve IPv6 → MAC (like ARP request) |
| 136 | Neighbor Advertisement (NA) | Reply with MAC address (like ARP reply) |

### Address Resolution with NDP

Instead of broadcasting, NDP uses **solicited-node multicast addresses**:
1. Host sends NS to the solicited-node multicast group (ff02::1:ffXX:XXXX)
2. Only hosts whose address ends in those last 24 bits listen
3. Target responds with NA containing its MAC address

### Duplicate Address Detection (DAD)

Before using an IPv6 address, a host sends an NS for **its own address**:
- If no one responds → address is unique, safe to use
- If someone responds with NA → duplicate detected, address is not used
- DAD runs for both SLAAC and manually configured addresses

### NDP vs ARP Comparison

| Feature | ARP (IPv4) | NDP (IPv6) |
|---------|-----------|-----------|
| Resolution | Broadcast | Solicited-node multicast |
| Protocol | ARP (Layer 2.5) | ICMPv6 (Layer 3) |
| Security | DAI | RA Guard, SEND |
| Additional functions | Address resolution only | Address resolution + SLAAC + router discovery + DAD |

## Key Takeaways

- ARP maps IPv4 → MAC using broadcast request/reply
- Gratuitous ARP announces mappings without a request
- NDP replaces ARP in IPv6 using ICMPv6 and multicast
- DAD ensures no duplicate IPv6 addresses exist on the link
- NDP is more efficient and secure than ARP
