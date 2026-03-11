# IPv4 Addressing

## Address Structure

- **32 bits** divided into 4 octets
- Each octet: 0-255
- Example: `192.168.1.100`
- Binary: `11000000.10101000.00000001.01100100`

## Address Classes (Legacy - Classful)

| Class | First Octet | Default Mask | Networks | Hosts/Network |
|-------|-------------|--------------|----------|---------------|
| A | 1-126 | 255.0.0.0 (/8) | 126 | 16+ million |
| B | 128-191 | 255.255.0.0 (/16) | 16,384 | 65,534 |
| C | 192-223 | 255.255.255.0 (/24) | 2+ million | 254 |
| D | 224-239 | N/A | Multicast | N/A |
| E | 240-255 | N/A | Reserved | N/A |

Note: 127.x.x.x is reserved for loopback.

## Private Address Ranges (RFC 1918)

| Class | Range | CIDR |
|-------|-------|------|
| A | 10.0.0.0 - 10.255.255.255 | 10.0.0.0/8 |
| B | 172.16.0.0 - 172.31.255.255 | 172.16.0.0/12 |
| C | 192.168.0.0 - 192.168.255.255 | 192.168.0.0/16 |

These addresses are NOT routable on the public Internet. NAT is required.

## Special Addresses

| Address | Purpose |
|---------|---------|
| 0.0.0.0 | Default route / "any network" |
| 127.0.0.1 | Loopback (localhost) |
| 169.254.x.x | APIPA (link-local, DHCP failure) |
| 255.255.255.255 | Limited broadcast |

## Subnet Mask

The subnet mask defines which portion of the IP is:
- **Network portion**: Identifies the network
- **Host portion**: Identifies the device

### CIDR Notation Quick Reference

| CIDR | Subnet Mask | Hosts | Block Size |
|------|-------------|-------|------------|
| /24 | 255.255.255.0 | 254 | 256 |
| /25 | 255.255.255.128 | 126 | 128 |
| /26 | 255.255.255.192 | 62 | 64 |
| /27 | 255.255.255.224 | 30 | 32 |
| /28 | 255.255.255.240 | 14 | 16 |
| /29 | 255.255.255.248 | 6 | 8 |
| /30 | 255.255.255.252 | 2 | 4 |

**Formula**: Usable Hosts = 2^(host bits) - 2

The -2 accounts for network address and broadcast address.
