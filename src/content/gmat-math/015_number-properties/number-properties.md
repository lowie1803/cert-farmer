# Number Properties

## Odd & Even Rules

| Operation | Rule | Example |
|-----------|------|---------|
| Even + Even | Even | 4+6=10 |
| Odd + Odd | Even | 3+5=8 |
| Even + Odd | Odd | 4+5=9 |
| Even × Even | Even | 4×6=24 |
| Even × Odd | Even | 4×3=12 |
| Odd × Odd | Odd | 3×5=15 |

**Key**: Any product with an even factor is even. For a product to be odd, **all** factors must be odd.

> If x is even, which must be odd? x+1 ✓ (even+odd=odd), x+2 ✗ (even), 2x ✗ (even), x² ✗ (even).

## Positive & Negative Rules

| Operation | Rule |
|-----------|------|
| (+)(+) | Positive |
| (−)(−) | Positive |
| (+)(−) | Negative |
| (−)(−)(−) | Negative |

Even number of negatives multiplied → positive.  
Odd number of negatives multiplied → negative.

## Units Digits (Cyclicity)

The units digit of powers of a number follows a cycle.

| Base | Cycle | Period |
|------|-------|--------|
| 2 | 2,4,8,6 | 4 |
| 3 | 3,9,7,1 | 4 |
| 4 | 4,6 | 2 |
| 7 | 7,9,3,1 | 4 |
| 8 | 8,4,2,6 | 4 |
| 9 | 9,1 | 2 |
| 1,5,6 | always 1,5,6 | 1 |

> Units digit of 7⁴?
Cycle for 7: 7,9,3,1 (period 4). 4 mod 4 = 0 → 4th position = **1**

> Units digit of 3¹⁵?
Cycle: 3,9,7,1. 15 mod 4 = 3 → 3rd position = **7**

## Remainders

> When n is divided by 5, remainder is 3. What is the remainder when 2n is divided by 5?

n = 5q + 3 → 2n = 10q + 6 = 10q + 5 + 1. Remainder = **1**

### Remainders of Powers

> Remainder when 2¹⁰ is divided by 7?

Find the cycle: 2¹=2, 2²=4, 2³=8≡1 (mod 7). Cycle = 3.
10 mod 3 = 1 → 2¹⁰ ≡ 2¹ ≡ **2** (mod 7)

## Number of Factors

n = p₁^a × p₂^b × ... → factors = (a+1)(b+1)...

> n = 2^a × 3^b has (a+1)(b+1) factors.

## Sum of Consecutive Integers

Sum of integers from 1 to n = n(n+1)/2

Sum of odd integers from 1 to (2k−1): there are k terms, sum = k²

> Sum of odd integers from 1 to 19: 10 terms (1,3,5,...,19). Sum = 10² = **100**

## Worked Examples

### Example 1: Units digit of a large power
Units digit of 8^200?
Cycle for 8: 8,4,2,6 (period 4). 200 mod 4 = 0 → 4th position = **6**

### Example 2: Remainder pattern
The sum of two consecutive integers is 47. What is the product?
n + (n+1) = 47 → 2n = 46 → n = 23, n+1 = 24.
Product = 23 × 24 = **552**

### Example 3: Divisibility and remainders
What is the remainder when 3¹⁰⁰ is divided by 8?
3¹ = 3, 3² = 9 ≡ 1 (mod 8). Cycle = 2.
100 mod 2 = 0 → 3¹⁰⁰ ≡ 3² ≡ 1 (mod 8). Remainder = **1**

## Common Traps

- **Zero is even**: 0 is an even integer, and 0 is neither positive nor negative.
- **Negative remainders**: Remainder is always non-negative (0 to divisor−1).
- **Sum of 1 to n**: Formula gives 1+2+...+n, not 0+1+...+n.
- **Units digit of a product**: Only the units digits of the factors matter.
  Units digit of 37 × 43 = units digit of 7 × 3 = 1.
