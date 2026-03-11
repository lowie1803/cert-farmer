# Security Infrastructure

Network security infrastructure encompasses authentication systems, VPN technologies, and wireless security. Understanding these components is essential for designing secure enterprise networks.

## Password Types

Cisco IOS supports multiple password encryption types:

| Type | Algorithm | Security Level | Notes |
|------|-----------|---------------|-------|
| Type 0 | Plaintext | None | Visible in config, never use |
| Type 5 | MD5 hash | Moderate | `enable secret` uses this by default |
| Type 7 | Vigenere cipher | Weak | Easily reversible, used by `enable password` and `username ... password` |
| Type 8 | PBKDF2-SHA-256 | Strong | Recommended |
| Type 9 | Scrypt | Strong | Recommended |

**Enable secret vs enable password**: `enable secret` stores a Type 5 MD5 hash by default and always takes precedence over `enable password`, which uses weak Type 7 encryption. Always use `enable secret`.

## VPN Technologies

### Site-to-Site VPN

- Connects entire networks (e.g., branch office to headquarters) over the public internet
- Established between two VPN gateways (routers or firewalls)
- Always-on connection — transparent to end users
- Uses IPsec for encryption

### Remote-Access VPN

- Individual users connect to the corporate network from remote locations
- Client software initiates the VPN tunnel
- Can use IPsec or SSL/TLS (e.g., Cisco AnyConnect)

### IPsec Framework

| Protocol | Function | IP Protocol |
|----------|----------|-------------|
| AH (Authentication Header) | Authentication and integrity only — no encryption | 51 |
| ESP (Encapsulating Security Payload) | Authentication, integrity, and encryption | 50 |

**IKE (Internet Key Exchange)** negotiates the IPsec tunnel in two phases:

- **Phase 1** — Authenticates peers and establishes a secure channel (IKE SA)
- **Phase 2** — Negotiates IPsec parameters and creates the IPsec SA for data transfer

## AAA Model

AAA provides a framework for controlling network access:

- **Authentication** — Who are you? (verify identity)
- **Authorization** — What can you do? (assign permissions)
- **Accounting** — What did you do? (log activities)

### RADIUS vs TACACS+

| Feature | RADIUS | TACACS+ |
|---------|--------|---------|
| Protocol | UDP | TCP |
| Ports | 1812 (auth), 1813 (acct) | 49 |
| Encryption | Password only | Entire packet body |
| AAA Functions | Combines authentication and authorization | Separates all three AAA functions |
| Primary Use | Network access (802.1X, VPN) | Device administration |
| Standard | Open/RFC standard | Cisco proprietary |

TACACS+ is preferred for device administration because it separates authorization from authentication, allowing granular command-level control. RADIUS is preferred for network access control (NAC) and 802.1X.

## Wireless Security

| Standard | Authentication | Encryption | Use Case |
|----------|---------------|------------|----------|
| WPA2-Personal | Pre-Shared Key (PSK) | AES-CCMP | Home / Small office |
| WPA2-Enterprise | 802.1X (RADIUS) | AES-CCMP | Enterprise networks |
| WPA3-Personal | SAE (Simultaneous Authentication of Equals) | AES-CCMP | Home / Small office (improved) |
| WPA3-Enterprise | 802.1X (RADIUS) | AES-256-GCMP | Enterprise networks (stronger) |

### Key Improvements in WPA3

- **SAE** replaces PSK, providing protection against offline dictionary attacks
- **Forward secrecy** — compromising one session key does not compromise past sessions
- WPA3-Enterprise uses 192-bit minimum security suite
- **OWE (Opportunistic Wireless Encryption)** encrypts open networks without authentication
