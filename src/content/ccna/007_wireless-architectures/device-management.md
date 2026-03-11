# Device Management

Effective device management is foundational to Cisco network administration. This module covers accessing network devices, navigating IOS CLI modes, securing management access, and backing up configurations.

## Console and Remote Access

### Console Access

Console access provides **out-of-band** management using a physical connection to the device. This is the primary method for initial configuration or recovery.

| Parameter | Value |
|-----------|-------|
| Connector | RJ-45 (legacy) or USB Mini-B/Type-C |
| Speed | 9600 baud |
| Data Bits | 8 |
| Parity | None |
| Stop Bits | 1 |
| Flow Control | None |

### SSH vs Telnet

| Feature | Telnet | SSH |
|---------|--------|-----|
| Port | TCP 23 | TCP 22 |
| Encryption | None (cleartext) | Encrypted session |
| Authentication | Password only | Username/password or key-based |
| Recommendation | Never use in production | Always preferred |

**Always use SSH.** Telnet transmits credentials and data in cleartext, making it vulnerable to packet capture.

## IOS CLI Modes

| Mode | Prompt | Access Command | Purpose |
|------|--------|----------------|---------|
| User EXEC | `Switch>` | Default at login | Limited monitoring commands |
| Privileged EXEC | `Switch#` | `enable` | Full monitoring, show, debug, copy |
| Global Configuration | `Switch(config)#` | `configure terminal` | Device-wide configuration |
| Interface Config | `Switch(config-if)#` | `interface gi0/1` | Per-interface settings |
| Line Config | `Switch(config-line)#` | `line console 0` | Console/VTY line settings |
| Router Config | `Switch(config-router)#` | `router ospf 1` | Routing protocol settings |

### Navigating Modes

```
Switch> enable
Switch# configure terminal
Switch(config)# interface gigabitEthernet 0/1
Switch(config-if)# exit                    ! Back to global config
Switch(config)# end                        ! Back to privileged EXEC
Switch# disable                            ! Back to user EXEC
```

## Securing Management Access

### Password Configuration

```
Switch(config)# enable secret Cisco123          ! Encrypted enable password
Switch(config)# line console 0
Switch(config-line)# password ConPass1
Switch(config-line)# login
Switch(config-line)# exit
Switch(config)# line vty 0 15
Switch(config-line)# password VtyPass1
Switch(config-line)# login
Switch(config-line)# transport input ssh         ! Restrict to SSH only
```

- **enable secret** — hashed with MD5 or SHA-256; always preferred over `enable password`
- **service password-encryption** — applies weak Type 7 encryption to plaintext passwords in the config; not secure, but better than nothing

```
Switch(config)# service password-encryption
```

### Login Banner

```
Switch(config)# banner motd # Authorized Access Only #
```

Banners provide legal notice to unauthorized users before they authenticate.

### SSH Configuration

```
Switch(config)# hostname SW1
SW1(config)# ip domain-name example.com
SW1(config)# crypto key generate rsa modulus 2048
SW1(config)# ip ssh version 2
SW1(config)# line vty 0 15
SW1(config-line)# transport input ssh
SW1(config-line)# login local
SW1(config)# username admin secret AdminPass1
```

## Configuration Backup

| Command | Action |
|---------|--------|
| `copy running-config startup-config` | Save running config to NVRAM |
| `copy startup-config running-config` | Load saved config into running |
| `copy running-config tftp:` | Backup config to TFTP server |
| `copy tftp: running-config` | Restore config from TFTP server |
| `show running-config` | Display current active configuration |
| `show startup-config` | Display saved configuration in NVRAM |
| `write erase` | Erase startup configuration |

Always save the running configuration after making changes. A reboot without saving will lose all unsaved modifications.
