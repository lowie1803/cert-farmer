# Project: OOP Refactor — Stretch Goals

## 1. HtmlFeedParser

Scrape articles from HTML pages instead of RSS. Implement `FeedParser` using regex or an HTML parsing library:

```java
public class HtmlFeedParser implements FeedParser {
    private final String sourceName;

    public HtmlFeedParser(String sourceName) {
        this.sourceName = sourceName;
    }

    @Override
    public List<Article> parse(String content) {
        var articles = new ArrayList<Article>();
        // Simple regex approach (for learning — use Jsoup in production)
        var pattern = Pattern.compile("<a[^>]+href=\"([^\"]+)\"[^>]*>([^<]+)</a>");
        var matcher = pattern.matcher(content);
        while (matcher.find()) {
            articles.add(new Article(matcher.group(2), matcher.group(1), sourceName, LocalDate.now()));
        }
        return articles;
    }
}
```

## 2. EmailAlertSender

Send alerts via email using `javax.mail` or Java's built-in SMTP support:

```java
public class EmailAlertSender implements AlertSender {
    private final String smtpHost;
    private final String from;
    private final String to;

    public EmailAlertSender(String smtpHost, String from, String to) {
        this.smtpHost = smtpHost;
        this.from = from;
        this.to = to;
    }

    @Override
    public void sendAlert(Article article, String reason) {
        // Use Jakarta Mail API or java.net for SMTP
        System.out.printf("EMAIL to %s: [%s] %s%n", to, reason, article.title());
    }
}
```

## 3. Multiple Feeds with Loop

Process multiple RSS feeds from a comma-separated config value:

```java
String[] urls = config.feedUrls().split(",");
for (String url : urls) {
    String content = fetchUrl(url.trim());
    List<Article> articles = parser.parse(content);
    articles.stream()
        .filter(a -> a.title().toLowerCase().contains("breaking"))
        .forEach(a -> sender.sendAlert(a, "Breaking news"));
}
```

## 4. Factory Pattern for Parsers

Use a factory to select the correct parser based on content type:

```java
public class ParserFactory {
    public static FeedParser create(String contentType, String sourceName) {
        return switch (contentType.toLowerCase()) {
            case "rss", "xml"  -> new RssFeedParser(sourceName);
            case "html"        -> new HtmlFeedParser(sourceName);
            default -> throw new IllegalArgumentException("Unknown type: " + contentType);
        };
    }
}

// Usage
FeedParser parser = ParserFactory.create("rss", "TechNews");
```

This is the **Factory Method** pattern — the caller doesn't need to know which concrete class is created. Adding a `JsonFeedParser` later requires only adding a case to the factory.

## 5. Multi-Channel Alerts

Send to multiple channels simultaneously using a composite pattern:

```java
public class MultiAlertSender implements AlertSender {
    private final List<AlertSender> senders;

    public MultiAlertSender(AlertSender... senders) {
        this.senders = List.of(senders);
    }

    @Override
    public void sendAlert(Article article, String reason) {
        senders.forEach(s -> s.sendAlert(article, reason));
    }
}

// Usage — sends to both Telegram and console
AlertSender sender = new MultiAlertSender(
    new TelegramAlertSender(token, chatId),
    new ConsoleAlertSender()
);
```

Each extension follows **Open/Closed Principle** — new behavior added without modifying existing classes.
