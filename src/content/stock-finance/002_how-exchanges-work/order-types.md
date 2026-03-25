# Order Types

## Why Order Types Matter

When you buy or sell a stock, you don't just say "buy" — you specify **how** you want the trade executed. Different order types give you control over price and timing.

## Market Order

**"Buy/sell right now at whatever the current price is."**

- Executes immediately
- You get the stock, but the exact price may vary slightly (slippage)
- Best for: liquid stocks when you want in/out fast

```
Example: AAPL is trading at $175. You place a market buy order.
You might get filled at $175.01 or $174.99 — very close, but not exact.
```

## Limit Order

**"Buy/sell only at this price or better."**

- Buy limit: executes at your price **or lower**
- Sell limit: executes at your price **or higher**
- May not execute if the price never reaches your limit
- Best for: getting a specific entry/exit price

```
Example: AAPL is at $175. You set a buy limit at $170.
Your order only fills if AAPL drops to $170 or below.
```

## Stop Order (Stop-Loss)

**"Trigger a market order when the price reaches X."**

- Used to limit losses or protect profits
- Once triggered, becomes a market order (may slip)

```
Example: You bought AAPL at $175. You set a stop-loss at $165.
If AAPL drops to $165, a market sell order is triggered automatically.
```

## Stop-Limit Order

**"Trigger a limit order when the price reaches X."**

- Combines stop and limit — more control, but may not fill
- You set two prices: the **stop** (trigger) and the **limit** (max/min)

## Order Duration

| Type | Meaning |
|------|---------|
| Day order | Expires at market close if unfilled |
| GTC (Good Till Cancelled) | Stays open until filled or cancelled |
| IOC (Immediate or Cancel) | Fill what you can now, cancel the rest |
| FOK (Fill or Kill) | Fill the entire order now or cancel it |

## Comparison

| Order Type | Speed | Price Control | Guaranteed Fill? |
|-----------|-------|--------------|-----------------|
| Market | Instant | None | Yes |
| Limit | May wait | Full | No |
| Stop | Triggered | None after trigger | Yes (once triggered) |
| Stop-Limit | Triggered | Full after trigger | No |

## Key Takeaway

> Use market orders for speed, limit orders for price control, and stop orders to manage risk. Most beginners should start with market and limit orders.
