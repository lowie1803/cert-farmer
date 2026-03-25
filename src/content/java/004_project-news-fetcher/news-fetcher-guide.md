# Project: News Fetcher — Step-by-Step Guide

## Step 1: Create the Main Class

Use single-file source launch — everything in one file:

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class NewsFetcher {
    public static void main(String[] args) throws Exception {
        if (args.length < 1) {
            System.out.println("Usage: java NewsFetcher.java <rss-url> [keyword]");
            return;
        }
        // Steps 2-6 go here
    }
}
```

## Step 2: Parse CLI Arguments

```java
var url = args[0];
var keyword = args.length > 1 ? args[1].toLowerCase() : "";
```

We use `var` for conciseness and the ternary operator to handle the optional keyword.

## Step 3: Fetch the RSS Feed

`HttpClient` (Java 11+) replaces the old `HttpURLConnection`:

```java
var client = HttpClient.newHttpClient();
var request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .header("User-Agent", "JavaNewsFetcher/1.0")
        .build();

var response = client.send(request, HttpResponse.BodyHandlers.ofString());

if (response.statusCode() != 200) {
    System.out.println("Error: HTTP " + response.statusCode());
    return;
}

var xml = response.body();
```

## Step 4: Extract Titles Using String Methods

We deliberately avoid XML parsers to practice `indexOf`/`substring`:

```java
var titles = new java.util.ArrayList<String>();
var searchFrom = 0;
var openTag = "<title>";
var closeTag = "</title>";

while (true) {
    int start = xml.indexOf(openTag, searchFrom);
    if (start == -1) break;

    start += openTag.length();
    int end = xml.indexOf(closeTag, start);
    if (end == -1) break;

    var title = xml.substring(start, end).trim();
    if (!title.isEmpty()) {
        titles.add(title);
    }
    searchFrom = end + closeTag.length();
}
```

**How it works:** `indexOf(str, fromIndex)` finds the next occurrence after `fromIndex`. We advance `searchFrom` past each closing tag to find the next title.

## Step 5: Display Numbered Headlines

Skip the first title (usually the feed name) and print the rest:

```java
System.out.println("=== " + (titles.isEmpty() ? "No titles found" : titles.get(0)) + " ===\n");

int count = 0;
for (int i = 1; i < titles.size(); i++) {
    var title = titles.get(i);
    // Step 6: keyword filter applied here
    if (keyword.isEmpty() || title.toLowerCase().contains(keyword)) {
        count++;
        System.out.println(count + ". " + title);
    }
}

System.out.println("\n" + count + " headline(s) displayed.");
```

## Step 6: Keyword Filter

The filter is already integrated in Step 5. Key detail: we use `toLowerCase()` on both the title and the keyword for **case-insensitive** matching.

## Complete Working Code

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;

public class NewsFetcher {
    public static void main(String[] args) throws Exception {
        if (args.length < 1) {
            System.out.println("Usage: java NewsFetcher.java <rss-url> [keyword]");
            return;
        }

        var url = args[0];
        var keyword = args.length > 1 ? args[1].toLowerCase() : "";

        var client = HttpClient.newHttpClient();
        var request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("User-Agent", "JavaNewsFetcher/1.0")
                .build();

        var response = client.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() != 200) {
            System.out.println("Error: HTTP " + response.statusCode());
            return;
        }

        var xml = response.body();
        var titles = new ArrayList<String>();
        var searchFrom = 0;

        while (true) {
            int start = xml.indexOf("<title>", searchFrom);
            if (start == -1) break;
            start += "<title>".length();
            int end = xml.indexOf("</title>", start);
            if (end == -1) break;
            var title = xml.substring(start, end).trim();
            if (!title.isEmpty()) titles.add(title);
            searchFrom = end + "</title>".length();
        }

        System.out.println("=== " + (titles.isEmpty() ? "No feed" : titles.get(0)) + " ===\n");

        int count = 0;
        for (int i = 1; i < titles.size(); i++) {
            var title = titles.get(i);
            if (keyword.isEmpty() || title.toLowerCase().contains(keyword)) {
                System.out.println(++count + ". " + title);
            }
        }
        System.out.println("\n" + count + " headline(s) displayed.");
    }
}
```

Run it: `java NewsFetcher.java "https://hnrss.org/frontpage"`
