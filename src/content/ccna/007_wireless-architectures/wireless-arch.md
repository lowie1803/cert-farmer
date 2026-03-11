# Wireless Architectures

Understanding wireless LAN architectures is critical for the CCNA exam. Modern enterprise networks use centralized management through Wireless LAN Controllers (WLCs) to simplify AP deployment, enforce consistent policies, and optimize RF performance.

## Access Point Deployment Modes

| Feature | Autonomous AP | Lightweight AP |
|---------|--------------|----------------|
| Management | Individual (per-AP config) | Centralized via WLC |
| Configuration | CLI or web GUI on each AP | Pushed from WLC |
| Firmware Updates | Manual per AP | Automatic from WLC |
| Scalability | Poor (dozens of APs) | Excellent (thousands of APs) |
| CAPWAP | Not used | Required |
| Best For | Small/home office | Enterprise deployments |

### Autonomous APs

Autonomous APs operate independently. Each AP handles all wireless functions locally: authentication, encryption, QoS, and bridging traffic to the wired network. Configuration is performed individually on every AP, making this model impractical for large deployments.

### Lightweight APs

Lightweight APs depend on a **Wireless LAN Controller (WLC)** for management functions. The AP handles only real-time operations while the WLC centralizes policy, configuration, and monitoring.

## Split-MAC Architecture

The split-MAC model divides wireless functions between the AP and the WLC:

**WLC Handles (Management Plane):**
- Authentication and security policy enforcement
- RF resource management and channel assignment
- Transmit power adjustments
- Roaming coordination
- QoS policies
- Firmware distribution

**AP Handles (Data Plane):**
- Real-time 802.11 frame transmission and reception
- MAC-layer encryption and decryption
- Beacons and probe responses
- Client signal strength monitoring
- Packet prioritization at the air interface

## CAPWAP Protocol

The **Control and Provisioning of Wireless Access Points (CAPWAP)** protocol creates tunnels between lightweight APs and the WLC.

| Tunnel | Port | Purpose |
|--------|------|---------|
| Control Tunnel | UDP 5246 | Management traffic, encrypted by default (DTLS) |
| Data Tunnel | UDP 5247 | Client data traffic, optionally encrypted |

CAPWAP encapsulates traffic in UDP and can traverse Layer 3 networks, so the AP and WLC do not need to be on the same subnet.

## FlexConnect Mode

**FlexConnect** (formerly H-REAP) allows a lightweight AP at a remote branch to **locally switch client traffic** directly onto the local LAN, even if connectivity to the WLC is lost.

- **Connected mode** — AP forwards management to WLC via CAPWAP; data can be switched locally or centrally
- **Standalone mode** — if WLC is unreachable, the AP continues to serve clients using cached policies and switches traffic locally

FlexConnect is ideal for branch offices with limited WAN bandwidth where backhauling all wireless traffic to a centralized WLC is impractical.

## Additional AP Modes

| Mode | Purpose |
|------|---------|
| Local | Default lightweight mode; tunnels all traffic to WLC |
| FlexConnect | Local switching at remote sites |
| Monitor | Dedicated to scanning for rogue APs and IDS |
| Sniffer | Captures wireless frames and sends to analyzer |
| Bridge | Point-to-point or point-to-multipoint bridging |
| SE-Connect | Spectrum analysis for RF interference detection |

## Verification on WLC

WLC management is typically performed through a web-based GUI or CLI. Common verification includes viewing AP join status, client counts, CAPWAP tunnel health, and RF channel utilization dashboards.
