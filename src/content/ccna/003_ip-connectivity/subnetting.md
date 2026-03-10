# Subnetting Practice

## The Subnetting Process

### Given: 192.168.10.0/24, create 4 subnets

**Step 1: Determine bits needed**
- 4 subnets = 2² = need 2 bits
- New prefix: /24 + 2 = /26

**Step 2: Calculate subnet details**
- Block size: 256 - 192 = 64
- Hosts per subnet: 2⁶ - 2 = 62

**Step 3: List the subnets**

| Subnet | Network | First Host | Last Host | Broadcast |
|--------|---------|------------|-----------|-----------|
| 1 | 192.168.10.0 | .1 | .62 | .63 |
| 2 | 192.168.10.64 | .65 | .126 | .127 |
| 3 | 192.168.10.128 | .129 | .190 | .191 |
| 4 | 192.168.10.192 | .193 | .254 | .255 |

## Quick Subnet Calculation Method

### The Magic Number Method

1. Find the "interesting octet" (where subnet mask isn't 255 or 0)
2. Subtract mask value from 256 = block size
3. Network addresses are multiples of block size

### Example: What subnet is 172.16.45.200/21 in?

1. /21 = 255.255.248.0
2. Interesting octet: 3rd (248)
3. Block size: 256 - 248 = 8
4. Find multiple of 8 below 45: 45 ÷ 8 = 5.6 → 5 × 8 = 40
5. **Network: 172.16.40.0/21**

## VLSM (Variable Length Subnet Masking)

VLSM allows different subnet sizes within the same network.

### Example: Design for 3 departments
- Sales: 100 hosts → need /25 (126 hosts)
- IT: 50 hosts → need /26 (62 hosts)
- Management: 10 hosts → need /28 (14 hosts)

**Start with the largest requirement first!**

| Dept | Network | Prefix | Range |
|------|---------|--------|-------|
| Sales | 192.168.1.0 | /25 | .1-.126 |
| IT | 192.168.1.128 | /26 | .129-.190 |
| Mgmt | 192.168.1.192 | /28 | .193-.206 |

## Binary Subnet Mask Reference

| Prefix | Binary | Decimal |
|--------|--------|---------|
| /25 | 10000000 | 128 |
| /26 | 11000000 | 192 |
| /27 | 11100000 | 224 |
| /28 | 11110000 | 240 |
| /29 | 11111000 | 248 |
| /30 | 11111100 | 252 |
