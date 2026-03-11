# Access Control Lists (ACL)

## What is an ACL?

An ACL is a sequential list of permit/deny statements that filter traffic based on criteria like:
- Source IP
- Destination IP
- Protocol
- Port numbers

## ACL Types

### Standard ACL (1-99, 1300-1999)
- Filters by **source IP only**
- Place **close to destination**

### Extended ACL (100-199, 2000-2699)
- Filters by source, destination, protocol, ports
- Place **close to source**

## ACL Rules

1. Processed **top to bottom**
2. First match wins
3. Implicit **deny all** at end
4. One ACL per interface, per direction, per protocol

## Wildcard Masks

Opposite of subnet mask:
- 0 = must match
- 1 = ignore

| Match | Wildcard |
|-------|----------|
| Exact host | 0.0.0.0 |
| /24 network | 0.0.0.255 |
| /16 network | 0.0.255.255 |
| Any | 255.255.255.255 |

## Standard ACL Configuration

```
! Block 192.168.1.0/24 from reaching server
Router(config)# access-list 10 deny 192.168.1.0 0.0.0.255
Router(config)# access-list 10 permit any

! Apply to interface (outbound, close to destination)
Router(config)# interface gi0/0
Router(config-if)# ip access-group 10 out
```

## Extended ACL Configuration

```
! Allow HTTP to web server, deny all else
Router(config)# access-list 100 permit tcp any host 10.1.1.100 eq 80
Router(config)# access-list 100 permit tcp any host 10.1.1.100 eq 443

! Apply close to source
Router(config)# interface gi0/1
Router(config-if)# ip access-group 100 in
```

## Named ACLs

```
Router(config)# ip access-list extended WEB-FILTER
Router(config-ext-nacl)# permit tcp any any eq 80
Router(config-ext-nacl)# permit tcp any any eq 443
Router(config-ext-nacl)# deny ip any any log
```
