# OSPF Concepts

Open Shortest Path First (OSPF) is a link-state routing protocol defined in RFC 2328 (OSPFv2 for IPv4) and RFC 5340 (OSPFv3 for IPv6). It is an open standard, widely deployed in enterprise networks, and a core topic on the CCNA 200-301 exam.

## Link-State Routing Overview

Unlike distance-vector protocols (RIP, EIGRP), link-state protocols give every router a **complete topology map** of the network. Each router independently runs the Dijkstra SPF algorithm to calculate the shortest path tree to every destination. This approach provides:

- **Fast convergence** -- Topology changes are flooded immediately via LSAs.
- **Loop-free paths** -- Each router computes its own shortest path independently.
- **Scalable design** -- Hierarchical areas reduce LSDB size and SPF computation.

## OSPF Characteristics

| Attribute | Value |
|---|---|
| Protocol type | Link-state |
| Algorithm | Dijkstra (SPF) |
| Administrative distance | 110 |
| Metric | Cost (based on bandwidth) |
| Transport | IP protocol 89 |
| Classless | Yes (carries subnet mask in updates) |
| Update type | Triggered (not periodic) |
| Multicast addresses | 224.0.0.5 (AllSPFRouters), 224.0.0.6 (AllDRRouters) |

## Single-Area OSPF

The CCNA exam focuses on **single-area OSPF** where all routers reside in **Area 0** (the backbone area). In single-area designs every router shares the same Link-State Database (LSDB) and has full visibility of the topology.

## Neighbor Adjacency Requirements

Two OSPF routers will only form a neighbor relationship if **all** of the following match:

- **Area ID** -- Both interfaces must be in the same OSPF area.
- **Subnet** -- Interfaces must be on the same IP subnet.
- **Hello and Dead timers** -- Must match (default: Hello 10s, Dead 40s on broadcast/point-to-point).
- **Authentication** -- Type and credentials must match if configured.
- **MTU** -- Must match (mismatched MTU prevents full adjacency).
- **Stub area flags** -- Both routers must agree on stub/NSSA settings.

## Hello Protocol

OSPF discovers and maintains neighbors using Hello packets:

- Sent to multicast **224.0.0.5** on broadcast and point-to-point networks.
- Default **Hello interval**: 10 seconds (broadcast/point-to-point), 30 seconds (NBMA).
- Default **Dead interval**: 4x Hello (40 seconds on broadcast).
- Carries the router ID, area ID, priority, DR/BDR addresses, and neighbor list.

## DR/BDR Election

On multi-access (broadcast) segments, OSPF elects a **Designated Router (DR)** and **Backup Designated Router (BDR)** to reduce LSA flooding overhead.

### Election Rules

1. The router with the **highest OSPF priority** becomes DR (default priority is 1; priority 0 means the router cannot be elected).
2. If priorities tie, the router with the **highest Router ID** wins.
3. The election is **non-preemptive** -- a new router with a higher priority does not displace an existing DR.

All non-DR/BDR routers (DROther) send updates to **224.0.0.6**; the DR then floods LSAs to **224.0.0.5**.

## OSPF Router ID Selection

The Router ID (RID) is a 32-bit identifier chosen in this order:

1. **Manually configured** RID (`router-id x.x.x.x`).
2. **Highest IP on any loopback** interface that is up.
3. **Highest IP on any active physical** interface.

The RID is set when the OSPF process starts. Changing it requires reloading the process (`clear ip ospf process`).

## LSA Flooding and LSDB

When a topology change occurs, the detecting router generates a **Link-State Advertisement (LSA)** and floods it to all OSPF neighbors. Each router stores received LSAs in its **Link-State Database (LSDB)**, then re-runs SPF to update the routing table. LSAs are refreshed every 30 minutes by default to ensure database accuracy.
