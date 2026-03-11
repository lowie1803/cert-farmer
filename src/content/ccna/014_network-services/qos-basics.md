# QoS Fundamentals

Quality of Service (QoS) is a set of techniques for managing network resources to prioritize specific types of traffic. Without QoS, all traffic is treated equally using best-effort delivery, which can cause unacceptable performance for delay-sensitive applications.

## Why QoS Matters

Real-time applications have strict network requirements:

- **Voice** — Latency under 150ms one-way, jitter under 30ms, packet loss under 1%
- **Video** — Latency under 200-400ms, jitter under 30ms, packet loss under 0.1-1%
- **Data** — Tolerates higher latency and some loss, but may need guaranteed bandwidth

When congestion occurs, packets are queued or dropped. QoS ensures critical traffic receives preferential treatment.

## QoS Mechanisms

QoS works through a series of steps applied to traffic as it traverses the network:

- **Classification** — Identifying traffic types (by port, protocol, ACL, or existing markings)
- **Marking** — Tagging packets with a priority value (DSCP, CoS, or IP Precedence)
- **Queuing** — Placing packets into different queues based on their markings
- **Policing** — Dropping or re-marking traffic that exceeds a configured rate
- **Shaping** — Buffering excess traffic to smooth it to a configured rate (adds delay instead of dropping)

## Classification and Marking

Traffic should be classified and marked as close to the source as possible. This is called the **trust boundary**. Typically, the access-layer switch is the trust boundary.

- If an IP phone is connected, the switch trusts DSCP/CoS markings from the phone but re-marks traffic from the PC port
- Markings from untrusted devices should be overwritten at the trust boundary

### Layer 2 vs Layer 3 Marking

| Marking | Layer | Field | Bits | Range |
|---------|-------|-------|------|-------|
| CoS (Class of Service) | 2 | 802.1Q header | 3 | 0-7 |
| IP Precedence | 3 | IP ToS byte | 3 | 0-7 |
| DSCP | 3 | IP ToS byte | 6 | 0-63 |

DSCP is the standard marking method for the CCNA exam.

## DSCP Values

| DSCP Name | Decimal Value | Per-Hop Behavior | Typical Use |
|-----------|---------------|-------------------|-------------|
| EF | 46 | Expedited Forwarding | Voice (low latency, low jitter) |
| AF41 | 34 | Assured Forwarding Class 4 | Video conferencing |
| AF31 | 26 | Assured Forwarding Class 3 | Streaming video |
| AF21 | 18 | Assured Forwarding Class 2 | Mission-critical data |
| AF11 | 10 | Assured Forwarding Class 1 | Bulk data |
| CS6 | 48 | Class Selector 6 | Routing protocols |
| CS7 | 56 | Class Selector 7 | Network control |
| BE (Default) | 0 | Best Effort | Standard traffic |

### Assured Forwarding (AF) Classes

AF uses the format **AFxy** where x = class (1-4) and y = drop probability (1=low, 2=medium, 3=high). Higher class numbers receive better treatment. The DSCP value is calculated as: **8x + 2y**.

## Queuing Mechanisms

| Mechanism | Description |
|-----------|-------------|
| FIFO | First In, First Out — no prioritization, default on high-speed interfaces |
| WFQ (Weighted Fair Queuing) | Automatically classifies flows and allocates bandwidth fairly |
| CBWFQ (Class-Based WFQ) | Administrator defines classes with guaranteed bandwidth |
| LLQ (Low Latency Queuing) | CBWFQ with a strict priority queue for real-time traffic (voice/video) |

LLQ is the recommended queuing method for converged networks because it guarantees low-latency treatment for voice and video while still providing bandwidth guarantees for other classes.

## Key Takeaways

- Mark traffic at the trust boundary, as close to the source as possible
- Use DSCP EF (46) for voice traffic
- LLQ provides a strict priority queue combined with bandwidth guarantees
- Shaping buffers excess traffic; policing drops it
