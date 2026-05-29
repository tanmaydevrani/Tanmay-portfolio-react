export const defaultSettings = {
  name: "Tanmay Devrani",
  tagline: "Senior Frontend Engineer",
  heroDescription:
    "Transforming complex product requirements into blazing-fast, pixel-perfect web applications. 5+ years delivering scalable React solutions used by thousands daily.",
  email: "tanmaydevrani2@gmail.com",
  phone: "+91 7011372156",
  location: "New Delhi, India",
  github: "https://github.com/tanmaydevrani",
  linkedin: "https://in.linkedin.com/in/tanmaydevrani",
  resumeUrl: "#",
};

export const defaultAbout = {
  bio: [
    "I'm Tanmay Devrani, a Senior Frontend Engineer with 5+ years of hands-on experience building production-grade React applications used by thousands of users daily.",
    "Currently at Shipway by Unicommerce, I architect and deliver end-to-end frontend solutions — from leading a complex migration of a legacy CS-Cart/PHP platform to a modern React + Next.js stack, to mentoring junior engineers and establishing team-wide coding standards.",
    "My core philosophy: performance is a feature. I obsess over Core Web Vitals, bundle optimization, and writing code that's not just functional but maintainable and scalable at speed.",
    "Open to Senior Frontend / Lead Frontend roles in Europe (Germany, UK) and remote opportunities worldwide.",
  ],
  skills: {
    development: ["HTML5", "CSS3", "JavaScript (ES2024)", "TypeScript", "React", "Next.js", "Redux Toolkit", "jQuery", "Tailwind CSS", "Bootstrap"],
    tools: ["Git", "GitHub", "Bitbucket", "Jira", "Vite", "Webpack", "VS Code"],
    design: ["Figma", "Adobe XD"],
  },
  education: [
    {
      degree: "Bachelor of Computer Applications",
      institution: "IEC University",
      year: "2016 – 2019",
      location: "Himachal Pradesh, India",
    },
  ],
};

