# IPv6 Addressing

IPv6 uses 128-bit addresses to solve IPv4 address exhaustion. With 2^128 possible addresses (approximately 3.4 x 10^38), IPv6 provides a virtually unlimited address space. Understanding the format, abbreviation rules, and address types is fundamental to the CCNA exam.

## IPv6 Address Format

An IPv6 address is written as eight groups of four hexadecimal digits, separated by colons:

```
2001:0DB8:0000:0000:0000:0000:0000:0001
```

### Abbreviation Rules

Two rules simplify IPv6 address notation:

1. **Leading zero suppression**: Remove leading zeros within each group
   - `0DB8` becomes `DB8`, `0000` becomes `0`, `0001` becomes `1`
2. **Double colon (::)**: Replace one or more consecutive groups of all zeros with `::` — but only **once** per address
   - `2001:0DB8:0000:0000:0000:0000:0000:0001` becomes `2001:DB8::1`

If `::` were used twice, the address would be ambiguous since you could not determine how many zero groups each `::` represents.

## IPv6 Address Types

| Type | Description | Scope |
|------|------------|-------|
| Unicast | Identifies a single interface | Various |
| Multicast | One-to-many delivery to group members | Various |
| Anycast | One-to-nearest (routed to closest interface with that address) | Various |

**Note**: IPv6 has **no broadcast** addresses. Broadcast functionality is replaced by multicast.

## Unicast Address Categories

### Global Unicast Address (GUA)

- Prefix: **2000::/3** (addresses starting with 2 or 3)
- Equivalent to public IPv4 addresses — globally routable on the internet
- Structure: 48-bit global routing prefix + 16-bit subnet ID + 64-bit interface ID

### Link-Local Address

- Prefix: **FE80::/10** (in practice, always FE80::/64)
- Automatically generated on every IPv6-enabled interface
- Not routable — used only for communication on the local link
- Required for NDP, OSPFv3, and next-hop addressing in routing tables

### Unique Local Address (ULA)

- Prefix: **FC00::/7** (FC00::/8 not yet defined; FD00::/8 in use)
- Equivalent to IPv4 private addresses (RFC 1918)
- Routable within an organization but not on the public internet

### Loopback Address

- **::1** — equivalent to 127.0.0.1 in IPv4

### Unspecified Address

- **::** — equivalent to 0.0.0.0 in IPv4, used as a source address before a device has an assigned address

## Common Multicast Addresses

| Address | Scope | Description |
|---------|-------|-------------|
| FF02::1 | Link-local | All nodes on the local link |
| FF02::2 | Link-local | All routers on the local link |
| FF02::5 | Link-local | All OSPFv3 routers |
| FF02::A | Link-local | All EIGRP routers |
| FF02::1:FF00:0/104 | Link-local | Solicited-node multicast |

## EUI-64 Interface ID Generation

EUI-64 creates a 64-bit interface identifier from a device's 48-bit MAC address:

1. Split the MAC address in half: `AA:BB:CC` | `DD:EE:FF`
2. Insert `FF:FE` in the middle: `AA:BB:CC:FF:FE:DD:EE:FF`
3. Flip the 7th bit (U/L bit) of the first byte

**Example**: MAC `00:1A:2B:3C:4D:5E`
- Split: `00:1A:2B` | `3C:4D:5E`
- Insert FFFE: `00:1A:2B:FF:FE:3C:4D:5E`
- Flip 7th bit of `00` (binary `00000000`) to `02` (binary `00000010`)
- Result: `021A:2BFF:FE3C:4D5E`

## IPv6 Prefix Length

IPv6 uses **prefix length** notation (CIDR), not subnet masks:

```
2001:DB8:ACAD:1::1/64
```

The `/64` means the first 64 bits identify the network, and the remaining 64 bits identify the host (interface ID). A `/64` prefix is the standard for most LAN subnets.
