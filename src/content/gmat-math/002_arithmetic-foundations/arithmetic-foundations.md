# Arithmetic Foundations

## Integers

An **integer** is any whole number (positive, negative, or zero): ..., -3, -2, -1, 0, 1, 2, 3, ...

- **Positive integers**: 1, 2, 3, ...
- **Non-negative integers**: 0, 1, 2, 3, ... (includes zero)
- Zero is neither positive nor negative.

## Prime Numbers

A **prime number** is a positive integer greater than 1 that has exactly two factors: 1 and itself.

**First 15 primes**: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47

Key facts:
- 2 is the only even prime.
- 1 is **not** prime.
- To test if n is prime, check divisibility by all primes up to √n.

> **GMAT trap**: "Is 1 prime?" — No. "Is 2 prime?" — Yes.

## Factors and Multiples

- **Factor (divisor)**: a divides evenly into b → a is a factor of b. (3 is a factor of 12)
- **Multiple**: b is a multiple of a if a × k = b for some integer k. (12 is a multiple of 3)

### Counting Factors via Prime Factorization

1. Write n as a product of prime powers: n = p₁^a × p₂^b × ...
2. Number of factors = (a+1)(b+1)...

**Example**: 36 = 2² × 3² → factors = (2+1)(2+1) = 9 factors: {1, 2, 3, 4, 6, 9, 12, 18, 36}

## Divisibility Rules

| Divisor | Rule |
|---------|------|
| 2 | Last digit is even |
| 3 | Sum of digits divisible by 3 |
| 4 | Last two digits divisible by 4 |
| 5 | Last digit is 0 or 5 |
| 6 | Divisible by both 2 and 3 |
| 8 | Last three digits divisible by 8 |
| 9 | Sum of digits divisible by 9 |
| 10 | Last digit is 0 |

## Greatest Common Divisor (GCD)

The **GCD** (also called GCF) of two numbers is the largest integer that divides both.

**Method — prime factorization**:
1. Factor both numbers.
2. Take the **minimum** power of each shared prime.

**Example**: GCD(72, 120)
- 72 = 2³ × 3²
- 120 = 2³ × 3 × 5
- GCD = 2³ × 3¹ = 24

## Least Common Multiple (LCM)

The **LCM** is the smallest positive integer divisible by both numbers.

**Method — prime factorization**:
1. Factor both numbers.
2. Take the **maximum** power of each prime that appears.

**Example**: LCM(8, 12)
- 8 = 2³
- 12 = 2² × 3
- LCM = 2³ × 3 = 24

**Key identity**: GCD(a,b) × LCM(a,b) = a × b

## Remainders

When a is divided by b: a = b × q + r, where 0 ≤ r < b.

- r is the **remainder**
- q is the **quotient**

**Example**: 100 ÷ 7 = 14 remainder 2, because 7 × 14 = 98, 100 − 98 = 2.

Remainders cycle predictably — useful for "what is the remainder when 10^50 is divided by 3?" type questions.

## Worked Examples

### Example 1: Factors of 84
84 = 2² × 3 × 7 → (2+1)(1+1)(1+1) = 12 factors

### Example 2: LCM application
A timer beeps every 6 minutes, another every 8 minutes. Starting together, when do they next beep at the same time?
LCM(6, 8) = 24 minutes.

### Example 3: GCD application
You have 36 red and 48 blue tiles. What is the largest square grid size where each row has only one color?
GCD(36, 48) = 12.

## Common Traps

- **Consecutive integers**: product of n consecutive integers is always divisible by n!
- **"Factor of n"** is not the same as **"factor of n²"**: 6 is not a factor of 9, but 3 is a factor of both 6 and 9.
- Divisible by 6 ≠ divisible by 4 (you must check both 2 and 3 for 6, but that doesn't imply 4).
