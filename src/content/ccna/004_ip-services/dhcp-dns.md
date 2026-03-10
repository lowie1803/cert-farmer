# DHCP and DNS

## DHCP (Dynamic Host Configuration Protocol)

DHCP automatically assigns IP configuration to devices.

### DHCP DORA Process

| Step | Message | Direction | Description |
|------|---------|-----------|-------------|
| D | Discover | Client → Broadcast | "Anyone have an IP for me?" |
| O | Offer | Server → Client | "Here's an available IP" |
| R | Request | Client → Broadcast | "I'll take that IP" |
| A | Acknowledge | Server → Client | "It's yours, here's the config" |

### DHCP Lease Information

A DHCP lease includes:
- IP address
- Subnet mask
- Default gateway
- DNS server(s)
- Lease duration

### DHCP Relay

When DHCP server is on a different subnet:
- Router must be configured as DHCP relay agent
- Uses `ip helper-address` command
- Converts broadcast to unicast

---

## DNS (Domain Name System)

DNS translates domain names to IP addresses.

### DNS Resolution Process

1. Client checks local cache
2. Query to configured DNS server
3. If unknown, recursive queries to:
   - Root servers (.)
   - TLD servers (.com, .org)
   - Authoritative servers

### DNS Record Types

| Type | Purpose | Example |
|------|---------|---------|
| A | IPv4 address | www → 192.168.1.1 |
| AAAA | IPv6 address | www → 2001:db8::1 |
| CNAME | Alias | www → webserver.domain.com |
| MX | Mail server | Priority + mail server |
| PTR | Reverse lookup | IP → hostname |
| NS | Name server | Authoritative DNS for zone |

### DNS Ports
- UDP 53: Standard queries
- TCP 53: Zone transfers, large responses
