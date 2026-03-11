# Static & Default Routes

Static routes are manually configured entries in the routing table. They do not adapt to topology changes automatically, making them best suited for simple or predictable network designs.

## When to Use Static Routes

- **Small networks** -- Where the overhead of a dynamic routing protocol is unnecessary.
- **Stub networks** -- Networks with only one exit path (e.g., a branch office with a single WAN link).
- **Backup routes** -- Floating static routes that activate only when a primary dynamic route fails.
- **Default routes** -- Directing all unknown traffic toward an ISP or upstream router.

## Static Route Configuration Syntax

```
Router(config)# ip route <destination-network> <subnet-mask> <next-hop-ip | exit-interface>
```

### Next-Hop Static Route

Specifies the IP address of the next router:

```
Router(config)# ip route 192.168.10.0 255.255.255.0 10.0.0.2
```

### Exit-Interface Static Route

Specifies the local outbound interface:

```
Router(config)# ip route 192.168.10.0 255.255.255.0 GigabitEthernet0/1
```

### Fully Specified Static Route

Combines both next-hop and exit interface (required on multi-access networks to avoid recursive lookups):

```
Router(config)# ip route 192.168.10.0 255.255.255.0 GigabitEthernet0/1 10.0.0.2
```

| Type | Pros | Cons |
|---|---|---|
| Next-hop only | Clear forwarding path | Requires recursive lookup |
| Exit-interface only | No recursive lookup | Can cause ARP issues on multi-access links |
| Fully specified | Most precise, no recursion | More configuration effort |

## Default Route (Gateway of Last Resort)

A default route matches all destinations not explicitly in the routing table. It uses a destination and mask of all zeros:

```
Router(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1
```

After configuration, `show ip route` displays:

```
S*   0.0.0.0/0 [1/0] via 203.0.113.1
```

The asterisk (`*`) indicates this route is the **gateway of last resort**.

## Floating Static Routes

A floating static route is a backup route configured with a **higher administrative distance** than the primary route. It remains hidden in the routing table until the preferred route disappears.

**Example:** OSPF provides a primary route (AD=110). A floating static is configured with AD=115:

```
Router(config)# ip route 10.10.0.0 255.255.0.0 192.168.1.2 115
```

- While OSPF is active, the OSPF route (AD 110) is preferred.
- If the OSPF route is lost, the static route (AD 115) is installed in the routing table.

The AD value is appended at the end of the `ip route` command. The default AD for a standard static route is **1**.

## IPv6 Static Routes

IPv6 static route syntax mirrors IPv4 but uses the `ipv6 route` command and IPv6 prefixes:

```
Router(config)# ipv6 unicast-routing
Router(config)# ipv6 route 2001:db8:acad::/48 2001:db8:feed::1
```

### IPv6 Default Route

```
Router(config)# ipv6 route ::/0 2001:db8:feed::1
```

The prefix `::/0` is the IPv6 equivalent of `0.0.0.0 0.0.0.0`.

## Verification Commands

| Command | Purpose |
|---|---|
| `show ip route static` | Display only static routes |
| `show ip route` | Display the full routing table |
| `show ipv6 route static` | Display IPv6 static routes |
| `show running-config \| section ip route` | Show static route configuration lines |

Static routes are simple to implement and consume no bandwidth for routing updates, but they require manual updates whenever the topology changes.