export const defaultExperience = [
  {
    id: "1",
    order: 1,
    title: "Frontend Developer",
    company: "Shipway by Unicommerce",
    duration: "February 2023 – Present",
    isCurrent: true,
    description: [
      "Architecting and delivering end-to-end frontend solutions for a logistics SaaS platform serving thousands of e-commerce sellers daily.",
      "Leading a full-scale migration of the legacy CS-Cart/PHP application to a modern React + Next.js stack with Node.js API integration.",
      "Building and maintaining a component library that improved development velocity by 40% across the team.",
      "Mentoring a junior frontend developer through code reviews, pair programming, and architectural guidance.",
      "Improved Core Web Vitals scores across key dashboards — LCP reduced by 35%, CLS by 60%.",
    ],
    techStack: ["React", "Next.js", "Redux Toolkit", "Tailwind CSS", "JavaScript"],
  },
  {
    id: "2",
    order: 2,
    title: "Frontend Developer",
    company: "Koenig Solutions",
    duration: "October 2021 – February 2023",
    isCurrent: false,
    description: [
      "Led all frontend development for a global IT training platform — building modern, responsive interfaces used by learners across 50+ countries.",
      "Delivered multiple feature-complete SPAs using React, Redux, and Tailwind CSS from design mockup to production.",
      "Established coding standards and component conventions adopted across the frontend team.",
      "Mentored a junior developer through structured code reviews and technical guidance.",
    ],
    techStack: ["React", "Redux", "Tailwind CSS", "JavaScript"],
  },
  {
    id: "3",
    order: 3,
    title: "Web Designer",
    company: "GIP Infosystems Pvt. Ltd.",
    duration: "September 2020 – October 2021",
    isCurrent: false,
    description: [
      "Built responsive, production-ready UIs for government and enterprise clients using HTML, CSS, JavaScript, jQuery, and Bootstrap.",
      "Contributed to prestigious Ministry of Defence projects — Aero India Exhibition and DefExpo — developing complete, performance-optimized panels used at national-level events.",
      "Worked closely with the design team using Adobe XD to translate wireframes into functional interfaces with pixel precision.",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap", "Adobe XD"],
  },
];

export const defaultProjects = [
  {
    id: "pahadi-pinch",
    order: 1,
    title: "Pahadi Pinch",
    description: "A modern e-commerce web application for authentic Pahadi (Himalayan) food products — bringing the flavors of the mountains to doorsteps across India.",
    longDescription: "Pahadi Pinch is a full-featured e-commerce platform built to showcase and sell authentic Himalayan food products. The app delivers a clean, fast, and mobile-first shopping experience with smooth product browsing, categorization, and a polished UI that builds trust with customers.",
    image: "https://pahadi-pinch.vercel.app/og-image.png",
    liveUrl: "https://pahadi-pinch.vercel.app/",
    githubUrl: "",
    techStack: ["React", "Tailwind CSS", "JavaScript", "Vercel"],
    highlights: [
      "Mobile-first responsive design optimized for all screen sizes",
      "Fast product browsing with category filters and search",
      "Clean, trust-building UI tailored to food e-commerce",
      "Deployed on Vercel with CI/CD pipeline",
    ],
    featured: true,
    category: "E-Commerce",
  },
];

export const defaultBlogPosts = [
  {
    id: "migrating-cscart-to-nextjs",
    title: "Migrating a Legacy CS-Cart/PHP App to React + Next.js: Lessons From the Trenches",
    slug: "migrating-cscart-to-nextjs",
    excerpt: "After 18 months of planning and executing a full-scale migration from CS-Cart to a modern React + Next.js stack, here's everything I wish I'd known before starting — from architectural decisions to the hidden pitfalls that nearly derailed us.",
    content: `## The Problem With Legacy

When you inherit a CS-Cart/PHP application that has grown organically over several years, you inherit every shortcut, every quick fix, and every "we'll clean this up later" decision ever made. Ours had 400+ templates, a deeply coupled PHP backend, and a frontend that couldn't easily be tested or iterated on.

The business case for migration was clear: the development velocity had slowed dramatically, onboarding new developers took weeks, and any significant UI change required touching multiple tangled files.

## Planning the Migration

The first — and most important — principle we adopted was **incremental migration, not a big bang rewrite**. A complete rewrite from scratch is almost always a mistake. Instead, we used the strangler fig pattern:

1. Build the new React app alongside the old one
2. Route specific pages/features to the new stack
3. Gradually strangle the old codebase until it's replaced

## Key Technical Decisions

### 1. Next.js as the framework

We chose Next.js for:
- **SSR/SSG** for SEO-critical pages (product pages, landing pages)
- **API routes** as a proxy layer to the Node.js backend
- **File-based routing** that matched our URL structure

### 2. State Management

After evaluating options, Redux Toolkit was the clear winner for our use case — we had complex shared state (cart, auth, filters) that needed to be accessible across deeply nested components.

### 3. Component Architecture

We built a shared UI component library first. This was the highest-leverage investment — having a consistent Button, Input, Card, and Modal from day one meant we never duplicated UI logic across features.

## What We Got Wrong

**Underestimating data transformation**: PHP returns deeply nested, inconsistently shaped data. We ended up writing a significant normalization layer.

**CSS specificity wars**: Migrating Bootstrap-heavy PHP templates to Tailwind CSS created specificity conflicts. We solved this with CSS layers.

**Authentication complexity**: Session-based PHP auth to JWT-based auth was the most complex migration — we ran both systems in parallel for 3 months.

## Results After Migration

- Build time: 8 minutes → 45 seconds
- LCP: 4.2s → 1.8s
- Bundle size: 2.1MB → 380KB (tree-shaken)
- Developer onboarding: 2 weeks → 3 days

The migration is still ongoing, but the velocity improvement is already measurable.`,
    coverImage: "",
    tags: ["Next.js", "React", "Migration", "Performance", "Architecture"],
    readTime: 9,
    published: true,
    publishedAt: "2025-03-15",
  },
  {
    id: "redux-toolkit-2024",
    title: "Why Redux Toolkit Is the Only Redux You'll Ever Need",
    slug: "redux-toolkit-2024",
    excerpt: "Five years ago, setting up Redux meant writing three files just to add a counter. Today, Redux Toolkit has eliminated that boilerplate entirely. Here's why I still choose Redux Toolkit over Zustand, Jotai, and Context API for complex apps.",
    content: `## The State Management Wars Are Over

Every few months, the JavaScript ecosystem births a new state management library. Zustand, Jotai, Valtio, Recoil, and a dozen others promise to be simpler, lighter, and better than Redux. And for small apps, they often are.

But for large, complex applications with many interconnected pieces of state? Redux Toolkit is still the right choice — and here's why.

## What Redux Toolkit Actually Solves

Before RTK, Redux required:
- An \`actions.js\` file with action type constants
- An \`actionCreators.js\` file
- A \`reducer.js\` file with a switch statement
- Immutable update logic that was easy to get wrong

RTK collapses all of this into a single \`createSlice\` call:

\`\`\`js
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
  }
})
\`\`\`

That's it. Immer handles immutability under the hood, actions are auto-generated, and you get TypeScript inference for free.

## RTK Query: The Hidden Gem

Most developers know about \`createSlice\`. Far fewer use RTK Query — and they're missing out on the most productive data-fetching solution in the React ecosystem.

\`\`\`js
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getProducts: builder.query({ query: () => 'products' }),
    createOrder: builder.mutation({
      query: (body) => ({ url: 'orders', method: 'POST', body }),
    }),
  }),
})
\`\`\`

You get caching, invalidation, loading states, and TypeScript types — all generated automatically.

## When NOT to use Redux Toolkit

- Simple apps with 1-2 developers and minimal shared state → Context API is fine
- Server state heavy apps → TanStack Query handles server state better than RTK Query
- Micro-frontends with isolated state → each team picks their own

## My Rule of Thumb

If your app has more than 5 distinct pieces of global state that interact with each other, use Redux Toolkit. The upfront investment pays off in debugging clarity and maintainability at scale.`,
    coverImage: "",
    tags: ["Redux", "React", "State Management", "JavaScript"],
    readTime: 7,
    published: true,
    publishedAt: "2025-01-22",
  },
  {
    id: "core-web-vitals-react",
    title: "Optimizing Core Web Vitals in React Apps: A Practical Guide",
    slug: "core-web-vitals-react",
    excerpt: "After spending months chasing green scores on PageSpeed Insights for production React apps, I've distilled the most impactful optimizations into a repeatable checklist. LCP, CLS, and INP — here's how to actually fix them.",
    content: `## Why Core Web Vitals Matter

Google uses Core Web Vitals as a ranking signal. More importantly, they directly correlate with user experience — faster pages have higher conversion rates, lower bounce rates, and better engagement.

For React apps specifically, the defaults work against you: large JavaScript bundles, client-side rendering waterfalls, and layout shifts from async content loading.

## LCP (Largest Contentful Paint) — Target: < 2.5s

The most common culprit in React apps is a large hero image or above-the-fold content that loads after JavaScript hydration.

**Fix 1: Preload the LCP image**
\`\`\`html
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />
\`\`\`

**Fix 2: Avoid lazy-loading above-the-fold images**

**Fix 3: Reduce JavaScript blocking time**
- Code split at the route level with React.lazy()
- Tree-shake unused dependencies
- Analyze your bundle with \`vite-bundle-analyzer\`

## CLS (Cumulative Layout Shift) — Target: < 0.1

The most common React-specific cause: components that render a skeleton/loader and then swap to content, causing dimension changes.

**Fix: Reserve space for async content**
\`\`\`css
.card-image { aspect-ratio: 16/9; }
\`\`\`

Never set width/height to 0 while loading. Always reserve the exact dimensions.

## INP (Interaction to Next Paint) — Target: < 200ms

React's synthetic event system and large component trees can cause slow interactions.

**Fix 1: useDeferredValue for expensive renders**
**Fix 2: Virtualize long lists** with react-virtual
**Fix 3: Debounce expensive state updates**

## My Optimization Checklist

- [ ] Route-level code splitting with React.lazy
- [ ] Image optimization (WebP, correct sizes, lazy/eager per position)
- [ ] Font preloading and font-display: swap
- [ ] CSS-in-JS audit (runtime styles hurt INP)
- [ ] Memoize expensive component renders
- [ ] Eliminate render-blocking resources`,
    coverImage: "",
    tags: ["Performance", "React", "Web Vitals", "Optimization"],
    readTime: 8,
    published: true,
    publishedAt: "2024-11-10",
  },
  {
    id: "tailwind-vs-bootstrap",
    title: "Tailwind CSS vs Bootstrap After 5 Years in Production",
    slug: "tailwind-vs-bootstrap",
    excerpt: "I've shipped production apps with both Bootstrap and Tailwind CSS. Here's an honest, experience-driven comparison — when to reach for each, where they both fail, and what I use today.",
    content: `## Starting From Honest Experience

I started with Bootstrap in 2020 at GIP Infosystems. By 2021 at Koenig Solutions, I was shipping Tailwind CSS in production. I've now used both extensively, and the "Tailwind vs Bootstrap" debate online is almost always missing the nuance that matters in real projects.

## Bootstrap: What It's Great At

**Speed to a working UI**: Bootstrap's opinionated component system means you can build a functional admin dashboard in hours. The mental model is simple: add classes, get components.

**Teams with mixed skill levels**: Junior developers can be productive immediately because the patterns are predictable and the documentation is exceptional.

**When it struggles**:
- Custom designs that deviate from Bootstrap's visual language require fighting CSS specificity
- Bundle size: even with PurgeCSS, Bootstrap's JavaScript dependencies add weight
- Dark mode support was bolted on later and shows

## Tailwind CSS: What It's Great At

**Design systems**: Tailwind is exceptional when you have a clear design system. The constraint-based approach forces consistency.

**Performance**: The generated CSS is exactly what you use — nothing more. In production, a typical Tailwind stylesheet is 5-20KB.

**Colocation**: Having styles next to the element is genuinely easier to maintain than hunting through separate CSS files.

**When it struggles**:
- Component-heavy apps need a layer on top (shadcn/ui, etc.)
- Steep learning curve for developers new to utility-first CSS
- Long className strings are visually noisy

## My Honest Recommendation

**Use Bootstrap when**: Tight deadlines, mixed-skill teams, admin dashboards, prototyping

**Use Tailwind when**: You have time to build a design system, performance matters, you want full design control

**The real answer**: Use both strategically. My current setup uses Tailwind for custom UI and Bootstrap's grid system for responsive layouts — the best of both worlds.`,
    coverImage: "",
    tags: ["CSS", "Tailwind", "Bootstrap", "Frontend"],
    readTime: 6,
    published: true,
    publishedAt: "2024-09-05",
  },
  {
    id: "react-component-patterns-2025",
    title: "React Component Patterns Every Senior Developer Should Know in 2025",
    slug: "react-component-patterns-2025",
    excerpt: "Beyond hooks and context — the advanced component patterns that separate maintainable React codebases from spaghetti. Compound components, render props, headless components, and when to reach for each.",
    content: `## Beyond the Basics

Most React tutorials cover hooks and component composition. But the patterns that actually separate maintainable codebases from hard-to-scale ones go deeper. Here are the patterns I use daily.

## 1. Compound Components

When a component has multiple related sub-components that share state, the compound pattern eliminates prop drilling without reaching for Context.

\`\`\`jsx
function Tabs({ children, defaultTab }) {
  const [active, setActive] = useState(defaultTab)
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  )
}
Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Panel = TabPanel
\`\`\`

Usage:
\`\`\`jsx
<Tabs defaultTab="overview">
  <Tabs.List>
    <Tabs.Tab id="overview">Overview</Tabs.Tab>
    <Tabs.Tab id="details">Details</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="overview">...</Tabs.Panel>
</Tabs>
\`\`\`

## 2. Headless Components (Render Props Evolved)

A headless component owns logic, state, and accessibility — but renders nothing itself. The consumer decides the UI. This is how Radix UI and Headless UI work.

\`\`\`jsx
function Disclosure({ children }) {
  const [open, setOpen] = useState(false)
  return children({ open, toggle: () => setOpen(o => !o) })
}
\`\`\`

## 3. The Container/Presenter Split

Separate data-fetching logic from rendering. Containers fetch and transform; presenters just render props. This makes both layers independently testable.

## 4. Controlled vs Uncontrolled — Know When to Offer Both

The best UI libraries offer both:
\`\`\`jsx
// Uncontrolled (internal state)
<DatePicker defaultValue="2025-01-01" />

// Controlled (external state)
<DatePicker value={date} onChange={setDate} />
\`\`\`

## Pattern Selection Guide

| Problem | Pattern |
|---------|---------|
| Related sub-components | Compound Components |
| Reusable logic + flexible UI | Headless / Render Props |
| Data + UI separation | Container/Presenter |
| Form integration | Controlled components |`,
    coverImage: "",
    tags: ["React", "Patterns", "JavaScript", "Architecture"],
    readTime: 10,
    published: true,
    publishedAt: "2024-07-18",
  },
  {
    id: "frontend-interview-prep-2025",
    title: "How I'd Prepare for a Senior Frontend Interview at a European Tech Company",
    slug: "frontend-interview-prep-2025",
    excerpt: "Having gone through interviews at companies in Germany and the UK, here's the exact preparation framework I use — covering technical rounds, system design, and what European engineering culture actually values.",
    content: `## What's Different About European Tech Interviews

European tech companies — especially German ones — interview differently than the Silicon Valley archetype. Less LeetCode grinding, more depth on:

- **System design for the frontend** (component architecture, state management decisions)
- **Code quality and maintainability** over algorithmic cleverness
- **How you collaborate and communicate** — German engineering culture values precision and thoroughness
- **Understanding trade-offs** — not just what to do, but why

## The Technical Rounds

### JavaScript Fundamentals (Still King)

You will be asked about closures, the event loop, prototypal inheritance, and async/await. Not as trivia, but in context.

Example: "Here's a component with a memory leak. What's causing it and how do you fix it?"

### React Deep Dive

- Reconciliation and the virtual DOM
- useCallback, useMemo — when they help and when they hurt
- Concurrent React and Suspense boundaries
- Custom hooks: write one live, explain your design choices

### System Design: Frontend

This is where senior candidates differentiate:
- "Design a real-time dashboard with 50 data streams"
- "Design a component library for a multi-brand product suite"
- "How would you architect the state management for a large e-commerce cart system?"

## What to Emphasize for German Companies

1. **Documentation and process**: Mention that you write design docs before implementation
2. **Testing**: State your testing philosophy clearly — unit, integration, E2E and when to write each
3. **Performance discipline**: Concrete numbers from your experience (I reduced LCP from X to Y)
4. **Ownership**: Describe features you owned end-to-end, not just tasks you completed

## The Soft Skills Round

German and UK companies often spend significant interview time on:
- How you handle technical disagreement with senior stakeholders
- How you break down ambiguous requirements
- How you communicate status and blockers

Have specific stories ready using the STAR format.

## My 6-Week Prep Plan

**Weeks 1-2**: JavaScript deep dive (You Don't Know JS series)
**Week 3**: React internals (react.dev docs, new Concurrent React features)
**Week 4**: Frontend system design (read about Airbnb, Meta, Linear architectures)
**Week 5**: Portfolio prep — make sure you can speak deeply about every project
**Week 6**: Mock interviews + behavioral story prep`,
    coverImage: "",
    tags: ["Career", "Interviews", "Frontend", "Europe"],
    readTime: 11,
    published: true,
    publishedAt: "2024-05-30",
  },
];
