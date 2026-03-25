# Project: News Fetcher — Brief

## Objective

Build a console application that fetches RSS feed headlines from a URL and displays them in the terminal. This project applies concepts from Modules 001-003 in a practical context.

## Requirements

- [ ] Accept an RSS feed URL as a command-line argument
- [ ] Fetch the feed content using `java.net.http.HttpClient` (Java 11+)
- [ ] Parse the XML response using String methods to extract `<title>` elements
- [ ] Display numbered headlines in the console
- [ ] (Optional) Accept a keyword as a second argument to filter headlines

## Example Usage

```bash
java NewsFetcher.java "https://rss.nytimes.com/services/xml/rss/nyt/World.xml"

# Output:
1. War in Ukraine: Latest Updates
2. Climate Summit Reaches Agreement
3. Tech Giants Face New Regulations
...

# With keyword filter:
java NewsFetcher.java "https://rss.nytimes.com/services/xml/rss/nyt/World.xml" "climate"

# Output:
1. Climate Summit Reaches Agreement
2. Climate Activists Rally in London
```

## Concepts Applied

| Module | Concept | How It's Used |
|--------|---------|---------------|
| 001 | Single-file source launch | Run with `java NewsFetcher.java` |
| 001 | JDK built-in APIs | `java.net.http` — no external deps |
| 002 | Primitives & strings | CLI arg parsing, string manipulation |
| 002 | `var` keyword | Local variable type inference |
| 003 | Control flow | Loops for parsing, if for filtering |
| 003 | Operators | String comparison, indexOf checks |

## Constraints

- **No external libraries** — use only JDK built-in classes
- **No XML parser** — use `String.indexOf()` and `substring()` deliberately to practice string manipulation (we'll learn proper XML parsing later)
- **Single file** — keep everything in one `.java` file to use single-file source launch

## Suggested RSS Feeds for Testing

| Feed | URL |
|------|-----|
| NY Times World | `https://rss.nytimes.com/services/xml/rss/nyt/World.xml` |
| BBC News | `http://feeds.bbci.co.uk/news/rss.xml` |
| Hacker News | `https://hnrss.org/frontpage` |

## Evaluation Criteria

- Program compiles and runs without errors
- Correctly fetches and displays at least the feed title and item titles
- Code uses meaningful variable names and is well-structured
- Keyword filter works case-insensitively (if implemented)
