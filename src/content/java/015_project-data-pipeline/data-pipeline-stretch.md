# Project: Data Pipeline — Stretch Goals

## 1. SQLite Storage with JDBC

Replace CSV with a proper database using JDBC (Java Database Connectivity):

```java
public class SqliteRepository implements Repository<Article> {
    private final Connection conn;

    public SqliteRepository(String dbPath) throws SQLException {
        conn = DriverManager.getConnection("jdbc:sqlite:" + dbPath);
        try (var stmt = conn.createStatement()) {
            stmt.execute("""
                CREATE TABLE IF NOT EXISTS articles (
                    url TEXT PRIMARY KEY,
                    title TEXT, source TEXT,
                    published_date TEXT, summary TEXT
                )""");
        }
    }

    @Override
    public void save(Article a) {
        String sql = "INSERT OR IGNORE INTO articles VALUES (?,?,?,?,?)";
        try (var ps = conn.prepareStatement(sql)) {
            ps.setString(1, a.url());
            ps.setString(2, a.title());
            ps.setString(3, a.source());
            ps.setString(4, a.publishedDate().toString());
            ps.setString(5, a.summary());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Failed to save", e);
        }
    }
}
```

Add `org.xerial:sqlite-jdbc` to your dependencies. Use `try-with-resources` for all JDBC objects (`Connection`, `PreparedStatement`, `ResultSet`).

## 2. JSON Export

Serialize articles to JSON without external libraries:

```java
public static String toJson(List<Article> articles) {
    var sb = new StringBuilder("[\n");
    for (int i = 0; i < articles.size(); i++) {
        Article a = articles.get(i);
        sb.append("""
              {"title": "%s", "url": "%s", "source": "%s", "date": "%s"}"""
            .formatted(escape(a.title()), a.url(), a.source(), a.publishedDate()));
        if (i < articles.size() - 1) sb.append(",");
        sb.append("\n");
    }
    return sb.append("]").toString();
}
```

For production, use a library like Jackson or Gson. This exercise demonstrates `StringBuilder` and `formatted()`.

## 3. Scheduled Pipeline Runner

Create a simple scheduler that runs the pipeline at regular intervals:

```java
public class PipelineScheduler {
    private final ScheduledExecutorService executor =
        Executors.newSingleThreadScheduledExecutor();

    public void start(Pipeline pipeline, long intervalMinutes) {
        executor.scheduleAtFixedRate(
            () -> {
                try {
                    pipeline.run(loadFeedUrls());
                } catch (Exception e) {
                    System.err.println("Pipeline run failed: " + e.getMessage());
                }
            },
            0, intervalMinutes, TimeUnit.MINUTES
        );
    }

    public void stop() {
        executor.shutdown();
    }
}
```

## 4. Article Comparison with Comparable

Implement multi-field sorting with `Comparator` chaining:

```java
// Sort by source, then by date (newest first), then by title
Comparator<Article> comparator = Comparator
    .comparing(Article::source)
    .thenComparing(Article::publishedDate, Comparator.reverseOrder())
    .thenComparing(Article::title);

articles.sort(comparator);
```

Try implementing `Comparable<Article>` on the record for natural ordering (by date), and use `Comparator` for alternative orderings. This prepares you for the Lambda & Streams module.
