# Wireless Principles

Wireless LANs (WLANs) use radio frequency (RF) signals to transmit data over the air. Understanding 802.11 standards, frequencies, channels, and security protocols is critical for the CCNA exam and real-world deployments.

## 802.11 Standards

| Standard | Frequency | Max Data Rate | Channel Width | MIMO | Wi-Fi Alliance Name |
|----------|-----------|--------------|---------------|------|-------------------|
| 802.11a | 5 GHz | 54 Mbps | 20 MHz | No | — |
| 802.11b | 2.4 GHz | 11 Mbps | 22 MHz | No | — |
| 802.11g | 2.4 GHz | 54 Mbps | 20 MHz | No | — |
| 802.11n | 2.4 / 5 GHz | 600 Mbps | 20/40 MHz | Yes (4x4) | Wi-Fi 4 |
| 802.11ac | 5 GHz | 6.93 Gbps | 20/40/80/160 MHz | Yes (8x8, MU-MIMO DL) | Wi-Fi 5 |
| 802.11ax | 2.4 / 5 / 6 GHz | 9.6 Gbps | 20/40/80/160 MHz | Yes (8x8, MU-MIMO UL/DL) | Wi-Fi 6 / 6E |

802.11n was the first standard to support **both** 2.4 GHz and 5 GHz bands (dual-band).

## 2.4 GHz vs 5 GHz Bands

| Characteristic | 2.4 GHz | 5 GHz |
|---------------|---------|-------|
| Range | Longer (better wall penetration) | Shorter |
| Interference | Higher (microwaves, Bluetooth, cordless phones) | Lower |
| Available Channels | Fewer (3 non-overlapping) | Many (up to 25 non-overlapping) |
| Speed Potential | Lower | Higher |

## RF Channels

### 2.4 GHz Non-Overlapping Channels

The 2.4 GHz band has 14 channels (11 usable in the US), but only **channels 1, 6, and 11** are non-overlapping. Using overlapping channels causes co-channel interference and degrades performance.

- **Channel 1**: 2.412 GHz center frequency
- **Channel 6**: 2.437 GHz center frequency
- **Channel 11**: 2.462 GHz center frequency

Each channel is 22 MHz wide with 5 MHz spacing between center frequencies. Always assign adjacent access points to different non-overlapping channels.

### 5 GHz Channels

The 5 GHz band offers significantly more non-overlapping channels (24 at 20 MHz width in the US). Some channels require **Dynamic Frequency Selection (DFS)** to avoid interference with radar systems.

## WLAN Architecture Concepts

- **SSID (Service Set Identifier)**: The human-readable network name broadcast by an access point
- **BSS (Basic Service Set)**: A single AP and its associated wireless clients, identified by the AP's BSSID (its MAC address)
- **ESS (Extended Service Set)**: Multiple APs sharing the same SSID to provide seamless roaming across a larger area. All APs in an ESS use the same SSID but different BSSIDs
- **IBSS (Independent BSS)**: Ad-hoc mode where clients communicate directly without an AP

## Wireless Security Standards

| Protocol | Encryption | Authentication | Status |
|----------|-----------|---------------|--------|
| Open | None | None | Insecure — avoid |
| WEP | RC4 (64/128-bit) | Shared key | Deprecated — easily cracked |
| WPA | TKIP (RC4-based) | PSK or 802.1X | Legacy — not recommended |
| WPA2 | AES-CCMP | PSK or 802.1X (EAP) | Current standard, widely deployed |
| WPA3 | AES-GCMP / SAE | SAE (Personal) or 802.1X (Enterprise) | Latest standard, strongest security |

### Key Security Improvements in WPA3

- **SAE (Simultaneous Authentication of Equals)**: Replaces the PSK 4-way handshake, resistant to offline dictionary attacks
- **Forward secrecy**: Compromising one session key does not expose past sessions
- **192-bit security suite**: Available in WPA3-Enterprise for high-security environments
- **Enhanced Open (OWE)**: Provides encryption even on open networks without requiring a password
