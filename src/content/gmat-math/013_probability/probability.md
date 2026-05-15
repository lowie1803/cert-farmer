# Probability

## Basic Probability

$$P(\text{event}) = \frac{\text{Number of favorable outcomes}}{\text{Total number of outcomes}}$$

Probability is always between 0 and 1 (inclusive).

> Bag has 4 red and 6 blue balls. P(red) = 4/10 = **2/5**

## Complement Rule

$$P(\text{not A}) = 1 - P(A)$$

Use this when "at least one" or "not" appears — it's often easier to calculate the complement.

> P(at least one head in 3 flips) = 1 − P(no heads) = 1 − (1/2)³ = 1 − 1/8 = **7/8**

## Independent Events

Events are **independent** if one occurring doesn't affect the other's probability.

$$P(A \text{ and } B) = P(A) \times P(B)$$

> P(A) = 0.3, P(B) = 0.4, independent. P(A and B) = 0.3 × 0.4 = **0.12**

## Dependent Events (Without Replacement)

When you draw without replacing, probabilities change on each draw.

> Drawing 2 aces from a standard 52-card deck (no replacement).

P(1st ace) = 4/52. P(2nd ace | 1st was ace) = 3/51.
P(both aces) = (4/52) × (3/51) = 12/2652 = **1/221**

## Conditional Probability

$$P(B|A) = \frac{P(A \text{ and } B)}{P(A)}$$

P(B|A) means "probability of B given A has occurred."

> P(A) = 0.5, P(A and B) = 0.3. P(B|A) = 0.3/0.5 = **0.6**

## Mutually Exclusive Events

Two events are **mutually exclusive** if they cannot both occur.

$$P(A \text{ or } B) = P(A) + P(B)$$

For events that CAN both occur (not mutually exclusive):
$$P(A \text{ or } B) = P(A) + P(B) - P(A \text{ and } B)$$

## "At Least One" Problems

**Always use complement**:

P(at least 1) = 1 − P(none)

> A bag has 3 red, 4 blue, 5 green. P(not green) = (3+4)/12 = **7/12**

> Two dice. P(sum ≥ 11)?

Favorable outcomes: (5,6), (6,5), (6,6) = 3 outcomes out of 36.
P = 3/36 = **1/12**

## Worked Examples

### Example 1: Multiple coin flips
P(exactly 2 heads in 3 flips):
Outcomes with 2 heads: HHT, HTH, THH = 3 out of 8.
P = **3/8**

### Example 2: Combined probability
P(A) = 0.6, P(B) = 0.3. A and B mutually exclusive. P(A or B) = 0.6 + 0.3 = **0.9**

### Example 3: "At least one" with complement
Probability that at least one of two dice shows a 6:
P(no 6 on die 1) × P(no 6 on die 2) = 5/6 × 5/6 = 25/36
P(at least one 6) = 1 − 25/36 = **11/36**

## Common Traps

- **"And" ≠ multiply always**: P(A and B) = P(A)×P(B) only if independent.
- **With vs. without replacement**: Always ask — this changes everything.
- **Mutually exclusive ≠ independent**: If A and B are mutually exclusive and both have non-zero probability, they are definitely NOT independent.
- **"Or" uses addition rule**: Don't forget to subtract the overlap.
