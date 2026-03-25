# Project: OOP Refactor — Step-by-Step Guide

## Step 1: Article Record

```java
import java.time.LocalDate;

public record Article(
    String title,
    String url,
    String source,
    LocalDate publishedDate
) {
    // Compact constructor — validation
    public Article {
        if (title == null || title.isBlank())
            throw new IllegalArgumentException("Title required");
        if (url == null || url.isBlank())
            throw new IllegalArgumentException("URL required");
    }

    public String summary() {
        return "[%s] %s — %s".formatted(source, title, url);
    }
}
```

Records give you `equals()`, `hashCode()`, `toString()`, and accessors automatically.

## Step 2: FeedParser Interface + RssFeedParser

```java
import java.util.List;

public interface FeedParser {
    List<Article> parse(String content);
}
```

```java
import javax.xml.parsers.*;
import org.w3c.dom.*;
import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class RssFeedParser implements FeedParser {
    private final String sourceName;

    public RssFeedParser(String sourceName) {
        this.sourceName = sourceName;
    }

    @Override
    public List<Article> parse(String content) {
        var articles = new ArrayList<Article>();
        try {
            var factory = DocumentBuilderFactory.newInstance();
            var builder = factory.newDocumentBuilder();
            var doc = builder.parse(new ByteArrayInputStream(content.getBytes()));
            var items = doc.getElementsByTagName("item");

            for (int i = 0; i < items.getLength(); i++) {
                var item = (Element) items.item(i);
                String title = getTag(item, "title");
                String link  = getTag(item, "link");
                String date  = getTag(item, "pubDate");
                articles.add(new Article(title, link, sourceName, parseDate(date)));
            }
        } catch (Exception e) {
            System.err.println("Parse error: " + e.getMessage());
        }
        return articles;
    }

    private String getTag(Element el, String tag) {
        var nodes = el.getElementsByTagName(tag);
        return nodes.getLength() > 0 ? nodes.item(0).getTextContent().trim() : "";
    }

    private LocalDate parseDate(String date) {
        try {
            return LocalDate.parse(date, DateTimeFormatter.RFC_1123_DATE_TIME);
        } catch (Exception e) { return LocalDate.now(); }
    }
}
```

## Step 3: AlertSender Interface + Implementations

```java
public interface AlertSender {
    void sendAlert(Article article, String reason);
}
```

```java
public class ConsoleAlertSender implements AlertSender {
    @Override
    public void sendAlert(Article article, String reason) {
        System.out.printf("ALERT [%s]: %s%n  -> %s%n", reason, article.title(), article.url());
    }
}
```

```java
import java.net.URI;
import java.net.http.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class TelegramAlertSender implements AlertSender {
    private final String botToken;
    private final String chatId;
    private final HttpClient client = HttpClient.newHttpClient();

    public TelegramAlertSender(String botToken, String chatId) {
        this.botToken = botToken;
        this.chatId = chatId;
    }

    @Override
    public void sendAlert(Article article, String reason) {
        String text = "🔔 %s%n%s%n%s".formatted(reason, article.title(), article.url());
        String encoded = URLEncoder.encode(text, StandardCharsets.UTF_8);
        String url = "https://api.telegram.org/bot%s/sendMessage?chat_id=%s&text=%s"
            .formatted(botToken, chatId, encoded);
        try {
            var request = HttpRequest.newBuilder(URI.create(url)).POST(HttpRequest.BodyPublishers.noBody()).build();
            client.send(request, HttpResponse.BodyHandlers.discarding());
        } catch (Exception e) {
            System.err.println("Telegram send failed: " + e.getMessage());
        }
    }
}
```

## Step 4: Config Class

```java
public class Config {
    public String feedUrls()       { return env("FEED_URLS", "https://feeds.example.com/rss"); }
    public String telegramToken()  { return env("TELEGRAM_BOT_TOKEN", ""); }
    public String telegramChatId() { return env("TELEGRAM_CHAT_ID", ""); }

    private String env(String key, String defaultValue) {
        String val = System.getenv(key);
        return (val != null && !val.isBlank()) ? val : defaultValue;
    }
}
```

## Step 5: Refactored Main

```java
public class NewsFetcher {
    public static void main(String[] args) throws Exception {
        var config = new Config();
        FeedParser parser = new RssFeedParser("MyFeed");

        // Choose sender based on config
        AlertSender sender = config.telegramToken().isBlank()
            ? new ConsoleAlertSender()
            : new TelegramAlertSender(config.telegramToken(), config.telegramChatId());

        // Fetch + parse + alert
        String content = fetchUrl(config.feedUrls());
        List<Article> articles = parser.parse(content);

        for (Article article : articles) {
            if (article.title().toLowerCase().contains("breaking")) {
                sender.sendAlert(article, "Breaking news detected");
            }
        }
    }

    private static String fetchUrl(String url) throws Exception {
        var client = java.net.http.HttpClient.newHttpClient();
        var request = java.net.http.HttpRequest.newBuilder(java.net.URI.create(url)).build();
        return client.send(request, java.net.http.HttpResponse.BodyHandlers.ofString()).body();
    }
}
```

**Key OOP wins:** Swap `ConsoleAlertSender` for `TelegramAlertSender` without changing any parsing logic. Add a new parser (JSON, HTML) by implementing `FeedParser` — zero changes to existing code.
