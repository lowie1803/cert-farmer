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
