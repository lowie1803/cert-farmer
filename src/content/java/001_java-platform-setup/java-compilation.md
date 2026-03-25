# Compilation & Execution

## The Compilation Pipeline

```
MyApp.java  →  javac  →  MyApp.class  →  java  →  JVM executes
 (source)     (compiler)  (bytecode)    (launcher)
```

Bytecode is **platform-independent** — the same `.class` file runs on any OS with a compatible JVM. This is "write once, run anywhere."

## Classpath vs Module Path

| | Classpath (`-cp`) | Module Path (`--module-path`) |
|---|---|---|
| **Mechanism** | Flat list of JARs/dirs | JPMS modules (Java 9+) |
| **Encapsulation** | Everything is public | Strong encapsulation via `module-info.java` |
| **Use when** | Legacy code, quick scripts | Libraries, large apps |

```bash
# Classpath
javac -cp lib/gson.jar src/MyApp.java
java -cp .:lib/gson.jar MyApp

# Module path
javac -d out --module-source-path src -m myapp
java --module-path out -m myapp/com.example.Main
```

Most projects use build tools (Maven/Gradle) that handle paths automatically. You rarely set these manually.

## Single-File Source Launch (Java 11+)

Skip explicit compilation for single-file programs:

```bash
# Instead of: javac MyApp.java && java MyApp
java MyApp.java
```

Rules:
- Only works for a **single source file**
- The file must contain a `main` method (or use unnamed `main` with Java 21+)
- Cannot reference other source files (only classpath JARs)
- Great for scripts and experiments

## jshell — Interactive REPL

```bash
$ jshell
jshell> int x = 42;
x ==> 42

jshell> "Hello".chars().sum()
$2 ==> 500

jshell> /exit
```

Useful for testing expressions, exploring APIs, and quick prototyping. No `main` method or class boilerplate needed.

## Basic Project Structure

```
my-project/
├── src/
│   └── com/example/
│       └── Main.java
├── out/                  # compiled classes
├── lib/                  # dependency JARs
└── README.md
```

**Compile and run manually:**

```bash
# Compile all sources to out/
javac -d out src/com/example/*.java

# Run the main class
java -cp out com.example.Main
```

In practice, use **Maven** (`mvn`) or **Gradle** (`gradle`) for real projects. They handle compilation, dependencies, testing, and packaging.

## Java 21+ Unnamed Classes (Preview)

Java 21 introduced simplified entry points:

```java
// No class declaration, no public static void
void main() {
    System.out.println("Hello!");
}
```

Launch with: `java --enable-preview Main.java`
