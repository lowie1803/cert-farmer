# IPv6 Configuration

Configuring IPv6 on Cisco devices involves enabling IPv6 routing, assigning addresses, and understanding how hosts automatically obtain addresses through SLAAC or DHCPv6. Neighbor Discovery Protocol (NDP) is the backbone of IPv6 operations on the local link.

## Enabling IPv6 on Cisco Routers

```
Router(config)# ipv6 unicast-routing
Router(config)# interface GigabitEthernet0/0
Router(config-if)# ipv6 address 2001:DB8:ACAD:1::1/64
Router(config-if)# ipv6 address FE80::1 link-local
Router(config-if)# no shutdown
```

- `ipv6 unicast-routing` enables the router to forward IPv6 packets (disabled by default)
- Without this command, the device acts as an IPv6 host, not a router
- A link-local address is auto-generated, but you can manually set one for predictability

### Useful Verification Commands

```
Router# show ipv6 interface brief
Router# show ipv6 interface GigabitEthernet0/0
Router# show ipv6 route
Router# show ipv6 neighbors
Router# ping ipv6 2001:DB8:ACAD:1::2
```

## SLAAC (Stateless Address Autoconfiguration)

SLAAC allows a host to configure its own IPv6 address without a DHCP server:

1. Host sends a **Router Solicitation (RS)** to FF02::2 (all routers)
2. Router responds with a **Router Advertisement (RA)** containing the network prefix, prefix length, and default gateway
3. Host generates its interface ID using either **EUI-64** or a **random value** (privacy extensions)
4. Host combines the prefix from the RA with its interface ID to form a complete address
5. Host performs **Duplicate Address Detection (DAD)** using a Neighbor Solicitation before using the address

SLAAC is the default behavior. The router interface does not need any special configuration beyond having an IPv6 address and `ipv6 unicast-routing` enabled.

## DHCPv6

### Stateless DHCPv6

- The RA tells hosts to use SLAAC for addressing **but** contact a DHCPv6 server for additional information (DNS server, domain name)
- The **O flag** (Other Configuration) is set in the RA

```
Router(config-if)# ipv6 nd other-config-flag
```

### Stateful DHCPv6

- The RA tells hosts to obtain their **entire address** from a DHCPv6 server
- The **M flag** (Managed Address Configuration) is set in the RA
- The DHCPv6 server tracks which addresses have been assigned (stateful)

```
Router(config-if)# ipv6 nd managed-config-flag
```

| Feature | SLAAC | Stateless DHCPv6 | Stateful DHCPv6 |
|---------|-------|------------------|-----------------|
| Address from | SLAAC (RA prefix) | SLAAC (RA prefix) | DHCPv6 server |
| DNS/Options from | Not provided | DHCPv6 server | DHCPv6 server |
| RA Flags | A=1, O=0, M=0 | A=1, O=1, M=0 | M=1 |
| Server tracks addresses | No | No | Yes |

## Neighbor Discovery Protocol (NDP)

NDP replaces ARP from IPv4 and uses ICMPv6 messages. It operates at the link-local scope.

| Message | ICMPv6 Type | Purpose |
|---------|------------|---------|
| Router Solicitation (RS) | 133 | Host asks for RA from routers (sent to FF02::2) |
| Router Advertisement (RA) | 134 | Router announces prefix, gateway, flags (sent to FF02::1) |
| Neighbor Solicitation (NS) | 135 | Resolve IPv6 address to MAC (like ARP request), also used for DAD |
| Neighbor Advertisement (NA) | 136 | Reply with MAC address (like ARP reply) |

### NDP Functions

- **Address resolution**: NS/NA replace ARP — host sends NS to the solicited-node multicast address to resolve a neighbor's MAC
- **Duplicate Address Detection (DAD)**: Before using an address, a host sends an NS for its own address. If no NA is received, the address is unique
- **Router discovery**: RS/RA allow hosts to discover routers and obtain prefix information
- **Redirect**: Routers can inform hosts of a better next-hop for a destination

## IPv6 Transition Mechanisms

- **Dual-stack**: Devices run both IPv4 and IPv6 simultaneously. The preferred and most common approach. DNS determines which protocol to use based on the available records (A for IPv4, AAAA for IPv6)
- **Tunneling**: Encapsulates IPv6 packets inside IPv4 packets to traverse IPv4-only networks (e.g., 6to4, ISATAP, GRE tunnels)
- **NAT64**: Translates between IPv6 and IPv4 packets, allowing IPv6-only hosts to communicate with IPv4-only hosts
