# Quadratics & Functions

## Quadratic Equations

A quadratic has the form: **ax² + bx + c = 0**

Three solution methods:

### 1. Factoring

Find two numbers that **multiply to c** and **add to b**:

x² − 5x + 6 = 0 → find numbers multiplying to 6, adding to −5: (−2)(−3) ✓

→ (x − 2)(x − 3) = 0 → x = **2** or x = **3**

x² − 16 = 0 → difference of squares: (x−4)(x+4) = 0 → x = ±4

x² − 3x − 10 = 0 → (x−5)(x+2) = 0 → x = 5 or x = −2

### 2. Quadratic Formula

When factoring is difficult:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

The discriminant (b²−4ac) tells you:
- Positive → 2 real roots
- Zero → 1 repeated root
- Negative → no real roots

### 3. Special Patterns to Memorize

| Pattern | Factored Form |
|---------|--------------|
| x² − a² | (x−a)(x+a) — difference of squares |
| x² + 2ax + a² | (x+a)² — perfect square |
| x² − 2ax + a² | (x−a)² — perfect square |

## Vieta's Formulas (Sum & Product of Roots)

For ax² + bx + c = 0 with roots r₁ and r₂:
- **Sum of roots** = r₁ + r₂ = −b/a
- **Product of roots** = r₁ × r₂ = c/a

**Example**: x² − 7x + 12 = 0
- Sum = 7, Product = 12 → roots are 3 and 4. Check: (x−3)(x−4) = 0 ✓

## Functions

A function f(x) gives an output for each input x.

### Evaluating Functions

f(x) = 2x² − 3x + 1. Find f(2):
- f(2) = 2(4) − 3(2) + 1 = 8 − 6 + 1 = **3**

f(x) = x² + 2x. Find f(−3):
- f(−3) = 9 − 6 = **3**

### Function Composition

g(f(x)) means: first apply f, then apply g to the result.

If f(x) = x + 1 and g(x) = x², find g(f(3)):
1. f(3) = 3 + 1 = 4
2. g(4) = 4² = **16**

Note: g(f(x)) ≠ f(g(x)) in general.

## Worked Examples

### Example 1: Repeated root
x² − 4x + 4 = 0 → (x−2)² = 0 → x = **2** (only one solution)

### Example 2: Using sum/product shortcut
If the sum of two numbers is 11 and their product is 24, what are they?
We need two numbers adding to 11 and multiplying to 24: **3 and 8**.

### Example 3: Nested composition
h(x) = 3x − 2, g(x) = x². Find h(g(2)):
- g(2) = 4
- h(4) = 3(4) − 2 = **10**

## Common Traps

- **(x − 2)(x − 3) = 0** means x = 2 OR x = 3, not x = −2 or −3.
- **x² = 9 has two solutions**: x = 3 AND x = −3. Don't forget the negative.
- **Distribution in functions**: f(x+1) ≠ f(x) + 1. Substitute (x+1) everywhere x appears.
- **Vieta's shortcut**: When asked for sum or product of roots, don't solve — just use −b/a and c/a.
