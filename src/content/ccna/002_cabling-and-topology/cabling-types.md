# Cabling Types & Topology

Understanding physical media and network topologies is essential for designing and troubleshooting networks. This module covers copper and fiber cabling, connectors, Power over Ethernet, and common topology designs.

## UTP Copper Cabling

Unshielded Twisted Pair (UTP) is the most common LAN cabling. Twisting the wire pairs reduces electromagnetic interference (crosstalk).

| Category | Max Speed | Max Distance | Frequency |
|----------|-----------|-------------|-----------|
| Cat5e | 1 Gbps | 100 m | 100 MHz |
| Cat6 | 10 Gbps | 55 m (10G) / 100 m (1G) | 250 MHz |
| Cat6a | 10 Gbps | 100 m | 500 MHz |

All UTP cables use **RJ-45** connectors and follow the **TIA/EIA-568A** or **568B** wiring standards.

## Straight-Through vs Crossover Cables

- **Straight-through**: Both ends use the same wiring standard (e.g., 568B to 568B). Used to connect **unlike** devices: PC to switch, switch to router.
- **Crossover**: Each end uses a different standard (568A to 568B). Used to connect **like** devices: switch to switch, PC to PC, router to router.

Modern switches with **Auto-MDIX** detect the cable type and adjust automatically, making crossover cables largely unnecessary.

## Fiber Optic Cabling

Fiber transmits data as pulses of light through a glass or plastic core.

| Type | Core Size | Light Source | Max Distance | Cost | Jacket Color |
|------|-----------|-------------|-------------|------|-------------|
| Single-mode (SMF) | 8-10 micron | Laser | Up to 80+ km | Higher | Yellow |
| Multi-mode (MMF) | 50-62.5 micron | LED | Up to 2 km (OM4 at 10G) | Lower | Aqua or Orange |

### Fiber Connector Types

- **LC (Lucent Connector)**: Small form factor, most common in modern deployments
- **SC (Subscriber Connector)**: Square push-pull connector, common in older installations
- **ST (Straight Tip)**: Round bayonet-style connector, legacy use

## Power over Ethernet (PoE)

PoE delivers electrical power alongside data over standard Ethernet cabling, eliminating the need for separate power supplies on devices like IP phones, wireless APs, and cameras.

| Standard | IEEE | Max Power (at PSE) | Max Power (at PD) | Common Use |
|----------|------|-------------------|-------------------|------------|
| PoE | 802.3af | 15.4 W | 12.95 W | IP phones, basic APs |
| PoE+ | 802.3at | 30 W | 25.5 W | PTZ cameras, advanced APs |
| PoE++ (Type 3) | 802.3bt | 60 W | 51 W | Video conferencing |
| PoE++ (Type 4) | 802.3bt | 100 W | 71 W | Thin clients, displays |

Verify PoE status on a Cisco switch:

```
Switch# show power inline
Switch# show power inline interface Gi0/1
```

## Network Topologies

- **Star**: All devices connect to a central switch or hub. Most common LAN topology. Single point of failure at the central device.
- **Full Mesh**: Every device connects to every other device. Provides maximum redundancy. Formula for links: **n(n-1)/2**. Common in WAN designs between core routers.
- **Partial Mesh**: Some but not all devices are interconnected. Balances cost and redundancy.
- **Hybrid**: Combines two or more topologies. Most real-world enterprise networks are hybrid (e.g., star topology at the access layer with a partial mesh at the core).

### Topology Considerations

- **Bus** and **ring** topologies are legacy and rarely deployed in modern networks
- **Spine-leaf** architecture is increasingly used in data centers, providing predictable latency and equal-cost paths
- Physical topology (how cables are run) may differ from logical topology (how data flows)
