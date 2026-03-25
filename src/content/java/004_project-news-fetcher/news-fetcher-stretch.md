# Project: News Fetcher — Stretch Goals

These extensions build on the base News Fetcher. Try them in order of difficulty.

## 1. Save Headlines to File

Write output to a text file using `FileWriter`:

```java
import java.io.FileWriter;
import java.io.PrintWriter;

var writer = new PrintWriter(new FileWriter("headlines.txt"));
for (int i = 1; i < titles.size(); i++) {
    writer.println(i + ". " + titles.get(i));
}
writer.close();  // always close — or use try-with-resources
System.out.println("Saved to headlines.txt");
```

**Better approach** — try-with-resources ensures the file is closed even if an exception occurs:

```java
try (var writer = new PrintWriter(new FileWriter("headlines.txt"))) {
    for (int i = 1; i < titles.size(); i++) {
        writer.println(i + ". " + titles.get(i));
    }
}
```

## 2. Multiple Feeds

Accept multiple URLs and aggregate results:

```java
var feeds = new String[] {
    "https://hnrss.org/frontpage",
    "https://rss.nytimes.com/services/xml/rss/nyt/World.xml"
};

for (var feedUrl : feeds) {
    System.out.println("\n--- " + feedUrl + " ---");
    // Reuse fetch + parse logic for each URL
    var request = HttpRequest.newBuilder().uri(URI.create(feedUrl)).build();
    var response = client.send(request, HttpResponse.BodyHandlers.ofString());
    // ... parse and display
}
```

**Refactoring hint:** Extract the fetch-and-parse logic into a method like `List<String> fetchTitles(HttpClient client, String url)`. This is a preview of methods and code organization (Module 005).

## 3. Colorized Console Output (ANSI Codes)

Add color to terminal output using ANSI escape sequences:

```java
final String RESET  = "\033[0m";
final String BOLD   = "\033[1m";
final String GREEN  = "\033[32m";
final String YELLOW = "\033[33m";
final String CYAN   = "\033[36m";

System.out.println(BOLD + CYAN + "=== " + feedTitle + " ===" + RESET);
System.out.println(GREEN + count + "." + RESET + " " + title);

// Highlight matching keyword
if (!keyword.isEmpty()) {
    title = title.replace(keyword, YELLOW + keyword + RESET);
}
```

**Note:** ANSI codes work in most modern terminals (macOS Terminal, Linux, Windows Terminal) but not in older Windows cmd.exe.

## 4. Scheduled Refresh

Poll the feed at a fixed interval using `ScheduledExecutorService`:

```java
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

var scheduler = Executors.newSingleThreadScheduledExecutor();
scheduler.scheduleAtFixedRate(() -> {
    try {
        // fetch and display logic here
        System.out.println("\n[Refreshed at " + java.time.LocalTime.now() + "]");
    } catch (Exception e) {
        System.err.println("Fetch failed: " + e.getMessage());
    }
}, 0, 5, TimeUnit.MINUTES);  // initial delay: 0, repeat: every 5 min

// Keep main thread alive
Thread.sleep(Long.MAX_VALUE);
```

This is a preview of concurrency concepts. `ScheduledExecutorService` is preferred over `java.util.Timer` for its better error handling and thread pool management.

## What's Next

After completing these stretch goals, you'll be ready for Module 005 (Classes & Objects) where you'll learn to organize this code into proper classes with encapsulation and reusable methods.
