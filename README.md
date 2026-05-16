# Stanzix

Structured prompts for serious AI users.

## Architecture

This is a monorepo with two deployable apps:

- `marketing/` — Marketing site at stanzix.com
- `app/` — Product app at app.stanzix.com

## Development

### Marketing site

```bash
cd marketing
npm install
npm run dev
```

### Product app

```bash
cd app
npm install
npm run dev
```

## Deployment

Both apps deploy independently on Vercel:

- **Marketing:** Vercel project with root directory set to `marketing/`
- **App:** Vercel project with root directory set to `app/`

## Repo structure

```
stanzix/
├── marketing/            # stanzix.com
├── app/                  # app.stanzix.com
├── .cursor/
│   └── rules/
│       └── stanzix.mdc
├── stanzix-website-copy.md
├── stanzix-build-plan.md
└── README.md
```
