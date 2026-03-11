# ICMP & Network Troubleshooting

## Internet Control Message Protocol (ICMP)

ICMP is a **Layer 3 protocol** (IP Protocol 1) used for error reporting and diagnostics. It does not carry application data — it carries control messages about the network itself.

### Key ICMP Message Types

| Type | Code | Name | Purpose |
|------|------|------|---------|
| 0 | 0 | Echo Reply | Response to ping |
| 3 | 0 | Destination Unreachable: Net | No route to network |
| 3 | 1 | Destination Unreachable: Host | Host is down or unreachable |
| 3 | 3 | Destination Unreachable: Port | No process listening on port |
| 3 | 13 | Destination Unreachable: Admin | Blocked by ACL/firewall |
| 8 | 0 | Echo Request | Ping request |
| 11 | 0 | Time Exceeded | TTL expired in transit |

### ICMPv6

IPv6 uses ICMPv6 (IP Protocol 58) which includes the same diagnostic functions plus NDP. ICMPv6 is **required** for IPv6 to function — do not block it entirely with ACLs.

---

## Ping

Ping sends **ICMP Echo Requests** and listens for **Echo Replies** to test reachability.

### Ping Output Interpretation

| Symbol | Meaning |
|--------|---------|
| `!` | Reply received (success) |
| `.` | Timeout — no reply |
| `U` | Destination unreachable |
| `Q` | Source quench |
| `M` | Fragment needed but DF set |

### Extended Ping (Cisco IOS)

Use `ping` in privileged exec without arguments for extended options:
- Set source interface/IP
- Set repeat count and timeout
- Set packet size
- Set DF (Don't Fragment) bit

---

## Traceroute

Traceroute maps the **hop-by-hop path** to a destination by exploiting TTL behavior.

### How Traceroute Works

1. Send packets with **TTL=1** → first router decrements to 0, returns ICMP Time Exceeded
2. Send packets with **TTL=2** → second router returns Time Exceeded
3. Continue incrementing TTL until the destination responds with Echo Reply (or Port Unreachable for UDP-based traceroute)
4. Each hop's IP address and round-trip time are recorded

### Traceroute Output

```
1  192.168.1.1     2ms   1ms   1ms
2  10.0.0.1        5ms   4ms   5ms
3  172.16.0.1      *     12ms  11ms
4  8.8.8.8         15ms  14ms  15ms
```

- Three probes per hop by default
- `*` means no response (timeout) for that probe
- `!H` = host unreachable, `!N` = network unreachable, `!A` = administratively prohibited

### Cisco IOS vs Standard Traceroute

| Feature | Cisco IOS (`traceroute`) | Linux/Windows (`tracert`) |
|---------|-------------------------|--------------------------|
| Protocol | UDP (default) | ICMP Echo (Windows), UDP (Linux) |
| Source control | Yes (extended traceroute) | Limited |

---

## Network Troubleshooting Methodology

### Bottom-Up Approach

Start at **Layer 1** and work up. Best when you suspect a physical issue.

1. **Physical** — Check cables, link lights, interface status (`show interfaces`)
2. **Data Link** — Check MAC table, VLAN assignment, trunking (`show mac address-table`)
3. **Network** — Check IP addressing, routing table, ACLs (`show ip route`, `ping`)
4. **Transport** — Check port reachability, NAT translations
5. **Application** — Check service configuration, DNS resolution

### Top-Down Approach

Start at **Layer 7** and work down. Best when the application is clearly failing.

1. Test the application (HTTP, DNS query, etc.)
2. Test transport connectivity (telnet to port)
3. Test network reachability (ping, traceroute)
4. Test Layer 2 (ARP table, MAC table)
5. Test physical (cable, interface status)

### Divide-and-Conquer Approach

Start at **Layer 3** (the middle) and go up or down based on results. Most efficient for experienced troubleshooters.

1. **Ping the destination** — if it works, problem is Layer 4–7; if not, go down to Layer 1–2
2. **Ping the default gateway** — if it fails, problem is local (L1/L2)
3. **Traceroute** — identifies where in the path connectivity breaks

### Common Troubleshooting Commands

| Command | Purpose |
|---------|---------|
| `show ip interface brief` | Quick view of interface status and IP addresses |
| `show interfaces` | Detailed interface stats (errors, CRC, collisions) |
| `show ip route` | View the routing table |
| `ping` | Test Layer 3 reachability |
| `traceroute` | Identify the path and where it breaks |
| `show arp` | View ARP cache (IP-to-MAC mappings) |
| `show mac address-table` | View MAC table on a switch |
| `show ip protocols` | View routing protocol configuration |
| `show access-lists` | Check if an ACL is blocking traffic |

## Key Takeaways

- ICMP provides error reporting and diagnostics — it does not carry user data
- Ping tests reachability; traceroute maps the path
- Traceroute works by incrementing TTL and collecting Time Exceeded responses
- Use bottom-up for physical issues, top-down for application issues, divide-and-conquer for efficiency
- Always start troubleshooting by clearly defining the problem and gathering information
