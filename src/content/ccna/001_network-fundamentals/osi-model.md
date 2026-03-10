# The OSI Model

The **OSI model** (Open Systems Interconnection) is a conceptual framework that standardizes network communication into **7 layers**.

## The 7 Layers (Top to Bottom)

| Layer | Name | Function | Protocols/Examples |
|-------|------|----------|-------------------|
| 7 | Application Layer | User interface | HTTP, FTP, SMTP, DNS |
| 6 | Presentation Layer | Data formatting, encryption | SSL/TLS, JPEG, ASCII |
| 5 | Session Layer | Session management | NetBIOS, RPC |
| 4 | Transport Layer | End-to-end delivery | TCP, UDP |
| 3 | Network Layer | Logical addressing, routing | IP, ICMP, OSPF |
| 2 | Data Link Layer | Physical addressing, framing | Ethernet, MAC address, ARP |
| 1 | Physical Layer | Bits on the wire | Cables, hubs, signals |

## Memory Trick
**"Please Do Not Throw Sausage Pizza Away"** (Layer 1→7)

## Key Concepts for CCNA

### Encapsulation
Data gets wrapped with headers as it moves down the stack. Each layer adds its own header with control information.

### PDU (Protocol Data Unit)
- Application → Data
- Transport → segment
- Network → packet  
- Data Link → frame
- Physical → Bits

### Layer Interactions
- Each layer only communicates with the layer directly above and below it
- The TCP/IP model condenses OSI into 4 layers
- Understanding which devices operate at which layer is crucial for troubleshooting
