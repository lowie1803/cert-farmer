# Project: Data Pipeline — Step-by-Step Guide

## Step 1: Article Record

```java
public record Article(
    String title,
    String url,
    String source,
    LocalDate publishedDate,
    String summary
) implements Comparable<Article> {

    @Override
    public int compareTo(Article other) {
        return this.publishedDate.compareTo(other.publishedDate);
    }
}
```

## Step 2: Custom Exception

```java
public class FeedParseException extends Exception {
    private final String feedUrl;

    public FeedParseException(String feedUrl, String message, Throwable cause) {
        super(message, cause);
        this.feedUrl = feedUrl;
    }

    public String getFeedUrl() { return feedUrl; }
}
```

## Step 3: Deduplication with Set

```java
public class Deduplicator {
    private final Set<String> seenUrls = new HashSet<>();

    public List<Article> deduplicate(List<Article> articles) {
        List<Article> unique = new ArrayList<>();
        for (Article a : articles) {
            if (seenUrls.add(a.url())) {  // add returns false if already present
                unique.add(a);
            } else {
                System.out.println("Duplicate skipped: " + a.url());
            }
        }
        return unique;
    }
}
```

## Step 4: Grouping with Map

```java
public static Map<String, List<Article>> groupBySource(List<Article> articles) {
    Map<String, List<Article>> grouped = new LinkedHashMap<>();
    for (Article a : articles) {
        grouped.computeIfAbsent(a.source(), k -> new ArrayList<>()).add(a);
    }
    return grouped;
}

// Print summary
grouped.forEach((source, list) ->
    System.out.printf("%s: %d articles%n", source, list.size()));
```

## Step 5: CSV Export with BufferedWriter

```java
public class CSVExporter {
    public static void export(List<Article> articles, Path path) throws IOException {
        try (var writer = new BufferedWriter(new FileWriter(path.toFile()))) {
            writer.write("title,url,source,date,summary");
            writer.newLine();

            for (Article a : articles) {
                writer.write("%s,%s,%s,%s,%s".formatted(
                    escapeCsv(a.title()),
                    a.url(),
                    a.source(),
                    a.publishedDate(),
                    escapeCsv(a.summary())
                ));
                writer.newLine();
            }
        }
    }

    private static String escapeCsv(String field) {
        if (field.contains(",") || field.contains("\"")) {
            return "\"" + field.replace("\"", "\"\"") + "\"";
        }
        return field;
    }
}
```

## Step 6: CSV Reader & Stats

```java
public class StatsCalculator {
    public static void printStats(Path csvPath) throws IOException {
        List<Article> articles = new ArrayList<>();

        try (var reader = new BufferedReader(new FileReader(csvPath.toFile()))) {
            reader.readLine(); // skip header
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",", 5);
                articles.add(new Article(
                    parts[0], parts[1], parts[2],
                    LocalDate.parse(parts[3]), parts[4]
                ));
            }
        }

        System.out.println("Total articles: " + articles.size());

        // Articles per source
        Map<String, Long> perSource = new LinkedHashMap<>();
        for (Article a : articles) {
            perSource.merge(a.source(), 1L, Long::sum);
        }
        perSource.forEach((s, c) -> System.out.printf("  %s: %d%n", s, c));

        // Date range
        Collections.sort(articles);
        System.out.printf("Date range: %s to %s%n",
            articles.getFirst().publishedDate(),
            articles.getLast().publishedDate());
    }
}
```

## Step 7: Generic Repository

```java
public interface Repository<T> {
    void save(T item);
    List<T> findAll();
    Optional<T> findById(String id);
}

public class FileRepository implements Repository<Article> {
    private final Path storagePath;
    private final List<Article> cache = new ArrayList<>();

    public FileRepository(Path storagePath) {
        this.storagePath = storagePath;
    }

    @Override
    public void save(Article article) {
        cache.add(article);
        // Append to CSV file
        try (var writer = new BufferedWriter(
                new FileWriter(storagePath.toFile(), true))) {
            writer.write(formatArticle(article));
            writer.newLine();
        } catch (IOException e) {
            throw new UncheckedIOException("Failed to save article", e);
        }
    }

    @Override
    public List<T> findAll() { return List.copyOf(cache); }

    @Override
    public Optional<Article> findById(String url) {
        return cache.stream()
            .filter(a -> a.url().equals(url))
            .findFirst();
    }
}
```

## Step 8: Pipeline Orchestrator

```java
public class Pipeline {
    public void run(List<String> feedUrls) {
        List<Article> allArticles = new ArrayList<>();

        for (String url : feedUrls) {
            try {
                List<Article> fetched = FeedFetcher.fetch(url);
                allArticles.addAll(fetched);
            } catch (FeedParseException e) {
                System.err.printf("Skipping feed %s: %s%n",
                    e.getFeedUrl(), e.getMessage());
                // Continue with other feeds
            }
        }

        var unique = new Deduplicator().deduplicate(allArticles);
        Collections.sort(unique);
        var grouped = groupBySource(unique);

        CSVExporter.export(unique, Path.of("articles.csv"));
        StatsCalculator.printStats(Path.of("articles.csv"));
    }
}
```
