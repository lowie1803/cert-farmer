/**
 * Courses Data
 * 
 * Structure:
 * - Each course has modules
 * - Each module has lessons
 * - Each lesson is either 'notes' or 'quiz' type
 */

const courses = {
  ccna: {
    id: 'ccna',
    title: 'CCNA 200-301',
    description: 'Cisco Certified Network Associate',
    version: '1.0',
    modules: [
      {
        id: 'network-fundamentals',
        title: 'Network Fundamentals',
        icon: '🌐',
        description: 'Core networking concepts and the OSI/TCP-IP models',
        lessons: [
          {
            id: 'osi-model',
            title: 'OSI Model',
            type: 'notes',
            content: `
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
            `,
            resources: [
              { type: 'video', title: 'OSI Model Deep Dive', url: 'https://www.youtube.com/watch?v=vv4y_uOneC0' },
              { type: 'link', title: 'Cisco Learning Network', url: 'https://learningnetwork.cisco.com' }
            ]
          },
          {
            id: 'osi-quiz',
            title: 'OSI Model Quiz',
            type: 'quiz',
            questions: [
              {
                id: 'q1',
                question: 'Which layer of the OSI model is responsible for logical addressing and routing?',
                options: ['Data Link Layer', 'Network Layer', 'Transport Layer', 'Session Layer'],
                correct: 1,
                explanation: 'The Network Layer (Layer 3) handles logical addressing (IP addresses) and routing decisions. Routers operate at this layer.'
              },
              {
                id: 'q2',
                question: 'What is the PDU (Protocol Data Unit) at the Transport Layer?',
                options: ['Packet', 'Frame', 'Segment', 'Bit'],
                correct: 2,
                explanation: 'At the Transport Layer, data is called a segment. TCP segments include sequence numbers for reliable delivery.'
              },
              {
                id: 'q3',
                question: 'Which protocol operates at Layer 7 (Application Layer)?',
                options: ['TCP', 'IP', 'Ethernet', 'HTTP'],
                correct: 3,
                explanation: 'HTTP (Hypertext Transfer Protocol) operates at the Application Layer, providing web communication services.'
              },
              {
                id: 'q4',
                question: 'ARP operates at which layer?',
                options: ['Network Layer', 'Data Link Layer', 'Transport Layer', 'Physical Layer'],
                correct: 1,
                explanation: 'ARP operates at the Data Link Layer (Layer 2), translating IP addresses to MAC addresses.'
              },
              {
                id: 'q5',
                question: 'Which layer is responsible for establishing, managing, and terminating sessions?',
                options: ['Transport Layer', 'Session Layer', 'Application Layer', 'Presentation Layer'],
                correct: 1,
                explanation: 'The Session Layer (Layer 5) manages dialog control between applications, establishing, maintaining, and terminating connections.'
              }
            ]
          },
          {
            id: 'tcp-ip-model',
            title: 'TCP/IP Model',
            type: 'notes',
            content: `
# TCP/IP Model

The **TCP/IP** model is the practical implementation used on the internet. It has **4 layers** compared to OSI's 7.

## OSI vs TCP/IP Comparison

| TCP/IP Layer | OSI Equivalent | Protocols |
|--------------|----------------|-----------|
| Application | 7, 6, 5 | HTTP, DNS, DHCP, SSH, FTP |
| Transport | 4 | TCP, UDP |
| Internet | 3 | IP, ICMP, ARP |
| Network Access | 2, 1 | Ethernet, Wi-Fi, MAC address |

## TCP vs UDP

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Guaranteed delivery | Best effort |
| Ordering | In-order delivery | No ordering |
| Speed | Slower (overhead) | Faster |
| Header size | 20+ bytes | 8 bytes |
| Use case | Web, email, FTP | Video, VoIP, DNS queries |

## TCP Three-Way Handshake

This three-way handshake establishes a reliable connection:

1. **SYN** → Client sends synchronization request
2. **SYN-ACK** → Server acknowledges and synchronizes
3. **ACK** → Client confirms connection established

## TCP Four-Way Termination

1. **FIN** → Initiator requests to close
2. **ACK** → Receiver acknowledges
3. **FIN** → Receiver ready to close
4. **ACK** → Final acknowledgment

## Important Port Numbers

| Port | Protocol | Service |
|------|----------|---------|
| 20, 21 | TCP | FTP |
| 22 | TCP | SSH |
| 23 | TCP | Telnet |
| 25 | TCP | SMTP |
| 53 | TCP/UDP | DNS |
| 67, 68 | UDP | DHCP |
| 80 | TCP | HTTP |
| 443 | TCP | HTTPS |
            `,
            resources: [
              { type: 'video', title: 'TCP vs UDP Explained', url: 'https://www.youtube.com/watch?v=uwoD5YsGACg' }
            ]
          },
          {
            id: 'tcp-ip-quiz',
            title: 'TCP/IP Quiz',
            type: 'quiz',
            questions: [
              {
                id: 'q1',
                question: 'How many layers does the TCP/IP model have?',
                options: ['7 layers', '5 layers', '4 layers', '3 layers'],
                correct: 2,
                explanation: 'The TCP/IP model has 4 layers: Application, Transport, Internet, and Network Access.'
              },
              {
                id: 'q2',
                question: 'Which protocol would you use for real-time video streaming?',
                options: ['TCP', 'UDP', 'ICMP', 'ARP'],
                correct: 1,
                explanation: 'UDP is preferred for real-time streaming because it has lower latency. Occasional packet loss is acceptable for video/audio.'
              },
              {
                id: 'q3',
                question: 'What is the default port for HTTPS?',
                options: ['80', '443', '8080', '22'],
                correct: 1,
                explanation: 'HTTPS uses port 443 by default. HTTP uses port 80.'
              },
              {
                id: 'q4',
                question: 'In the TCP three-way handshake, what does the server send in response to SYN?',
                options: ['ACK', 'FIN', 'SYN-ACK', 'RST'],
                correct: 2,
                explanation: 'The server responds with SYN-ACK, acknowledging the client\'s SYN and sending its own synchronization.'
              }
            ]
          }
        ]
      },
      {
        id: 'network-access',
        title: 'Network Access',
        icon: '🔌',
        description: 'Ethernet, switching, and VLANs',
        lessons: [
          {
            id: 'ethernet-switching',
            title: 'Ethernet & Switching',
            type: 'notes',
            content: `
# Ethernet & Switching Fundamentals

## Ethernet Frame Structure

\`\`\`
| Preamble | Dest MAC | Src MAC | Type/Len | Data      | FCS   |
| 8 bytes  | 6 bytes  | 6 bytes | 2 bytes  | 46-1500 B | 4 B   |
\`\`\`

## MAC Address Format

- **48 bits** (6 bytes) displayed in hexadecimal
- Format: \`AA:BB:CC:DD:EE:FF\` or \`AA-BB-CC-DD-EE-FF\`
- **OUI** (first 24 bits): Identifies the manufacturer
- **Device ID** (last 24 bits): Unique device identifier

### Special MAC Addresses
- **Broadcast**: \`FF:FF:FF:FF:FF:FF\` - sent to all devices
- **Multicast**: Starts with \`01:00:5E\` for IPv4 multicast

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
            `,
            resources: []
          },
          {
            id: 'vlans',
            title: 'VLANs & Trunking',
            type: 'notes',
            content: `
# VLANs and Trunking

## What is a VLAN?

A **VLAN** (Virtual Local Area Network) is a logical segmentation of a physical network. It creates separate broadcast domains without requiring separate physical infrastructure.

## Benefits of VLANs

- **Security**: Isolate sensitive traffic
- **Performance**: Reduce broadcast traffic
- **Management**: Group users by function, not location
- **Flexibility**: Move users without rewiring

## VLAN Types

| VLAN Type | Purpose |
|-----------|---------|
| Data VLAN | Regular user traffic |
| Voice VLAN | VoIP traffic (QoS prioritized) |
| Management VLAN | Switch management traffic |
| Native VLAN | Untagged traffic on trunk |
| Default VLAN | VLAN 1 (avoid using for security) |

## Port Types

### Access Port
- Belongs to ONE VLAN only
- Connects to end devices (PCs, printers)
- Frames are untagged

### Trunk Port
- Carries MULTIPLE VLANs
- Connects switches together
- Uses 802.1Q tagging

## 802.1Q Tagging

Trunk ports add a 4-byte tag to Ethernet frames:

\`\`\`
| Dest MAC | Src MAC | 802.1Q Tag | Type | Data | FCS |
                    |   4 B    |
\`\`\`

The tag contains:
- **TPID**: Tag Protocol ID (0x8100)
- **PCP**: Priority (QoS)
- **DEI**: Drop eligible indicator
- **VID**: VLAN ID (1-4094)

## Native VLAN

- Traffic on the native VLAN is NOT tagged
- Default is VLAN 1 (should be changed)
- Must match on both ends of a trunk
- Mismatch = VLAN leaking security risk

## Basic VLAN Commands (Cisco IOS)

\`\`\`
! Create VLAN
Switch(config)# vlan 10
Switch(config-vlan)# name SALES

! Assign access port
Switch(config)# interface fa0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10

! Configure trunk
Switch(config)# interface gi0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,30
\`\`\`
            `,
            resources: [
              { type: 'video', title: 'VLAN Deep Dive', url: 'https://www.youtube.com/watch?v=MmwF1oHOvmg' }
            ]
          },
          {
            id: 'switching-quiz',
            title: 'Switching Quiz',
            type: 'quiz',
            questions: [
              {
                id: 'q1',
                question: 'How many bits are in a MAC address?',
                options: ['32 bits', '48 bits', '64 bits', '128 bits'],
                correct: 1,
                explanation: 'MAC addresses are 48 bits (6 bytes), typically displayed as 12 hexadecimal characters.'
              },
              {
                id: 'q2',
                question: 'What does a switch do when it receives a frame with an unknown destination MAC address?',
                options: ['Drops the frame', 'Sends to default gateway', 'Floods to all ports except source', 'Sends an ARP request'],
                correct: 2,
                explanation: 'When the destination MAC is not in the MAC table, the switch floods the frame out all ports except the source port.'
              },
              {
                id: 'q3',
                question: 'Which IEEE standard defines VLAN tagging on trunk ports?',
                options: ['802.3', '802.11', '802.1Q', '802.1X'],
                correct: 2,
                explanation: '802.1Q defines VLAN tagging, adding a 4-byte tag to Ethernet frames to identify VLAN membership.'
              },
              {
                id: 'q4',
                question: 'What is the native VLAN used for?',
                options: ['Management traffic only', 'Untagged traffic on trunk links', 'Voice traffic', 'Guest network'],
                correct: 1,
                explanation: 'The native VLAN carries untagged traffic on trunk links. By default it is VLAN 1.'
              },
              {
                id: 'q5',
                question: 'A switch port connected to a PC should be configured as:',
                options: ['Trunk port', 'Access port', 'Hybrid port', 'Native port'],
                correct: 1,
                explanation: 'End devices connect to access ports, which belong to a single VLAN and do not tag frames.'
              }
            ]
          }
        ]
      },
      {
        id: 'ip-connectivity',
        title: 'IP Connectivity',
        icon: '🛣️',
        description: 'IP addressing, subnetting, and routing',
        lessons: [
          {
            id: 'ipv4-addressing',
            title: 'IPv4 Addressing',
            type: 'notes',
            content: `
# IPv4 Addressing

## Address Structure

- **32 bits** divided into 4 octets
- Each octet: 0-255
- Example: \`192.168.1.100\`
- Binary: \`11000000.10101000.00000001.01100100\`

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
            `,
            resources: [
              { type: 'video', title: 'Subnetting Made Easy', url: 'https://www.youtube.com/watch?v=ecCuyq-Wprc' }
            ]
          },
          {
            id: 'subnetting',
            title: 'Subnetting Practice',
            type: 'notes',
            content: `
# Subnetting Practice

## The Subnetting Process

### Given: 192.168.10.0/24, create 4 subnets

**Step 1: Determine bits needed**
- 4 subnets = 2² = need 2 bits
- New prefix: /24 + 2 = /26

**Step 2: Calculate subnet details**
- Block size: 256 - 192 = 64
- Hosts per subnet: 2⁶ - 2 = 62

**Step 3: List the subnets**

| Subnet | Network | First Host | Last Host | Broadcast |
|--------|---------|------------|-----------|-----------|
| 1 | 192.168.10.0 | .1 | .62 | .63 |
| 2 | 192.168.10.64 | .65 | .126 | .127 |
| 3 | 192.168.10.128 | .129 | .190 | .191 |
| 4 | 192.168.10.192 | .193 | .254 | .255 |

## Quick Subnet Calculation Method

### The Magic Number Method

1. Find the "interesting octet" (where subnet mask isn't 255 or 0)
2. Subtract mask value from 256 = block size
3. Network addresses are multiples of block size

### Example: What subnet is 172.16.45.200/21 in?

1. /21 = 255.255.248.0
2. Interesting octet: 3rd (248)
3. Block size: 256 - 248 = 8
4. Find multiple of 8 below 45: 45 ÷ 8 = 5.6 → 5 × 8 = 40
5. **Network: 172.16.40.0/21**

## VLSM (Variable Length Subnet Masking)

VLSM allows different subnet sizes within the same network.

### Example: Design for 3 departments
- Sales: 100 hosts → need /25 (126 hosts)
- IT: 50 hosts → need /26 (62 hosts)
- Management: 10 hosts → need /28 (14 hosts)

**Start with the largest requirement first!**

| Dept | Network | Prefix | Range |
|------|---------|--------|-------|
| Sales | 192.168.1.0 | /25 | .1-.126 |
| IT | 192.168.1.128 | /26 | .129-.190 |
| Mgmt | 192.168.1.192 | /28 | .193-.206 |

## Binary Subnet Mask Reference

| Prefix | Binary | Decimal |
|--------|--------|---------|
| /25 | 10000000 | 128 |
| /26 | 11000000 | 192 |
| /27 | 11100000 | 224 |
| /28 | 11110000 | 240 |
| /29 | 11111000 | 248 |
| /30 | 11111100 | 252 |
            `,
            resources: [
              { type: 'link', title: 'Subnet Calculator', url: 'https://www.subnet-calculator.com/' }
            ]
          },
          {
            id: 'ip-quiz',
            title: 'IP Addressing Quiz',
            type: 'quiz',
            questions: [
              {
                id: 'q1',
                question: 'How many usable host addresses are in a /26 network?',
                options: ['64', '62', '30', '126'],
                correct: 1,
                explanation: 'A /26 has 6 host bits. 2⁶ = 64, minus 2 for network and broadcast = 62 usable hosts.'
              },
              {
                id: 'q2',
                question: 'Which address range is private (RFC 1918)?',
                options: ['192.0.0.0/8', '172.16.0.0/12', '168.0.0.0/8', '11.0.0.0/8'],
                correct: 1,
                explanation: 'RFC 1918 private ranges are: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.'
              },
              {
                id: 'q3',
                question: 'What is the broadcast address for 192.168.1.0/25?',
                options: ['192.168.1.255', '192.168.1.127', '192.168.1.128', '192.168.1.63'],
                correct: 1,
                explanation: '/25 gives block size of 128. Network is .0, broadcast is .127 (one less than next network .128).'
              },
              {
                id: 'q4',
                question: 'The IP 169.254.10.5 indicates:',
                options: ['Private network', 'APIPA/link-local (DHCP failed)', 'Loopback', 'Multicast'],
                correct: 1,
                explanation: '169.254.0.0/16 is the APIPA range, assigned when a device cannot reach a DHCP server.'
              },
              {
                id: 'q5',
                question: 'What subnet mask corresponds to /28?',
                options: ['255.255.255.240', '255.255.255.224', '255.255.255.248', '255.255.255.192'],
                correct: 0,
                explanation: '/28 means 28 network bits. In the 4th octet: 11110000 = 240. So 255.255.255.240.'
              }
            ]
          }
        ]
      },
      {
        id: 'ip-services',
        title: 'IP Services',
        icon: '⚙️',
        description: 'DHCP, DNS, NAT, and network services',
        lessons: [
          {
            id: 'dhcp-dns',
            title: 'DHCP & DNS',
            type: 'notes',
            content: `
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
- Uses \`ip helper-address\` command
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
            `,
            resources: []
          },
          {
            id: 'nat',
            title: 'NAT & PAT',
            type: 'notes',
            content: `
# Network Address Translation

## Why NAT?

- IPv4 address exhaustion
- Allows private IPs to access Internet
- Provides basic security (hides internal structure)

## NAT Types

### Static NAT
- One-to-one mapping
- Private IP always maps to same public IP
- Used for servers that need consistent external access

### Dynamic NAT
- Pool of public IPs
- First-come, first-served assignment
- Not commonly used today

### PAT (Port Address Translation)
- Also called NAT Overload
- Many private IPs share ONE public IP
- Differentiated by port numbers
- Most common type (home routers)

## NAT Terminology

| Term | Definition |
|------|------------|
| Inside Local | Private IP of internal host |
| Inside Global | Public IP representing internal host |
| Outside Local | How external host appears internally |
| Outside Global | Actual public IP of external host |

## PAT Example

| Inside Local | Inside Global | Destination |
|--------------|---------------|-------------|
| 192.168.1.10:50000 | 203.0.113.1:40001 | 8.8.8.8:53 |
| 192.168.1.11:50000 | 203.0.113.1:40002 | 8.8.8.8:53 |
| 192.168.1.12:51000 | 203.0.113.1:40003 | 1.1.1.1:443 |

All three internal hosts share one public IP!

## NAT Configuration (Cisco)

\`\`\`
! Define inside and outside interfaces
Router(config)# interface gi0/0
Router(config-if)# ip nat inside

Router(config)# interface gi0/1
Router(config-if)# ip nat outside

! Configure PAT
Router(config)# ip nat inside source list 1 interface gi0/1 overload
Router(config)# access-list 1 permit 192.168.1.0 0.0.0.255
\`\`\`
            `,
            resources: [
              { type: 'video', title: 'NAT Explained', url: 'https://www.youtube.com/watch?v=FTUV0t6JaDA' }
            ]
          }
        ]
      },
      {
        id: 'security-fundamentals',
        title: 'Security Fundamentals',
        icon: '🔒',
        description: 'Network security concepts and configurations',
        lessons: [
          {
            id: 'security-concepts',
            title: 'Security Concepts',
            type: 'notes',
            content: `
# Network Security Fundamentals

## CIA Triad

The foundation of information security:

- **Confidentiality**: Only authorized access to data
- **Integrity**: Data is accurate and unmodified
- **Availability**: Systems are accessible when needed

## Common Threats

### Attack Types

| Attack | Description | Layer |
|--------|-------------|-------|
| Phishing | Social engineering via email | Human |
| DDoS | Overwhelm with traffic | 3-4 |
| Man-in-the-Middle | Intercept communications | 2-3 |
| MAC Spoofing | Fake MAC address | 2 |
| ARP Spoofing | Poison ARP cache | 2 |
| VLAN Hopping | Access unauthorized VLANs | 2 |

### Malware Types
- **Virus**: Requires host file
- **Worm**: Self-replicating
- **Trojan**: Hidden malicious code
- **Ransomware**: Encrypts data for payment

## Defense in Depth

Multiple security layers:

1. **Physical**: Locks, cameras, badges
2. **Network**: Firewalls, ACLs, IDS/IPS
3. **Host**: Antivirus, patching, hardening
4. **Application**: Input validation, secure coding
5. **Data**: Encryption, backup

## AAA Framework

- **Authentication**: Who are you? (username/password)
- **Authorization**: What can you access? (permissions)
- **Accounting**: What did you do? (logging)

### AAA Protocols
- **RADIUS**: UDP, encrypts only password
- **TACACS+**: TCP, encrypts entire payload (Cisco)
            `,
            resources: []
          },
          {
            id: 'acl',
            title: 'Access Control Lists',
            type: 'notes',
            content: `
# Access Control Lists (ACL)

## What is an ACL?

An ACL is a sequential list of permit/deny statements that filter traffic based on criteria like:
- Source IP
- Destination IP
- Protocol
- Port numbers

## ACL Types

### Standard ACL (1-99, 1300-1999)
- Filters by **source IP only**
- Place **close to destination**

### Extended ACL (100-199, 2000-2699)
- Filters by source, destination, protocol, ports
- Place **close to source**

## ACL Rules

1. Processed **top to bottom**
2. First match wins
3. Implicit **deny all** at end
4. One ACL per interface, per direction, per protocol

## Wildcard Masks

Opposite of subnet mask:
- 0 = must match
- 1 = ignore

| Match | Wildcard |
|-------|----------|
| Exact host | 0.0.0.0 |
| /24 network | 0.0.0.255 |
| /16 network | 0.0.255.255 |
| Any | 255.255.255.255 |

## Standard ACL Configuration

\`\`\`
! Block 192.168.1.0/24 from reaching server
Router(config)# access-list 10 deny 192.168.1.0 0.0.0.255
Router(config)# access-list 10 permit any

! Apply to interface (outbound, close to destination)
Router(config)# interface gi0/0
Router(config-if)# ip access-group 10 out
\`\`\`

## Extended ACL Configuration

\`\`\`
! Allow HTTP to web server, deny all else
Router(config)# access-list 100 permit tcp any host 10.1.1.100 eq 80
Router(config)# access-list 100 permit tcp any host 10.1.1.100 eq 443

! Apply close to source
Router(config)# interface gi0/1
Router(config-if)# ip access-group 100 in
\`\`\`

## Named ACLs

\`\`\`
Router(config)# ip access-list extended WEB-FILTER
Router(config-ext-nacl)# permit tcp any any eq 80
Router(config-ext-nacl)# permit tcp any any eq 443
Router(config-ext-nacl)# deny ip any any log
\`\`\`
            `,
            resources: []
          }
        ]
      }
    ]
  }
};

export default courses;

// Helper to get a specific course
export const getCourse = (courseId) => courses[courseId] || null;

// Helper to get a specific module
export const getModule = (courseId, moduleId) => {
  const course = courses[courseId];
  return course?.modules.find(m => m.id === moduleId) || null;
};

// Helper to get a specific lesson
export const getLesson = (courseId, moduleId, lessonId) => {
  const module = getModule(courseId, moduleId);
  return module?.lessons.find(l => l.id === lessonId) || null;
};

// Get all courses as array
export const getAllCourses = () => Object.values(courses);
