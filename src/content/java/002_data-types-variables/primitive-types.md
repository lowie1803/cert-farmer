# Primitive Types

## The 8 Primitives

| Type | Size | Range | Default |
|------|------|-------|---------|
| `byte` | 8-bit | -128 to 127 | `0` |
| `short` | 16-bit | -32,768 to 32,767 | `0` |
| `int` | 32-bit | -2^31 to 2^31 - 1 | `0` |
| `long` | 64-bit | -2^63 to 2^63 - 1 | `0L` |
| `float` | 32-bit | ~6-7 decimal digits | `0.0f` |
| `double` | 64-bit | ~15 decimal digits | `0.0d` |
| `boolean` | JVM-specific | `true` / `false` | `false` |
| `char` | 16-bit | Unicode 0 to 65,535 | `'\u0000'` |

**Note:** Default values apply to **fields** only. Local variables must be explicitly initialized before use.

## Numeric Literals

```java
int decimal    = 1_000_000;      // underscores for readability
int hex        = 0xFF;           // hexadecimal
int octal      = 0177;           // octal (leading zero)
int binary     = 0b1010_1100;    // binary (Java 7+)
long big       = 10_000_000_000L; // L suffix required for long
float pi       = 3.14f;          // f suffix required for float
double precise = 3.141592653589; // double is default for decimals
```

Underscores can appear **between digits only** — not at the start, end, or adjacent to the decimal point.

## Autoboxing & Unboxing

Java automatically converts between primitives and wrapper classes:

```java
Integer boxed = 42;         // autoboxing: int → Integer
int unboxed = boxed;        // unboxing: Integer → int

List<Integer> list = new ArrayList<>();
list.add(5);                // autoboxing into collection
int val = list.get(0);      // unboxing from collection
```

## Wrapper Classes

| Primitive | Wrapper | Useful Methods |
|-----------|---------|----------------|
| `int` | `Integer` | `parseInt()`, `valueOf()`, `MAX_VALUE` |
| `long` | `Long` | `parseLong()`, `compare()` |
| `double` | `Double` | `parseDouble()`, `isNaN()`, `isInfinite()` |
| `boolean` | `Boolean` | `parseBoolean()`, `TRUE`, `FALSE` |
| `char` | `Character` | `isDigit()`, `isLetter()`, `toUpperCase()` |

## Pitfalls

- **Integer cache**: `Integer.valueOf()` caches values -128 to 127. Comparing with `==` works in that range but fails outside it — always use `.equals()` for wrapper comparison.
- **Null unboxing**: Unboxing a `null` wrapper throws `NullPointerException`.
- **Widening**: `int` → `long` → `float` → `double` is automatic. Narrowing requires explicit cast: `(int) myLong`.
- **float precision**: Never use `float`/`double` for money — use `BigDecimal`.
