# JVM, JDK & JRE

## JVM Architecture

The Java Virtual Machine executes bytecode through a pipeline:

```
.class bytecode
  → Class Loader (loads, links, initializes)
    → Bytecode Verifier (type safety, stack checks)
      → Interpreter (line-by-line execution)
        → JIT Compiler (hot paths → native code)
```

**Key JVM memory areas:**
- **Stack** — per-thread, stores frames (local vars, operand stack)
- **Heap** — shared, stores objects — managed by GC
- **Metaspace** — class metadata (replaced PermGen in Java 8)
- **Code Cache** — JIT-compiled native code

The JIT compiler (C1 + C2 tiered compilation) profiles running code and compiles frequently executed methods to native machine code. This is why Java gets faster over time during execution.

## JDK vs JRE

Since **Java 11**, the standalone JRE is **deprecated**. The JDK is the only distribution you need.

| Component | Contains | Status |
|-----------|----------|--------|
| **JDK** | Compiler + tools + JRE | Active — install this |
| **JRE** | JVM + core libraries | Deprecated since Java 11 |
| **JVM** | Runtime engine | Embedded in JDK |

**JDK 21 LTS** (Sept 2023) is the current long-term support release. Next LTS: JDK 25 (Sept 2025).

## JDK Tools

| Tool | Purpose |
|------|---------|
| `javac` | Compile `.java` → `.class` |
| `java` | Launch JVM, run bytecode |
| `jshell` | Interactive REPL (Java 9+) |
| `jlink` | Create custom minimal JRE images |
| `jpackage` | Package app as native installer (Java 14+) |
| `javadoc` | Generate API documentation |
| `jar` | Create/inspect JAR archives |
| `jdb` | Command-line debugger |
| `jconsole` | JMX monitoring GUI |
| `jfr` | Flight Recorder — production profiling |

## GraalVM

**GraalVM** is an alternative JDK that adds:
- **Ahead-of-time (AOT) compilation** via `native-image` — compiles to standalone binaries with instant startup
- Polyglot support (JavaScript, Python, Ruby, R, LLVM)
- A high-performance JIT compiler (Graal) written in Java

Trade-off: AOT native images have faster startup and lower memory, but slower peak throughput than JIT-optimized HotSpot for long-running apps.

## Quick Reference

```bash
# Check installed version
java --version
javac --version

# List all JDK tools
ls $JAVA_HOME/bin/
```
