# SDN & Controllers

Software-Defined Networking (SDN) fundamentally changes how networks are built and managed by separating the control plane from the data plane and centralizing network intelligence in a controller.

## Traditional vs SDN Architecture

### Traditional Networking

In traditional networks, every device has its own **control plane** and **data plane**:

- **Control plane** — Makes forwarding decisions (routing protocols, STP, ARP tables)
- **Data plane** — Forwards traffic based on control plane decisions (switching, routing, NAT, ACLs)

Each device independently runs protocols, builds tables, and makes decisions. Configuration is performed device-by-device via CLI, which is time-consuming and error-prone at scale.

### SDN Architecture

SDN **centralizes the control plane** in an SDN controller while devices retain only data plane functions:

| Component | Traditional | SDN |
|-----------|------------|-----|
| Control Plane | Distributed (each device) | Centralized (controller) |
| Data Plane | On each device | On each device |
| Configuration | Per-device CLI | Centralized controller |
| Network View | Per-device (limited) | Global (complete topology) |
| Consistency | Manual effort required | Automatically enforced |

## SDN Controller Functions

The SDN controller serves as the "brain" of the network:

- **Topology discovery** — Builds and maintains a complete map of all network devices and links
- **Path computation** — Calculates optimal forwarding paths with a global view of the network
- **Policy enforcement** — Applies consistent security and QoS policies across all devices
- **Centralized management** — Single point of configuration, monitoring, and troubleshooting
- **Programmability** — Exposes APIs for automation and integration with other systems

## Cisco DNA Center

Cisco DNA Center is Cisco's **intent-based networking (IBN)** platform and serves as an SDN controller for enterprise networks.

### Key Capabilities

- **Design** — Network hierarchy, device templates, IP address management
- **Policy** — Group-based access control, QoS, application policies
- **Provision** — Automated device onboarding and configuration (plug-and-play)
- **Assurance** — AI/ML-driven analytics, proactive issue detection, network health scoring

DNA Center manages devices through Cisco SD-Access, which uses VXLAN and LISP to create a network fabric.

## Northbound and Southbound APIs

The SDN controller communicates in two directions through well-defined APIs:

```
  [ Applications / Scripts / Orchestrators ]
             |
         Northbound API (REST)
             |
      [ SDN Controller ]
             |
        Southbound API (OpenFlow, NETCONF, RESTCONF)
             |
  [ Network Devices (switches, routers, APs) ]
```

### Northbound APIs (Controller to Applications)

- Connect the controller to business applications, dashboards, and automation scripts
- Typically use **REST APIs** with JSON/XML data formats
- Allow developers to request network services without knowing device-level details
- Example: An application requests "isolate this host" and the controller configures all necessary devices

### Southbound APIs (Controller to Devices)

| Protocol | Transport | Data Format | Description |
|----------|-----------|-------------|-------------|
| OpenFlow | TCP | Binary | Directly programs device forwarding tables |
| NETCONF | SSH (TCP 830) | XML (YANG models) | Configuration management with transaction support |
| RESTCONF | HTTPS | JSON or XML (YANG models) | REST-based alternative to NETCONF |
| CLI/SSH | SSH | Text | Legacy device management |

## Intent-Based Networking

Intent-based networking (IBN) translates **business intent** into network configuration:

1. **Business intent** — Administrator expresses desired outcome (e.g., "sales team can access CRM but not engineering servers")
2. **Translation** — Controller converts intent into network policies
3. **Activation** — Controller pushes configurations to all relevant devices automatically
4. **Assurance** — Controller continuously monitors and verifies that the network matches the intent

IBN closes the loop between what the administrator wants and what the network actually does, using automation and analytics to maintain alignment.
