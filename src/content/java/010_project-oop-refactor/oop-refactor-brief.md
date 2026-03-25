# Project: OOP Refactor — Brief & Requirements

## Objective

Refactor the procedural news fetcher from Module 004 into a clean OOP design. The program should fetch RSS feeds, parse articles, and send alerts through pluggable channels.

## Architecture

```
Main
 ├── Config              (settings from env vars)
 ├── FeedParser          (interface)
 │   └── RssFeedParser   (implementation)
 ├── AlertSender         (interface)
 │   ├── TelegramAlertSender   (HTTP POST to Bot API)
 │   └── ConsoleAlertSender    (stdout for dev/testing)
 └── Article             (data class)
```

## Classes to Create

### 1. `Article` (data carrier)
- Fields: `String title`, `String url`, `String source`, `LocalDate publishedDate`
- Use a `record` (Java 16+) or traditional class with `equals`/`hashCode`/`toString`
- Immutable — no setters

### 2. `FeedParser` (interface)
- Single method: `List<Article> parse(String content)`
- Enables swapping RSS for HTML or JSON parsers later

### 3. `RssFeedParser` (implements FeedParser)
- Parses XML content from RSS feeds
- Extracts `<title>`, `<link>`, `<pubDate>` from `<item>` elements
- Returns a `List<Article>`

### 4. `AlertSender` (interface)
- Single method: `void sendAlert(Article article, String reason)`
- Decouples alert logic from delivery channel

### 5. `TelegramAlertSender` (implements AlertSender)
- Sends HTTP POST to `https://api.telegram.org/bot<TOKEN>/sendMessage`
- Reads `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` from `Config`
- Formats message with article title, URL, and reason

### 6. `ConsoleAlertSender` (implements AlertSender)
- Prints alert to `System.out` — useful for development and testing

### 7. `Config` (settings)
- Reads from environment variables: `FEED_URLS`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- Provides getter methods with sensible defaults
- Single source of truth for configuration

## Requirements

- [ ] Each class in its own `.java` file
- [ ] Use interfaces for `FeedParser` and `AlertSender`
- [ ] `Article` should be immutable (record or final fields)
- [ ] `Config` reads all settings from environment variables
- [ ] Main method wires everything together — no business logic in main
- [ ] Code compiles and runs with `java 21+`

## Why This Matters

This refactor demonstrates **Dependency Inversion** (depend on interfaces), **Single Responsibility** (each class does one thing), and **Open/Closed** (add new parsers/senders without modifying existing code).
