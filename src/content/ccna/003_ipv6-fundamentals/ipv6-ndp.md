# IPv6 Neighbor Discovery Protocol (NDP)

NDP is a critical IPv6 protocol that replaces several IPv4 mechanisms (ARP, ICMP Router Discovery, DHCP redirect) with a single, unified ICMPv6-based framework.

## NDP Functions

NDP handles five key functions:
1. **Router Discovery** — Hosts find local routers
2. **Prefix Discovery** — Hosts learn on-link prefixes
3. **Address Resolution** — Resolve IPv6 addresses to MAC addresses (replaces ARP)
4. **Duplicate Address Detection (DAD)** — Ensure address uniqueness
5. **Redirect** — Routers inform hosts of better next hops

---

## ICMPv6 Message Types Used by NDP

| Type | Name | Abbreviation | Sent By |
|------|------|-------------|---------|
| 133 | Router Solicitation | RS | Hosts |
| 134 | Router Advertisement | RA | Routers |
| 135 | Neighbor Solicitation | NS | Hosts & Routers |
| 136 | Neighbor Advertisement | NA | Hosts & Routers |
| 137 | Redirect | — | Routers |

---

## Router Discovery (RS/RA)

### Router Solicitation (RS) — Type 133
- Sent by a host when it first connects to the network
- Destination: **ff02::2** (all-routers multicast)
- Requests routers to send an immediate RA

### Router Advertisement (RA) — Type 134
- Sent periodically by routers (every 200 seconds by default) and in response to RS
- Destination: **ff02::1** (all-nodes multicast)
- Contains:
  - **Prefix information** (network prefix and prefix length)
  - **Default gateway** (the router's link-local address)
  - **Flags** that tell the host how to obtain addresses:
    - **A flag** (Autonomous) — Use SLAAC to self-assign an address
    - **O flag** (Other) — Contact DHCPv6 for other info (DNS, etc.)
    - **M flag** (Managed) — Use DHCPv6 for full address assignment

### RA Flags and Address Assignment

| A Flag | O Flag | M Flag | Result |
|--------|--------|--------|--------|
| 1 | 0 | 0 | SLAAC only |
| 1 | 1 | 0 | SLAAC + Stateless DHCPv6 (for DNS, etc.) |
| 0 | 0 | 1 | Stateful DHCPv6 (full address from DHCP) |

---

## Address Resolution (NS/NA)

NDP replaces ARP for resolving IPv6 addresses to MAC addresses.

### Neighbor Solicitation (NS) — Type 135

Sent when a host needs the MAC address of another IPv6 host:
- Source: Sender's IPv6 address
- Destination: **Solicited-node multicast** address of the target (ff02::1:ffXX:XXXX)
- Contains the target IPv6 address

### Solicited-Node Multicast Address

Formed by appending the **last 24 bits** of a unicast address to `ff02::1:ff00:0/104`:
- Example: For address `2001:db8::1234:5678`, the solicited-node address is `ff02::1:ff34:5678`
- Only hosts with matching last 24 bits process the NS — far more efficient than broadcast

### Neighbor Advertisement (NA) — Type 136

Sent in response to NS:
- Contains the sender's **MAC address**
- Can also be sent unsolicited (like gratuitous ARP) to announce changes

### Neighbor Cache

Equivalent to the ARP table. View with:
- Cisco IOS: `show ipv6 neighbors`
- Linux: `ip -6 neigh show`
- Windows: `netsh interface ipv6 show neighbors`

---

## Duplicate Address Detection (DAD)

DAD ensures every IPv6 address on a link is unique. It runs **before** a host uses any new address.

### DAD Process

1. Host assigns the address in **tentative** state (cannot send/receive normal traffic)
2. Host sends an NS with:
   - Source: `::` (unspecified address — the host has no confirmed address yet)
   - Destination: Solicited-node multicast of the tentative address
   - Target: The tentative address itself
3. Host waits for a response:
   - **No NA received** → Address is unique, promoted to active state
   - **NA received** → Another host owns this address, address is not used

### When DAD Runs
- After SLAAC generates an address
- After manual/static IPv6 address configuration
- After DHCPv6 assigns an address
- On link-local address generation at boot

---

## SLAAC and NDP Interaction

**Stateless Address Autoconfiguration (SLAAC)** depends entirely on NDP:

1. Host generates a **link-local address** (fe80::/10 + interface ID) and runs DAD
2. Host sends **RS** to ff02::2
3. Router responds with **RA** containing prefix and flags
4. If A flag is set, host combines the prefix with its interface ID (EUI-64 or random) to form a **global unicast address**
5. Host runs **DAD** on the new global address
6. Host installs the router's link-local address as its **default gateway**

---

## NDP Security

NDP is susceptible to attacks similar to ARP spoofing:
- **Rogue RA** — An attacker sends fake Router Advertisements
- **NS/NA spoofing** — An attacker sends fake Neighbor Advertisements

### Mitigation

| Feature | Protection |
|---------|-----------|
| **RA Guard** | Blocks RAs on non-router ports |
| **DHCPv6 Guard** | Blocks rogue DHCPv6 servers |
| **IPv6 ND Inspection** | Validates NS/NA messages (like DAI for IPv6) |
| **SEND (SEcure NDP)** | Cryptographic verification of NDP messages (rarely deployed) |

## Key Takeaways

- NDP unifies router discovery, address resolution, and DAD into one ICMPv6-based protocol
- RS/RA handle router and prefix discovery; NS/NA handle address resolution
- Solicited-node multicast makes address resolution more efficient than ARP broadcasts
- DAD runs before any IPv6 address is used to prevent duplicates
- RA flags (A, O, M) determine whether hosts use SLAAC, DHCPv6, or both
- Secure NDP with RA Guard and ND Inspection on switch ports
