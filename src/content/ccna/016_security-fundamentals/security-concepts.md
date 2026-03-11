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
