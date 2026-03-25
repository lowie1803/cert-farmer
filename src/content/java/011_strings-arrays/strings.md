# Strings & Text Blocks

## String Immutability & Pool

Strings in Java are **immutable** — every modification creates a new object. The JVM maintains a **String pool** (in heap) to reuse literals.

```java
String a = "hello";          // pool
String b = "hello";          // same reference from pool
String c = new String("hello"); // new object on heap

a == b       // true  (same pool reference)
a == c       // false (different objects)
a.equals(c)  // true  (same content)
```

Use `.equals()` for content comparison, never `==`.

## Common String Methods

| Method | Returns | Example |
|--------|---------|---------|
| `charAt(i)` | `char` | `"abc".charAt(1)` → `'b'` |
| `substring(start, end)` | `String` | `"hello".substring(1,4)` → `"ell"` |
| `indexOf(str)` | `int` | `"hello".indexOf("ll")` → `2` |
| `split(regex)` | `String[]` | `"a,b,c".split(",")` → `["a","b","c"]` |
| `strip()` | `String` | `"  hi  ".strip()` → `"hi"` |
| `replace(old, new)` | `String` | `"aab".replace("a","x")` → `"xxb"` |
| `formatted(args)` | `String` | `"Hi %s".formatted("Jo")` → `"Hi Jo"` |
| `isBlank()` | `boolean` | `"  ".isBlank()` → `true` |
| `toCharArray()` | `char[]` | Converts to char array |
| `contains(seq)` | `boolean` | `"hello".contains("ell")` → `true` |

`strip()` (Java 11) is Unicode-aware; prefer it over `trim()`.

## Text Blocks (Java 13+)

```java
String json = """
        {
            "name": "Java",
            "version": 21
        }
        """;
```

- Opening `"""` must be followed by a newline
- Indentation is stripped based on the closing `"""`'s position
- Use `\` at line end to suppress newline

## StringBuilder vs StringBuffer

| Feature | StringBuilder | StringBuffer |
|---------|--------------|--------------|
| Thread-safe | No | Yes (synchronized) |
| Performance | Faster | Slower |
| Use when | Single-threaded (default choice) | Multi-threaded mutation |

```java
var sb = new StringBuilder();
sb.append("Hello").append(" ").append("World");
sb.insert(5, ",");   // "Hello, World"
sb.reverse();        // "dlroW ,olleH"
String result = sb.toString();
```

## String.format vs formatted()

```java
// Static method
String.format("Score: %d/%d", 85, 100);

// Instance method (Java 15+) — cleaner
"Score: %d/%d".formatted(85, 100);
```

Both support `%s` (string), `%d` (integer), `%f` (float), `%n` (newline), `%b` (boolean).
