# Operators

## Operator Precedence (High → Low)

| Precedence | Operators | Associativity |
|------------|-----------|---------------|
| 1 | `()` `[]` `.` | Left |
| 2 | `++` `--` (postfix) | Left |
| 3 | `++` `--` (prefix) `+` `-` (unary) `~` `!` `(type)` | Right |
| 4 | `*` `/` `%` | Left |
| 5 | `+` `-` | Left |
| 6 | `<<` `>>` `>>>` | Left |
| 7 | `<` `<=` `>` `>=` `instanceof` | Left |
| 8 | `==` `!=` | Left |
| 9 | `&` | Left |
| 10 | `^` | Left |
| 11 | `\|` | Left |
| 12 | `&&` | Left |
| 13 | `\|\|` | Left |
| 14 | `? :` | Right |
| 15 | `=` `+=` `-=` `*=` etc. | Right |

**Tip:** When in doubt, use parentheses. Don't rely on precedence for readability.

## Arithmetic

```java
int a = 10 / 3;    // 3 (integer division truncates)
int b = 10 % 3;    // 1 (remainder)
double c = 10.0 / 3; // 3.333...  (one operand is double)
```

Watch out for **integer overflow** — it wraps silently:
```java
int max = Integer.MAX_VALUE;
System.out.println(max + 1); // -2147483648 (no exception!)
Math.addExact(max, 1);       // throws ArithmeticException
```

## Relational & Equality

- `==` compares **values** for primitives, **references** for objects
- `.equals()` compares **content** for objects
- `!=`, `<`, `>`, `<=`, `>=` work as expected on primitives

## Logical (Short-Circuit)

| Operator | Behavior |
|----------|----------|
| `&&` | Short-circuit AND — skips right if left is false |
| `\|\|` | Short-circuit OR — skips right if left is true |
| `!` | Logical NOT |
| `&` `\|` | Non-short-circuit (evaluates both sides) |

## Bitwise

```java
int flags = 0b1010;
flags & 0b1100;   // 0b1000 — AND
flags | 0b0001;   // 0b1011 — OR
flags ^ 0b1111;   // 0b0101 — XOR
~flags;            // inverts all bits
flags << 2;        // shift left (multiply by 4)
flags >> 1;        // arithmetic shift right (preserves sign)
flags >>> 1;       // logical shift right (fills with 0)
```

## instanceof with Pattern Matching (Java 16+)

Old way:
```java
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}
```

New way — binds the variable in one step:
```java
if (obj instanceof String s) {
    System.out.println(s.length()); // s is already cast
}
```

The pattern variable `s` is in scope where the compiler can prove the match succeeded (flow scoping).

## String Concatenation

```java
// + operator — fine for simple cases
String msg = "Hello, " + name + "!";

// StringBuilder — use in loops
StringBuilder sb = new StringBuilder();
for (var item : items) sb.append(item).append("\n");

// String.format / formatted (Java 15+)
String msg = "Score: %d/%d".formatted(score, total);
```

The `+` operator compiles to `StringBuilder` (or `invokedynamic` in Java 9+), but using it inside a loop creates a new builder each iteration — use `StringBuilder` explicitly.
