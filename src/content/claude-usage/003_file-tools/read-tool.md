# The Read Tool

## Overview

The Read tool reads files from the local filesystem. It is Claude's primary way to see file contents before making changes. You should assume the Read tool can access any file on the machine.

## Basic Usage

Read takes an **absolute path** (never relative) and returns the file contents with line numbers in `cat -n` format:

```
     1→import React from 'react';
     2→import App from './App';
     3→
     4→ReactDOM.render(<App />, document.getElementById('root'));
```

Line numbers start at **1** and are separated from content by a tab character (`→`).

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `file_path` | Yes | Absolute path to the file |
| `offset` | No | Line number to start reading from |
| `limit` | No | Number of lines to read |
| `pages` | No | Page range for PDFs only (e.g., "1-5") |

By default, Read returns up to **2000 lines** from the beginning of the file.

## Handling Large Files

For files larger than 2000 lines, use `offset` and `limit`:

```
# Read lines 100-200 of a large file
Read(file_path="/path/to/large-file.js", offset=100, limit=100)
```

This is especially useful for log files, generated code, or data files.

## Reading Images

The Read tool can read image files (PNG, JPG, etc.). Since Claude is a **multimodal LLM**, image contents are presented visually — Claude can see and describe what is in the image.

## Reading PDFs

For PDF files, use the `pages` parameter:

- Required for PDFs longer than **10 pages**
- Maximum **20 pages** per request
- Format: `"1-5"`, `"3"`, `"10-20"`
- Reading a large PDF without specifying pages will **fail**

```
# Read pages 1-5 of a PDF
Read(file_path="/path/to/document.pdf", pages="1-5")
```

## Reading Jupyter Notebooks

The Read tool handles `.ipynb` files natively, returning all cells with their outputs — combining code, text, and visualizations in a readable format.

## Parallel Reads

You can read multiple files simultaneously when they are independent. This is a key performance optimization:

```
# These run in parallel — much faster than sequential reads
Read(file_path="/src/App.jsx")
Read(file_path="/src/index.js")
Read(file_path="/src/utils/helpers.js")
```

## Limitations

- **Cannot read directories** — use `ls` via the Bash tool instead
- Empty files return a system warning instead of content
- Only reads files, never modifies them
- Relative paths are not supported — always use absolute paths

## Key Takeaways

- Read is the primary tool for viewing file contents
- Output uses `cat -n` format with line numbers starting at 1
- Use `offset` and `limit` for large files (default limit is 2000 lines)
- Supports images, PDFs (with `pages` parameter), and Jupyter notebooks
- Always read before editing — this is a hard requirement
- Read multiple files in parallel when possible for efficiency
