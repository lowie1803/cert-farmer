# VLANs and Trunking

## What is a VLAN?

A **VLAN** (Virtual Local Area Network) is a logical segmentation of a physical network. It creates separate broadcast domains without requiring separate physical infrastructure.

## Benefits of VLANs

- **Security**: Isolate sensitive traffic
- **Performance**: Reduce broadcast traffic
- **Management**: Group users by function, not location
- **Flexibility**: Move users without rewiring

## VLAN Types

| VLAN Type | Purpose |
|-----------|---------|
| Data VLAN | Regular user traffic |
| Voice VLAN | VoIP traffic (QoS prioritized) |
| Management VLAN | Switch management traffic |
| Native VLAN | Untagged traffic on trunk |
| Default VLAN | VLAN 1 (avoid using for security) |

## Port Types

### Access Port
- Belongs to ONE VLAN only
- Connects to end devices (PCs, printers)
- Frames are untagged

### Trunk Port
- Carries MULTIPLE VLANs
- Connects switches together
- Uses 802.1Q tagging

## 802.1Q Tagging

Trunk ports add a 4-byte tag to Ethernet frames:

```
| Dest MAC | Src MAC | 802.1Q Tag | Type | Data | FCS |
                    |   4 B    |
```

The tag contains:
- **TPID**: Tag Protocol ID (0x8100)
- **PCP**: Priority (QoS)
- **DEI**: Drop eligible indicator
- **VID**: VLAN ID (1-4094)

## Native VLAN

- Traffic on the native VLAN is NOT tagged
- Default is VLAN 1 (should be changed)
- Must match on both ends of a trunk
- Mismatch = VLAN leaking security risk

## Basic VLAN Commands (Cisco IOS)

```
! Create VLAN
Switch(config)# vlan 10
Switch(config-vlan)# name SALES

! Assign access port
Switch(config)# interface fa0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10

! Configure trunk
Switch(config)# interface gi0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,30
```
