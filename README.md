<h1 align="center">
🔥 CLOUDFIRE 🔥
</h1>

<h5 align="center">
a Hono + React + Cloudflare (Pages & D1 SQLite) + DrizzleORM template
</h5>

---

This boilerplate SaaS template stack is **designed for developers** seeking a streamlined, **high-performance** setup with **minimal dependencies**, and **super lightweight**. Perfect for modern web applications 🚀

## ✨ Features

- ☁️ [Cloudflare Pages](https://pages.cloudflare.com/) and [Cloudflare D1](https://developers.cloudflare.com/d1/) SQLite **serverless** deployment with
- 🔥 [Hono](https://hono.dev/), the **fastest JS** server framework
- ⚛️ [React](https://react.dev/) 18 **SPA** ( <80kb gzip! )
- 🪛 [Nanostores](https://github.com/nanostores/nanostores) State Management, Router and Query **lightweight multitool**
- 🌧 [Drizzle](https://orm.drizzle.team/) as **SQLite ORM**
- 🛡 [Zod](https://zod.dev/) **validator**
- 🦄 [Tailwind](https://tailwindcss.com/) **styles**
- 🔐 Username + password **JWT Auth Example**
- 🎨 The best **linter** and **formatter**, [BiomeJS](https://biomejs.dev/)
- 💄 **Commit nomenclature** rules following [Conventional Commit Format](https://commitlint.js.org/) and [Commitizen CLI](https://github.com/commitizen/cz-cli) (emoji [powered](https://github.com/folke/devmoji))
- 🚀 **Release management policy** with [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version), including automagically CHANGELOG.md generation, GitTags, and version bumping
- 🐶 Pre-Commit [Husky](https://github.com/typicode/husky) **hooks**
- 🔦 Included [npm-check](https://www.npmjs.com/package/npm-check) to check for **outdated, incorrect, and unused** dependencies.
- 🥷🏻 Included [better-npm-audit](https://www.npmjs.com/package/better-npm-audit) to check for dependency **vulnerabilities**


## 🛠 Getting Started

First, create your production & preview databases, and update your wrangler configuration file:

```
npm i -g wrangler                           # Install Cloudflare Wrangler CLI
wrangler login                              # Login to Cloudflare
wrangler d1 create cloudfire-prod-db        # Create Prod database, and don't forget to update [[d1_databases]] section in wrangle.toml with your database_id and database_name
wrangler d1 create cloudfire-preview-db     # Create Preview database, and  don't forget to update [[env.preview.d1_databases]] section in wrangle.toml with your database_id and database_name
cp .dev.vars.example .dev.vars              # Create a .dev.vars and don't forget to fill it with your secret variables
```

Then, simply install dependencies, run the migrations and launch it!

```
npm ci                          # Install dependencies
npm run db:migrate:local        # Run database migrations locally
npm run dev                     # Launch project locally
```

## ⛩ Git Commit with Commitizen

```
git add .            # Add files
npm run cz           # Commit with Commitizen CLI
```

## 🎨 Linter & Formatter

```
npm run biome         # Run BiomeJS
```

## 🚀 Release and deploy a new version

1. (optional) First, generate a new release:

```
npm run release                                             # (default) Bump version, generate CHANGELOG.md and push GitTag to origin
commit-and-tag-version --first-release --release-as 1.0.0   # First release and Release as a Target Type Imperatively
```

2. Then, add environment variables vía dashboard [(docs)](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-the-dashboard), run migrations and deploy it:

```
npm run db:migrate:preview  # Run database migrations (preview environment)
npm run deploy:preview      # Deploy (preview environment)

npm run db:migrate:prod     # Run database migrations (prod environment)
npm run deploy:prod         # Deploy (prod environment)
```

## 🖥 Drizzle Migrations & Studio

Generate new migrations:

```
npm run db:generate
```

Launch database studio:

```
npm run db:studo:local
npm run db:studo:preview
npm run db:studo:prod
```

## 🔦 Check vulnerabilities and update outdated dependencies

```
npm run npm:audit     # Check dependency vulnerabilities
npm run npm:check     # Check outdated dependencies
```