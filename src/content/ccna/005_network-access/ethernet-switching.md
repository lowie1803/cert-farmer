# Ethernet & Switching Fundamentals

## Ethernet Frame Structure

```
| Preamble | Dest MAC | Src MAC | Type/Len | Data      | FCS   |
| 8 bytes  | 6 bytes  | 6 bytes | 2 bytes  | 46-1500 B | 4 B   |
```

## MAC Address Format

- **48 bits** (6 bytes) displayed in hexadecimal
- Format: `AA:BB:CC:DD:EE:FF` or `AA-BB-CC-DD-EE-FF`
- **OUI** (first 24 bits): Identifies the manufacturer
- **Device ID** (last 24 bits): Unique device identifier

### Special MAC Addresses
- **Broadcast**: `FF:FF:FF:FF:FF:FF` - sent to all devices
- **Multicast**: Starts with `01:00:5E` for IPv4 multicast

## Switch Operation

A switch learns and forwards frames using these steps:

### 1. Learning
When a frame arrives, the switch records:
- Source MAC address
- Ingress port
- Timestamp

This builds the MAC table (CAM table).

### 2. Flooding
If destination MAC is unknown or is broadcast:
- Send frame out ALL ports except the source port

### 3. Forwarding
If destination MAC is in the MAC table:
- Send frame ONLY to the specific port

### 4. Filtering
- Never forward a frame back out the port it came in on

## Collision Domain vs Broadcast Domain

| Concept | Definition | Boundary Device |
|---------|------------|-----------------|
| Collision Domain | Area where frame collisions can occur | Switch port, Bridge |
| Broadcast Domain | Area where broadcast frames propagate | Router, Layer 3 switch |

- Each switch port = separate collision domain
- All ports in same VLAN = same broadcast domain
