# Reference Types & var

## Stack vs Heap

```
Stack (per thread)          Heap (shared)
┌──────────────┐           ┌──────────────────┐
│ int x = 42   │           │ String "Hello"   │
│ ref s ────────┼──────►   │ int[] {1, 2, 3}  │
│ ref arr ──────┼──────►   │ Person obj       │
└──────────────┘           └──────────────────┘
```

- **Primitives** live on the stack (local vars) or inline in objects (fields)
- **References** are pointers stored on the stack; the **object** they point to lives on the heap
- Passing a reference to a method copies the **pointer**, not the object (Java is always pass-by-value)

## String Immutability

```java
String a = "hello";
String b = "hello";       // same object from string pool
String c = new String("hello"); // new heap object

a == b;        // true  (same pool reference)
a == c;        // false (different objects)
a.equals(c);   // true  (same content — always use this)
```

Strings are **immutable** — every modification creates a new String. For heavy concatenation in loops, use `StringBuilder`.

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i).append(", ");
}
String result = sb.toString();
```

## Arrays

Arrays are **objects** with a fixed length set at creation:

```java
int[] nums = new int[5];           // default-initialized to 0
int[] vals = {1, 2, 3, 4, 5};     // literal initialization
String[] names = new String[3];    // default null

nums.length;  // 5 (field, not method)
```

Arrays cannot be resized. Use `ArrayList` when you need dynamic sizing.

## The `var` Keyword (Java 10+)

`var` enables local variable type inference — the compiler infers the type from the right-hand side:

```java
var list = new ArrayList<String>();  // inferred as ArrayList<String>
var count = 0;                       // inferred as int
var name = "Alice";                  // inferred as String
var stream = list.stream();          // inferred as Stream<String>
```

**Rules and restrictions:**
- Local variables **only** — not fields, method params, or return types
- Must be initialized at declaration (`var x;` is illegal)
- Cannot be `null` without a cast (`var x = null;` is illegal)
- Does not make Java dynamically typed — the type is fixed at compile time

**When to use var vs explicit types:**

| Use `var` | Use explicit type |
|-----------|-------------------|
| Type is obvious from RHS (`new ArrayList<>()`) | Type is not clear from context |
| Long generic types | Primitive widening matters (`long` vs `int`) |
| Try-with-resources, for-each loops | Public API signatures (fields, params) |

## Null Safety

Java has no built-in null safety. Strategies:

- **`Optional<T>`** (Java 8+) — for return types that may be absent
- **`Objects.requireNonNull()`** — fail-fast validation
- **`@Nullable` / `@NonNull`** annotations — IDE and static analysis hints
- **Pattern matching** (Java 16+) — `if (obj instanceof String s)` avoids null casts

```java
Optional<String> name = Optional.ofNullable(getName());
String result = name.orElse("Unknown");
```
