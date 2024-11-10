# 🔥 CLOUDFIRE

##### ... a Hono + React + Cloudflare (Pages & D1 SQLite) + DrizzleORM template

This boilerplate SaaS template stack is **designed for developers** seeking a streamlined, **high-performance** setup with **minimal dependencies**, and **super lightweight**. Perfect for modern web applications 🚀

## ✨ Features

- ☁️ [Cloudflare Pages](https://pages.cloudflare.com/) and [Cloudflare D1](https://developers.cloudflare.com/d1/) SQLite **serverless** deployment with
- 🔥 [Hono](https://hono.dev/), the **fastest JS** server framework
- ⚛️ [React](https://react.dev/) 18 **SPA**
- 🪛 [Nanostores](https://github.com/nanostores/nanostores) State Management, Router and Query **lightweight multitool**
- 🌧 [Drizzle](https://orm.drizzle.team/) as **SQLite ORM**
- 🛡 [Zod](https://zod.dev/) **validator**
- 🦄 [Tailwind](https://tailwindcss.com/) **styles**
- 🔐 Username + password **auth example**

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

## 🚀 Release and deploy a new version

Add environment variables vía dashboard [(docs)](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-the-dashboard), run migrations and then, deploy it:

```
npm run db:migrate:preview  # Run database migrations (preview environment)
npm run deploy:preview      # Deploy to preview environment

npm run db:migrate:prod     # Run database migrations (prod environment)
npm run deploy:prod         # Deploy to prod environment
```

## 🖥 Database Drizzle Studio

```
npm run db:studo:local
npm run db:studo:preview
npm run db:studo:prod
```
