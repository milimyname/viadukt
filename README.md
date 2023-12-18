This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) for the viadukt challenge project. See here the requirements: [viadukt challenge](https://viadukt.notion.site/Kostenkalkulation-5cd9947e0d67452bbcdbdeafead380da?pvs=4)

## Demo

[Viadukt Dashboard](https://viadukt-wild-forest-3032.fly.dev/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env from the .env.example file

if you don't wanna use the pooling feature or your db provider doesn't support it.

1. Please modify the schema prisma with the following:

```bash

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

```

2. Run the following command to generate the prisma client

```bash
npx prisma generate
# or
yarn prisma generate
# or
pnpm prisma generate
# or
bun prisma generate
```

3. Don't forget to include the Github OAuth App credentials in the .env file!


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Techstack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
- [Fly.io](https://fly.io/)
- [Lucia Auth](https://lucia-auth.com/)
- [UI Shadcn](https://ui.shadcn.com/)
  ... and more!
