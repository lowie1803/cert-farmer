# Switching Concepts

Switches operate at Layer 2 of the OSI model, forwarding Ethernet frames based on MAC addresses. Understanding how switches learn addresses, make forwarding decisions, and affect collision and broadcast domains is essential for the CCNA exam.

## MAC Address Table

Every switch maintains a **MAC address table** (also called a CAM table) that maps MAC addresses to switch ports. This table is the foundation of all switching decisions.

### MAC Address Learning Process

1. **Learn**: When a frame arrives, the switch records the **source MAC address** and the **ingress port** in its MAC address table
2. **Flood**: If the **destination MAC address** is not in the table (unknown unicast), the switch forwards the frame out **all ports except the source port**
3. **Forward**: If the destination MAC is in the table, the switch sends the frame out only the **specific mapped port**
4. **Filter**: If the destination port is the same as the source port, the switch **drops** the frame (no need to forward it back)

### Aging Timer

- MAC address entries have a default **aging timer of 300 seconds** (5 minutes) on Cisco switches
- If no frame is received from a MAC address within this period, the entry is removed
- This ensures the table stays current as devices move or disconnect

```
Switch# show mac address-table
Switch# show mac address-table dynamic
Switch# show mac address-table aging-time
Switch# clear mac address-table dynamic
```

## Frame Forwarding Methods

| Method | Description | Latency | Error Detection |
|--------|------------|---------|-----------------|
| **Store-and-Forward** | Receives the entire frame, runs CRC check, then forwards | Highest (variable) | Yes — drops corrupt frames |
| **Cut-Through** | Reads only the destination MAC (first 6 bytes of header), then immediately forwards | Lowest (fixed) | No — may forward corrupt frames |
| **Fragment-Free** | Reads the first 64 bytes (minimum frame size) before forwarding | Medium | Partial — catches runt frames |

- **Store-and-forward** is the default on modern Cisco Catalyst switches
- **Cut-through** is used in low-latency environments such as data centers and high-frequency trading
- **Fragment-free** is a compromise — 64 bytes catches collisions (runts) since collisions are detected within the first 64 bytes of a frame

## Switch Port Types

- **Access Port**: Belongs to a single VLAN, connects to end devices (PCs, printers, phones)
- **Trunk Port**: Carries traffic for multiple VLANs between switches using 802.1Q tagging
- **EtherChannel**: Bundles multiple physical links into one logical link for increased bandwidth and redundancy

```
Switch# show interfaces status
Switch# show interfaces Gi0/1 switchport
```

## Collision Domains vs Broadcast Domains

### Collision Domain

A collision domain is a network segment where frames can collide if two devices transmit simultaneously.

- **Hubs**: All ports share one collision domain (half-duplex)
- **Switches**: Each port is its own collision domain — switches eliminate collisions by using microsegmentation
- Modern switches operate in **full-duplex** mode, so collisions effectively do not occur

### Broadcast Domain

A broadcast domain is the set of devices that receive a broadcast frame (destination FF:FF:FF:FF:FF:FF).

- A switch with no VLANs configured has **one broadcast domain** across all ports — a broadcast received on any port is forwarded to every other port
- **Each VLAN creates a separate broadcast domain** — broadcasts stay within their VLAN
- **Routers** (Layer 3 devices) separate broadcast domains — they do not forward broadcast frames

### Summary Table

| Device | Collision Domains | Broadcast Domains |
|--------|------------------|-------------------|
| Hub (12 ports) | 1 | 1 |
| Switch (12 ports, no VLANs) | 12 | 1 |
| Switch (12 ports, 3 VLANs) | 12 | 3 |
| Router (3 interfaces) | 3 | 3 |
