# Virtualization & Cloud

Virtualization abstracts physical hardware into multiple virtual instances, improving resource utilization and flexibility. Cloud computing builds on virtualization to deliver IT services over the network. Both topics are covered on the CCNA 200-301 exam.

## Virtual Machines vs Containers

| Feature | Virtual Machines | Containers |
|---------|-----------------|------------|
| Isolation | Full OS per VM | Shared host OS kernel |
| Size | Gigabytes (includes full OS) | Megabytes (app + dependencies only) |
| Boot Time | Minutes | Seconds |
| Resource Usage | Higher (dedicated OS overhead) | Lower (shared kernel) |
| Portability | Less portable | Highly portable |
| Use Case | Running different OSes, strong isolation | Microservices, rapid deployment |
| Examples | VMware VMs, Hyper-V VMs | Docker, Kubernetes pods |

- VMs provide **hardware-level virtualization** — each VM runs its own operating system
- Containers provide **OS-level virtualization** — they share the host kernel but isolate application processes

## Hypervisor Types

A hypervisor is the software layer that creates and manages virtual machines.

### Type 1 — Bare-Metal Hypervisor

- Runs directly on physical hardware (no host OS required)
- Better performance and lower latency
- Used in enterprise data centers and production environments
- Examples: **VMware ESXi**, **Microsoft Hyper-V** (standalone), **Citrix Hypervisor (XenServer)**

### Type 2 — Hosted Hypervisor

- Runs as an application on top of a host operating system
- Easier to install but higher overhead
- Used for development, testing, and lab environments
- Examples: **VMware Workstation**, **Oracle VirtualBox**, **Parallels Desktop**

## Cloud Service Models

| Model | You Manage | Provider Manages | Example |
|-------|-----------|-----------------|---------|
| **IaaS** (Infrastructure as a Service) | OS, apps, data, middleware | Servers, storage, networking, virtualization | AWS EC2, Azure VMs, Google Compute Engine |
| **PaaS** (Platform as a Service) | Applications, data | OS, middleware, runtime, infrastructure | AWS Elastic Beanstalk, Google App Engine, Heroku |
| **SaaS** (Software as a Service) | Just use it | Everything | Microsoft 365, Salesforce, Google Workspace |

The key distinction: as you move from IaaS to SaaS, **you manage less** and the **provider manages more**.

## Cloud Deployment Models

- **Public Cloud**: Resources shared among multiple tenants over the internet. Lowest cost, highest scalability. Examples: AWS, Azure, Google Cloud.
- **Private Cloud**: Dedicated infrastructure for a single organization. Can be on-premises or hosted. Greater control and security.
- **Hybrid Cloud**: Combines public and private clouds. Data and applications can move between them. Common approach for enterprises migrating gradually to the cloud.
- **Community Cloud**: Shared infrastructure among organizations with common requirements (compliance, security). Example: government agencies sharing a FedRAMP-certified cloud.

## Virtual Network Infrastructure

Virtualization extends to networking components within the hypervisor:

- **vSwitch (Virtual Switch)**: A software-based Layer 2 switch inside the hypervisor that connects VMs to each other and to the physical network. Supports VLANs, port groups, and traffic policies. Examples: VMware vSwitch, Open vSwitch (OVS).
- **vNIC (Virtual Network Interface Card)**: A software-emulated NIC assigned to each VM. Each vNIC has its own MAC address and connects to a vSwitch port group.
- **Port Group**: A logical grouping on a vSwitch that defines VLAN assignment and network policies for connected VMs.

### Virtual Network Benefits

- Rapid provisioning of network segments without physical cabling
- Isolation between VM traffic using virtual VLANs
- Easy migration of VMs between hosts (vMotion) with network settings preserved
- Centralized management of virtual network policies
