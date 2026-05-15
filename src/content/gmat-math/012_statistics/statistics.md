# Statistics

## Measures of Central Tendency

### Mean (Average)

$$\text{Mean} = \frac{\text{Sum of all values}}{\text{Number of values}}$$

Data: 3, 7, 8, 10, 12 → Sum = 40, n = 5 → Mean = **8**

**Useful property**: Sum = Mean × n. If you know the mean and count, you know the sum.

> The mean of 5 numbers is 12. A 6th number of 18 is added. New mean?
Sum = 5×12 = 60. New sum = 78. New mean = 78/6 = **13**

### Median

The **middle value** when data is sorted. For even number of values, average the two middle values.

Sorted data: 3, 7, **8**, 10, 12 → Median = **8**

Sorted data: 3, 7, **8, 9**, 10, 12 → Median = (8+9)/2 = **8.5**

### Mode

The value that appears **most frequently**. A data set can have multiple modes or no mode.

Data: 2, 3, 3, 4, 5, 5, 5, 6 → Mode = **5** (appears 3 times)

## Measures of Spread

### Range

Range = Maximum − Minimum

Data: 4, 7, 9, 15, 22 → Range = 22 − 4 = **18**

### Standard Deviation (SD)

SD measures how spread out values are from the mean. GMAT Focus tests intuition, not calculation.

- **Low SD**: values clustered close to the mean (e.g., 9, 10, 10, 10, 11)
- **High SD**: values spread far from the mean (e.g., 0, 5, 10, 15, 20)

Key facts:
- SD is always ≥ 0.
- SD = 0 only when all values are identical.
- Adding or subtracting a constant to all values does **not** change SD (the spread stays the same).
- Multiplying all values by a constant k multiplies SD by |k|.

## Effect of Transformations

| Change | Effect on Mean | Effect on Median | Effect on SD |
|--------|---------------|-----------------|--------------|
| Add k to each value | Mean + k | Median + k | Unchanged |
| Multiply each by k | Mean × k | Median × k | SD × |k| |
| Add a new value | Changes | May change | May change |

> A data set has mean = 50. Each value is increased by 10. New mean?
Mean = **60**. SD is unchanged.

## Outliers

An **outlier** is an extreme value far from the rest.

- Outliers strongly affect the **mean**.
- Outliers minimally affect the **median** (it's the middle value, immune to extremes).
- The median is the most **resistant** (robust) measure to outliers.

> Data: 10, 12, 13, 14, 100. Mean = 149/5 = 29.8. Median = 13.
The outlier (100) pulls the mean up dramatically, but barely moves the median.

## Worked Examples

### Example 1: Finding missing value from mean
The average of 6 tests is 82. What must the 7th score be to bring the average to 84?
- Total needed: 84 × 7 = 588
- Current total: 82 × 6 = 492
- 7th score = 588 − 492 = **96**

### Example 2: Median of even-count set
Data: 3, 7, 7, 9, 11, 13. Median = (7+9)/2 = **8**

### Example 3: SD comparison
Set A: {10, 10, 10, 10}. Set B: {8, 9, 11, 12}.
Set A has SD = 0. Set B has SD > 0. Set A is more consistent.

## Common Traps

- **Mean ≠ Median**: For skewed data, they differ substantially.
- **New value changes the base**: Adding a value to a set changes both sum and count.
- **"Average" in GMAT usually means arithmetic mean** — not geometric or harmonic mean (unless specified).
- **SD ≠ range**: A high range doesn't guarantee high SD (e.g., 0, 50, 50, 50, 100 has range 100 but low spread for most values).
