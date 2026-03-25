# Project: Data Pipeline — Brief & Requirements

## Objective

Enhance the news crawler from Project 1 (Module 010) with Core API features: collections, generics, exception handling, and file I/O. The result is a robust data pipeline that fetches, deduplicates, groups, and exports articles.

## Architecture

```
FeedFetcher (HTTP)
  → List<Article>
    → Deduplicator (Set<String> by URL)
      → Grouper (Map<String, List<Article>>)
        → CSVExporter (BufferedWriter)
          → CSVReader → Stats
```

## Requirements

### 1. Article Storage with Collections

- Store fetched articles in `List<Article>` (ArrayList)
- `Article` record: `title`, `url`, `source`, `publishedDate`, `summary`
- Sort articles by date using `Comparable<Article>`

### 2. Deduplication with Set

- Track seen URLs with `Set<String>` (HashSet)
- Before adding an article, check if its URL is already in the set
- Log duplicates that were skipped

### 3. Grouping with Map

- Group articles by source: `Map<String, List<Article>>`
- Use `computeIfAbsent()` for clean grouping logic
- Print summary: source name + article count

### 4. Robust Error Handling

- Custom `FeedParseException` (checked) for feed parsing failures
- `try-with-resources` for all HTTP connections and file I/O
- Graceful degradation: if one feed fails, continue with others
- Log errors with context (feed URL, line number)

### 5. CSV Export & Import

- Export articles to CSV using `BufferedWriter`
- Read CSV back and compute stats (total articles, articles per source, date range)
- Handle CSV edge cases: commas in titles, missing fields

### 6. Generic Repository

- `Repository<T>` interface with `save(T)`, `findAll()`, `findById(String)`
- `FileRepository<Article>` implementation using CSV storage
- Demonstrates generics in a practical context

## Deliverables

| File | Purpose |
|------|---------|
| `Article.java` | Record with Comparable |
| `FeedParseException.java` | Custom checked exception |
| `Repository.java` | Generic interface |
| `FileRepository.java` | CSV-based implementation |
| `Pipeline.java` | Main orchestrator |
| `StatsCalculator.java` | Read CSV, compute stats |

## Success Criteria

- Pipeline fetches from 3+ sources without crashing on individual failures
- Zero duplicate articles in output
- CSV export/import round-trips correctly
- Stats output shows article count per source
