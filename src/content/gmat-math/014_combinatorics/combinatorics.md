# Combinatorics

## Fundamental Counting Principle

If event A has m outcomes and event B has n outcomes, there are **m × n** total combined outcomes.

> A menu: 3 appetizers, 4 entrees, 2 desserts. How many possible meals?
3 × 4 × 2 = **24**

## Factorials

n! = n × (n−1) × (n−2) × ... × 2 × 1

- 5! = 120
- 4! = 24
- 3! = 6
- 0! = 1 (by definition)

## Permutations (Order Matters)

A **permutation** is an arrangement where order matters.

$$P(n, r) = \frac{n!}{(n-r)!}$$

n = total items, r = items selected

> Choose a president and VP from 8 candidates (different roles = order matters).
P(8, 2) = 8!/6! = 8 × 7 = **56**

> Arrange 5 books in a row:
P(5, 5) = 5! = **120**

### Slot Method (often faster)

Fill slots one at a time, counting choices for each:
- 1st slot: 8 choices
- 2nd slot: 7 choices (one used)
- Total: 8 × 7 = **56**

## Combinations (Order Doesn't Matter)

A **combination** is a selection where order doesn't matter.

$$C(n, r) = \frac{n!}{r!(n-r)!}$$

> Choose 3 people from a group of 7 (a committee — order doesn't matter).
C(7, 3) = 7!/(3! × 4!) = (7×6×5)/(3×2×1) = 210/6 = **35**

### Permutation vs. Combination Decision

| Situation | Use |
|-----------|-----|
| President, VP, Secretary (specific roles) | Permutation |
| Committee of 3 | Combination |
| Arranging in a line | Permutation |
| Choosing a subset | Combination |

**Key question**: Does swapping two people create a different outcome? If yes → Permutation. If no → Combination.

## Mixed Problems

> A committee of 2 men and 3 women from 5 men and 6 women.

- Choose 2 men from 5: C(5,2) = 10
- Choose 3 women from 6: C(6,3) = 20
- Total: 10 × 20 = **200**

> Passwords: 3 letters then 2 digits, no repeats.

- Letters: 26 × 25 × 24 = 15,600
- Digits: 10 × 9 = 90
- Total: 15,600 × 90 = **1,404,000**

## Worked Examples

### Example 1: Arrangements with restriction
How many ways to arrange A, B, C, D, E in a line if A must be first?
A is fixed. Arrange remaining 4: 4! = **24**

### Example 2: Choosing from 9 (C(9,4))
C(9,4) = 9!/(4!×5!) = (9×8×7×6)/(4×3×2×1) = 3024/24 = **126**

### Example 3: Class election
10 students. Choose president, secretary, treasurer (order matters).
P(10, 3) = 10 × 9 × 8 = **720**

## Common Traps

- **Order confusion**: "Choose 3 committee members" = combination. "Rank the top 3 finishers" = permutation.
- **Restrictions**: Apply restrictions first — fix the restricted element, then count the rest.
- **C(n,r) = C(n, n−r)**: C(10,3) = C(10,7) = 120. Choosing 3 to include = choosing 7 to exclude.
- **Identical items**: If some items are identical, divide by the factorial of repeated items.
