# Control Flow

## if / else if / else

```java
if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else {
    grade = "C";
}
```

No surprises here. Remember: Java has no truthy/falsy — conditions must be `boolean`.

## Switch Expressions (Java 14+)

### Classic switch (statement)
```java
switch (day) {
    case MONDAY:
    case FRIDAY:
        System.out.println("Busy");
        break;               // forgetting break = fall-through bug
    default:
        System.out.println("Normal");
}
```

### Arrow syntax (expression) — preferred
```java
String label = switch (day) {
    case MONDAY, FRIDAY  -> "Busy";
    case SATURDAY, SUNDAY -> "Weekend";
    default -> "Normal";
};  // semicolon because it's a statement (assigns to label)
```

**Key differences:**
- Arrow `->` has **no fall-through** (no `break` needed)
- Can return a value (it's an expression)
- Use `yield` for multi-line cases in expression form:

```java
int result = switch (status) {
    case "OK" -> 200;
    case "ERR" -> {
        log("Error occurred");
        yield 500;           // yield returns value from block
    }
    default -> 0;
};
```

### Exhaustiveness
Switch expressions must be **exhaustive** — cover all possible values or include `default`. The compiler enforces this, especially useful with sealed classes and enums.

## Loops

### for loop
```java
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
```

### Enhanced for-each
```java
for (String name : names) {    // works with arrays and Iterable
    System.out.println(name);
}
```

Cannot access the index. Use a traditional `for` or `IntStream.range()` if you need it.

### while / do-while
```java
while (condition) { /* may execute 0 times */ }

do { /* executes at least once */ } while (condition);
```

## break and continue with Labels

Labels allow breaking out of nested loops:

```java
outer:
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        if (matrix[i][j] == target) {
            System.out.println("Found at " + i + "," + j);
            break outer;   // exits BOTH loops
        }
    }
}
```

| Keyword | Effect |
|---------|--------|
| `break` | Exit innermost loop/switch |
| `break label` | Exit the labeled loop |
| `continue` | Skip to next iteration of innermost loop |
| `continue label` | Skip to next iteration of labeled loop |

## Ternary Operator

```java
String status = (age >= 18) ? "adult" : "minor";
```

Keep it simple — avoid nesting ternaries. Use `if/else` for complex logic.

## Pattern Matching in switch (Java 21)

```java
String describe(Object obj) {
    return switch (obj) {
        case Integer i -> "Integer: " + i;
        case String s  -> "String of length " + s.length();
        case null      -> "null";
        default        -> "Other: " + obj.getClass();
    };
}
```

Combines `instanceof` pattern matching with switch expressions. Guarded patterns use `when`:

```java
case String s when s.length() > 10 -> "Long string";
```
