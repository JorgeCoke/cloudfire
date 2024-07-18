# 🔥 CloudFire

Cloudfire = Hono + Drizzle + React + Cloudflare (Pages & D1)

## ✨ Features

- 🎨 [BiomeJS](https://biomejs.dev/) as **linter** and **formatter**
- 🐶 Pre-Commit and Commit [Husky](https://github.com/typicode/husky) **hooks**, runs linter and formatter before any commit!
- 💄 **Commit nomenclature** rules following [Conventional Commit Format](https://commitlint.js.org/) and [Commitizen CLI](https://github.com/commitizen/cz-cli) (emoji [powered](https://github.com/folke/devmoji))
- 🚀 **Release management policy** with [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version), including automagically CHANGELOG.md generation, GitTags, and version bumping
- 🔦 Included [npm-check](https://www.npmjs.com/package/npm-check) to check for **outdated, incorrect, and unused** dependencies.
- 🥷🏻 Included [better-npm-audit](https://www.npmjs.com/package/better-npm-audit) to check for dependency **vulnerabilities**

## 🛠 Getting Started

```
npm ci               # Install dependencies
npm run dev          # Launch project locally
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

## 🚀 Release a new version

```
npm run release             # Bump version and generate CHANGELOG.md
git push --follow-tags      # Push changes and GitTag to origin
```

## 🔦 Check vulnerabilities and update outdated dependencies

```
npm run npm:audit     # Check dependency vulnerabilities
npm run npm:check     # Check outdated dependencies
```