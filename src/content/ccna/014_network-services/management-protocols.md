# Management Protocols

Network management protocols allow administrators to monitor, configure, and maintain network devices. The CCNA exam covers NTP, SNMP, syslog, file transfer protocols, and SSH.

## NTP (Network Time Protocol)

NTP synchronizes clocks across network devices, which is critical for accurate logging, certificate validation, and troubleshooting. NTP uses UDP port 123.

### Stratum Levels

| Stratum | Description |
|---------|-------------|
| 0 | Reference clock (atomic clock, GPS) — not directly on the network |
| 1 | Directly connected to a stratum 0 source |
| 2-15 | Each level one step further from the reference |
| 16 | Unsynchronized (invalid) |

Lower stratum values indicate higher accuracy. A device will synchronize to the lowest stratum source available.

### NTP Configuration

```
Router(config)# ntp server 10.1.1.1
Router(config)# ntp server 10.1.1.2 prefer
Router# show ntp status
Router# show ntp associations
```

## SNMP (Simple Network Management Protocol)

SNMP enables centralized monitoring and management of network devices. It operates with three components: the **SNMP Manager** (NMS), the **SNMP Agent** (on managed devices), and the **MIB** (Management Information Base — a structured database of device variables).

### SNMP Versions

| Version | Authentication | Encryption | Security Level |
|---------|---------------|------------|----------------|
| v1 | Community string (plaintext) | None | Not secure |
| v2c | Community string (plaintext) | None | Not secure |
| v3 | Username/password | AES/DES encryption | **Secure (recommended)** |

Only SNMPv3 provides authentication and encryption. SNMPv3 supports three security levels: noAuthNoPriv, authNoPriv, and authPriv.

### SNMP Messages

- **Get** — Manager requests a value from the agent
- **GetNext** — Manager requests the next value in the MIB
- **Set** — Manager changes a value on the agent
- **Trap** — Agent sends an unsolicited alert to the manager (no acknowledgment)
- **Inform** — Agent sends an alert that requires acknowledgment from the manager

## Syslog

Syslog is the standard logging protocol for network devices. It uses UDP port 514 by default.

### Syslog Severity Levels

| Level | Keyword | Description |
|-------|---------|-------------|
| 0 | Emergency | System is unusable |
| 1 | Alert | Immediate action needed |
| 2 | Critical | Critical conditions |
| 3 | Error | Error conditions |
| 4 | Warning | Warning conditions |
| 5 | Notification | Normal but significant |
| 6 | Informational | Informational messages |
| 7 | Debugging | Debug-level messages |

Remember: **"Every Awesome Cisco Engineer Will Need Ice-cream Daily"**

### Syslog Configuration

```
Router(config)# logging host 10.1.1.100
Router(config)# logging trap informational
Router(config)# logging console warnings
Router(config)# logging buffered 16384
```

Setting a severity level includes all levels above it (lower numbers). For example, `logging trap 4` captures levels 0 through 4.

## File Transfer Protocols

- **TFTP** — Simple, no authentication, UDP port 69, suitable for trusted networks
- **FTP** — Username/password authentication, TCP ports 20/21, more reliable for large transfers

## SSH Configuration

SSH provides encrypted remote access, replacing insecure Telnet. SSH requires an RSA key pair and a hostname/domain name.

```
Router(config)# hostname R1
R1(config)# ip domain-name example.com
R1(config)# crypto key generate rsa modulus 2048
R1(config)# username admin secret Cisco123
R1(config)# line vty 0 4
R1(config-line)# transport input ssh
R1(config-line)# login local
R1(config)# ip ssh version 2
```

Use `show ip ssh` to verify SSH status and version.
