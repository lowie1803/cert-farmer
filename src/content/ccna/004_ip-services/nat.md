# Network Address Translation

## Why NAT?

- IPv4 address exhaustion
- Allows private IPs to access Internet
- Provides basic security (hides internal structure)

## NAT Types

### Static NAT
- One-to-one mapping
- Private IP always maps to same public IP
- Used for servers that need consistent external access

### Dynamic NAT
- Pool of public IPs
- First-come, first-served assignment
- Not commonly used today

### PAT (Port Address Translation)
- Also called NAT Overload
- Many private IPs share ONE public IP
- Differentiated by port numbers
- Most common type (home routers)

## NAT Terminology

| Term | Definition |
|------|------------|
| Inside Local | Private IP of internal host |
| Inside Global | Public IP representing internal host |
| Outside Local | How external host appears internally |
| Outside Global | Actual public IP of external host |

## PAT Example

| Inside Local | Inside Global | Destination |
|--------------|---------------|-------------|
| 192.168.1.10:50000 | 203.0.113.1:40001 | 8.8.8.8:53 |
| 192.168.1.11:50000 | 203.0.113.1:40002 | 8.8.8.8:53 |
| 192.168.1.12:51000 | 203.0.113.1:40003 | 1.1.1.1:443 |

All three internal hosts share one public IP!

## NAT Configuration (Cisco)

```
! Define inside and outside interfaces
Router(config)# interface gi0/0
Router(config-if)# ip nat inside

Router(config)# interface gi0/1
Router(config-if)# ip nat outside

! Configure PAT
Router(config)# ip nat inside source list 1 interface gi0/1 overload
Router(config)# access-list 1 permit 192.168.1.0 0.0.0.255
```
