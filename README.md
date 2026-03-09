# NetStudy - CCNA Preparation Platform

A responsive web application for CCNA exam preparation with Vietnamese glossary support.

## Features

- 📖 **Interactive Study Notes** - Markdown-formatted content with automatic term highlighting
- 📝 **Practice Quizzes** - Multiple choice questions with instant feedback
- 🇻🇳 **Vietnamese Glossary** - 100+ networking terms with Vietnamese explanations
- 📊 **Progress Tracking** - Automatic progress saving via localStorage
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
netstudy/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.jsx       # Main layout with navigation
│   │   ├── ProgressRing.jsx # Circular progress indicator
│   │   ├── TermTooltip.jsx  # Glossary term tooltip
│   │   ├── ContentRenderer.jsx  # Markdown-like content renderer
│   │   └── QuizView.jsx     # Quiz component
│   ├── pages/               # Route pages
│   │   ├── Dashboard.jsx    # Course overview
│   │   ├── ModulePage.jsx   # Module lesson list
│   │   ├── LessonPage.jsx   # Individual lesson view
│   │   ├── GlossaryPage.jsx # Searchable glossary
│   │   └── NotFound.jsx     # 404 page
│   ├── data/                # Course content and glossary
│   │   ├── courses.js       # Course/module/lesson structure
│   │   └── glossary.js      # Vietnamese term definitions
│   ├── hooks/               # React hooks
│   │   └── useProgress.jsx  # Progress tracking context
│   ├── utils/               # Utility functions
│   │   └── glossaryHelper.js # Glossary term matching
│   ├── styles/
│   │   └── index.css        # Tailwind CSS + custom styles
│   ├── App.jsx              # Main app with routing
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Adding Content

### Adding a New Lesson

Edit `src/data/courses.js` and add to the appropriate module:

```javascript
{
  id: 'my-new-lesson',
  title: 'My New Lesson',
  type: 'notes', // or 'quiz'
  content: `
# Lesson Title

Your markdown-like content here...

## Section Heading

- Bullet points
- **Bold text**
- \`inline code\`
  `,
  resources: [
    { type: 'video', title: 'Video Title', url: 'https://...' }
  ]
}
```

### Adding Quiz Questions

```javascript
{
  id: 'my-quiz',
  title: 'Topic Quiz',
  type: 'quiz',
  questions: [
    {
      id: 'q1',
      question: 'Your question here?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 1, // 0-indexed (Option B)
      explanation: 'Explanation shown after answering.'
    }
  ]
}
```

### Adding Glossary Terms

Edit `src/data/glossary.js`:

```javascript
"New Term": {
  vi: "Vietnamese explanation here",
  category: "Category Name"
}
```

Terms are automatically detected and highlighted in lesson content.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Deploy automatically

### Netlify

1. Push code to GitHub
2. Import to [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

Note: For GitHub Pages, update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

## Tech Stack

- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Tailwind CSS 3** - Utility-first styling
- **Vite 5** - Build tool

## Customization

### Changing Colors

Edit `tailwind.config.js` to modify the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      brand: {
        500: '#your-color', // Primary color
      }
    }
  }
}
```

### Adding a New Course

1. Add course data to `src/data/courses.js`
2. The routing automatically handles `/course/:courseId/...` paths

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

---

Built with ❤️ for efficient CCNA preparation
