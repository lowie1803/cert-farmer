# Exception Handling

## Exception Hierarchy

```
Throwable
  ├─ Error (don't catch — JVM problems)
  │    ├─ OutOfMemoryError
  │    ├─ StackOverflowError
  │    └─ VirtualMachineError
  └─ Exception (checked — must handle)
       ├─ IOException
       ├─ SQLException
       ├─ ParseException
       └─ RuntimeException (unchecked — optional to handle)
            ├─ NullPointerException
            ├─ IllegalArgumentException
            ├─ IndexOutOfBoundsException
            ├─ ClassCastException
            └─ UnsupportedOperationException
```

## Checked vs Unchecked

| Type | Must Handle? | Subclass Of | Examples |
|------|-------------|-------------|----------|
| Checked | Yes (catch or declare throws) | Exception | IOException, SQLException |
| Unchecked | No (optional) | RuntimeException | NullPointerException, IllegalArgumentException |
| Error | No (don't catch) | Error | OutOfMemoryError, StackOverflowError |

## try-catch-finally

```java
try {
    riskyOperation();
} catch (IOException e) {
    System.err.println("IO failed: " + e.getMessage());
} catch (Exception e) {
    System.err.println("Other: " + e.getMessage());
} finally {
    // Always runs — even after return or exception
    cleanup();
}
```

**Order matters**: catch more specific exceptions first. `catch (Exception e)` before `catch (IOException e)` won't compile.

## Multi-catch (Java 7+)

```java
try {
    parse(input);
} catch (IOException | ParseException e) {
    // e is effectively final — cannot reassign
    log.error("Failed to process: " + e.getMessage());
}
```

Exceptions in a multi-catch cannot be in the same hierarchy (e.g., `IOException | Exception` won't compile).

## try-with-resources (Java 7+)

Automatically calls `.close()` on resources implementing `AutoCloseable`:

```java
try (var reader = new BufferedReader(new FileReader("data.txt"));
     var writer = new BufferedWriter(new FileWriter("out.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        writer.write(line);
    }
} // reader and writer are auto-closed, even on exception
```

- Resources are closed in **reverse** declaration order
- Suppressed exceptions: if both `try` block and `close()` throw, the close exception is **suppressed** (accessible via `getSuppressed()`)
- Java 9+: can use effectively final variables declared outside the try

## Common Exceptions Table

| Exception | When |
|-----------|------|
| `NullPointerException` | Accessing member on `null` reference |
| `IllegalArgumentException` | Method receives invalid argument |
| `IllegalStateException` | Object in wrong state for operation |
| `IndexOutOfBoundsException` | Array/list index out of range |
| `ClassCastException` | Invalid cast |
| `NumberFormatException` | `Integer.parseInt("abc")` |
| `UnsupportedOperationException` | Calling `add()` on immutable collection |
| `ConcurrentModificationException` | Modifying collection during iteration |
| `IOException` | File/network I/O failure |
| `FileNotFoundException` | File path does not exist |
