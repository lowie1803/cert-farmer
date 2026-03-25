# Polymorphism

## Two Types

| Type | Mechanism | Resolved at |
|------|-----------|-------------|
| **Compile-time** (static) | Method overloading | Compilation |
| **Runtime** (dynamic) | Method overriding | Execution |

## Method Overriding

A subclass provides its own implementation of a method declared in the parent:

```java
public class Shape {
    public double area() { return 0; }
}

public class Circle extends Shape {
    private double radius;

    @Override                        // annotation — not required but strongly recommended
    public double area() {
        return Math.PI * radius * radius;
    }
}
```

**Override rules:**
- Same method name and parameter list
- Return type must be same or **covariant** (subtype)
- Access modifier must be same or **wider** (not more restrictive)
- Cannot override `final`, `static`, or `private` methods

## Upcasting & Downcasting

```java
Shape s = new Circle(5.0);     // upcast — implicit, always safe
s.area();                       // calls Circle.area() — dynamic dispatch

Circle c = (Circle) s;         // downcast — explicit, can fail
// Rectangle r = (Rectangle) s; // ClassCastException at runtime!

// Safe downcasting with pattern matching (Java 16+)
if (s instanceof Circle circle) {
    System.out.println(circle.getRadius());
}
```

| Cast | Direction | Safety | Syntax |
|------|-----------|--------|--------|
| Upcast | Child -> Parent | Always safe, implicit | `Shape s = new Circle()` |
| Downcast | Parent -> Child | Can throw ClassCastException | `Circle c = (Circle) s` |

## Dynamic Method Dispatch

The JVM determines which method to call based on the **actual object type**, not the reference type:

```java
Shape[] shapes = {
    new Circle(3),
    new Rectangle(4, 5),
    new Triangle(3, 4, 5)
};

for (Shape s : shapes) {
    System.out.println(s.area());  // calls the correct override each time
}
```

This is the core of polymorphism — write code against the parent type, and the JVM dispatches to the correct subclass implementation at runtime.

## Covariant Return Types

An overriding method can return a **subtype** of the parent's return type:

```java
public class AnimalFactory {
    public Animal create() { return new Animal(); }
}

public class DogFactory extends AnimalFactory {
    @Override
    public Dog create() { return new Dog(); }  // Dog extends Animal — valid
}
```

## @Override Annotation

Not required, but catches errors at compile time:

```java
@Override
public boolean equals(Object o) { ... }   // correct

@Override
public boolean equals(String o) { ... }   // COMPILE ERROR — not overriding, it's overloading
```

Without `@Override`, the second example would silently compile as an overload, creating a subtle bug.

## Quick Summary

```
compile-time polymorphism = which overloaded method signature to call
runtime polymorphism      = which overridden method body to execute
```
