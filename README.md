# 🔥 CloudFire

Cloudfire = Hono + Drizzle + React + Cloudflare (Pages & D1)

This boilerplate SASS template stack is **designed for developers** seeking a streamlined, **high-performance** setup with **minimal dependencies**. Perfect for modern web applications 💪🏻

## ✨ Features

- ☁️ **Serverless** deployment with [Cloudflare Pages](https://pages.cloudflare.com/) and serverless **SQLite** database with [Cloudflare D1](https://developers.cloudflare.com/d1/)
- 🔥 The **fastest JS framework**: [Hono](https://hono.dev/) 
- ⚛️ Simple [React](https://react.dev/) SPA **dashboard**, with [Zustand](https://github.com/pmndrs/zustand) **store** management
- 🌧 [Drizzle](https://orm.drizzle.team/) as **SQLite ORM**
- 🛡 [Zod](https://zod.dev/) **validator**
- 📚 **Automatic** [Swagger](https://swagger.io/) and [OpenApi](https://www.openapis.org/) spec generated based on your Zod schemas
- 🦄 [Tailwind](https://tailwindcss.com/) + [Shadcn](https://ui.shadcn.com/) **styles**
- 🎨 The best **linter** and **formatter**, [BiomeJS](https://biomejs.dev/)
- 🐶 Pre-Commit and Commit [Husky](https://github.com/typicode/husky) **hooks**, runs linter and formatter before any commit!
- 💄 **Commit nomenclature** rules following [Conventional Commit Format](https://commitlint.js.org/) and [Commitizen CLI](https://github.com/commitizen/cz-cli) (emoji [powered](https://github.com/folke/devmoji))
- 🚀 **Release management policy** with [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version), including automagically CHANGELOG.md generation, GitTags, and version bumping
- 🔦 Included [npm-check](https://www.npmjs.com/package/npm-check) to check for **outdated, incorrect, and unused** dependencies.
- 🥷🏻 Included [better-npm-audit](https://www.npmjs.com/package/better-npm-audit) to check for dependency **vulnerabilities**

## 🛠 Getting Started

First, create your production and preview databases, and update your wrangler configuration file:
```
npm i -g wrangler                           # Install Cloudflare Wrangler CLI
wrangler login                              # Login to Cloudflare
wrangler d1 create cloudfire-prod-db        # Create Prod database, and don't forget to update [[d1_databases]] section in wrangle.toml with your database_id
wrangler d1 create cloudfire-preview-db     # Create Preview database, and  don't forget to update [[env.preview.d1_databases]] section in wrangle.toml with your database_id
cp .dev.vars.example .dev.vars              # Create a .dev.vars and don't forget to fill it with your secret variables
```

Then, simply install dependencies, run the migrations and launch it!
```
npm ci                          # Install dependencies
npm run db:migrate:local        # Run database migrations locally
npm run dev                     # Launch project locally
```

## 🎨 Linter & Formatter

```
npm run format         # Run BiomeJS
```

## ⛩ Git Commit with Commitizen

```
git add .            # Add files
npm run cz           # Commit with Commitizen CLI
```

## 🚀 Release and deploy a new version

```
npm run release             # Bump version and generate CHANGELOG.md
git push --follow-tags      # Push changes and GitTag to origin
npm run deploy:preview      # Deploy to preview environment
npm run deploy:prod         # Deploy to prod environment
```

## 🔦 Check vulnerabilities and update outdated dependencies

```
npm run npm:audit     # Check dependency vulnerabilities
npm run npm:check     # Check outdated dependencies
```