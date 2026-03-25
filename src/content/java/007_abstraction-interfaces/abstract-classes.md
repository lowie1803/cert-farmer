# Abstract Classes

## Abstract vs Concrete

An **abstract class** cannot be instantiated directly. It serves as a base for subclasses, providing shared state and partial implementation.

```java
public abstract class Notification {
    protected String recipient;
    protected String message;

    public Notification(String recipient, String message) {
        this.recipient = recipient;
        this.message = message;
    }

    // Abstract — subclasses MUST implement
    public abstract void send();

    // Concrete — shared by all subclasses
    public String preview() {
        return "To: %s | %s".formatted(recipient, message);
    }
}
```

| Feature | Abstract class | Concrete class |
|---------|---------------|----------------|
| Instantiable | No | Yes |
| Can have abstract methods | Yes | No |
| Can have constructors | Yes (called via `super()`) | Yes |
| Can have fields/state | Yes | Yes |
| Can have concrete methods | Yes | Yes |

## Abstract Methods

- Declared with `abstract` keyword, no body (ends with `;`)
- Any class with an abstract method **must** be declared `abstract`
- Subclass must implement all abstract methods or itself be `abstract`

```java
public class EmailNotification extends Notification {
    public EmailNotification(String email, String msg) {
        super(email, msg);
    }

    @Override
    public void send() {
        System.out.println("Sending email to " + recipient);
        // SMTP logic here
    }
}

public class SmsNotification extends Notification {
    public SmsNotification(String phone, String msg) {
        super(phone, msg);
    }

    @Override
    public void send() {
        System.out.println("Sending SMS to " + recipient);
    }
}
```

## When to Use Abstract Classes

- Subclasses share **state** (fields) and **behavior** (concrete methods)
- You want to enforce a constructor contract
- You need a partial implementation that subclasses complete
- There's a clear "is-a" relationship

## Template Method Pattern

A common use of abstract classes — define the algorithm skeleton, let subclasses fill in steps:

```java
public abstract class DataExporter {
    // Template method — final to prevent override
    public final void export(List<String> data) {
        String formatted = format(data);    // abstract step
        validate(formatted);                 // concrete step
        write(formatted);                    // abstract step
    }

    protected abstract String format(List<String> data);
    protected abstract void write(String content);

    protected void validate(String content) {
        if (content == null || content.isEmpty()) {
            throw new IllegalArgumentException("Empty content");
        }
    }
}

public class CsvExporter extends DataExporter {
    @Override
    protected String format(List<String> data) {
        return String.join(",", data);
    }

    @Override
    protected void write(String content) {
        // write to CSV file
    }
}
```

The algorithm structure is fixed in the base class; only the customizable parts are abstract.
