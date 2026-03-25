# Arrays

## Declaration & Initialization

```java
// Declaration
int[] nums;              // preferred style
String names[];          // valid but discouraged

// Initialization
int[] a = new int[5];               // default values (0)
int[] b = {1, 2, 3, 4, 5};         // inline
int[] c = new int[]{1, 2, 3};      // explicit

// Length is FIXED after creation
a.length  // 5 (field, not method — no parentheses)
```

Default values: `0` for numeric, `false` for boolean, `null` for objects.

## Multi-Dimensional Arrays

```java
int[][] matrix = new int[3][4];      // 3 rows, 4 cols
int[][] jagged = new int[3][];       // ragged array
jagged[0] = new int[]{1, 2};
jagged[1] = new int[]{3, 4, 5};

// Iterate
for (int[] row : matrix) {
    for (int val : row) {
        System.out.print(val + " ");
    }
}
```

## Arrays Utility Class

`java.util.Arrays` provides static helpers:

| Method | Description |
|--------|-------------|
| `Arrays.sort(arr)` | In-place sort (dual-pivot quicksort for primitives) |
| `Arrays.binarySearch(arr, key)` | Search sorted array, returns index or negative |
| `Arrays.copyOf(arr, len)` | Copy with new length (truncate or pad) |
| `Arrays.copyOfRange(arr, from, to)` | Copy subrange |
| `Arrays.fill(arr, val)` | Fill all elements with value |
| `Arrays.equals(a, b)` | Element-wise equality |
| `Arrays.deepEquals(a, b)` | Deep equality for nested arrays |
| `Arrays.toString(arr)` | `"[1, 2, 3]"` for printing |
| `Arrays.asList(arr)` | Fixed-size List backed by array |

**Pitfall**: `Arrays.binarySearch` requires a **sorted** array. Unsorted input gives undefined results.

## Array vs ArrayList

| Feature | Array | ArrayList |
|---------|-------|-----------|
| Size | Fixed | Dynamic |
| Primitives | Yes | No (uses wrappers) |
| Performance | Faster (no boxing) | Slightly slower |
| Type safety | Covariant (risky) | Generic invariant |
| Syntax | `arr[i]` | `list.get(i)` |
| Utilities | `Arrays.*` | `Collections.*` + rich API |
| Multi-dim | Native support | List of Lists |

```java
// Array → List
List<String> list = new ArrayList<>(Arrays.asList(arr));
List<String> list2 = List.of(arr);  // immutable (Java 9+)

// List → Array
String[] arr = list.toArray(new String[0]);
String[] arr2 = list.toArray(String[]::new);  // Java 11+
```

## Common Pitfalls

- **ArrayIndexOutOfBoundsException** — accessing index `< 0` or `>= length`
- **Arrays.asList()** returns a fixed-size list — `add()`/`remove()` throw `UnsupportedOperationException`
- **Reference types in arrays** — assigning a `String[]` to `Object[]` compiles but can throw `ArrayStoreException` at runtime
- **Forgetting `.length` has no parentheses** — it is a field, not a method (unlike `String.length()`)

```java
int[] nums = {10, 20, 30};
// nums[3]  → ArrayIndexOutOfBoundsException
// Valid indices: 0, 1, 2
```
