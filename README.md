# Nu Jazz Remix Stack

⚠️ This is community maintained Remix Stack. The Remix team does not maintain or check this. Learn more about [Remix Stacks](https://remix.run/stacks). Learn more about [Remix Docs](https://remix.run/docs).

## What's in the stack

| Package         | Version |
| --------------- | ------- |
| 💿 Remix.run    | 1.9.0   |
| 🚀 React        | 18.2.0  |
| 🖌️ Tailwind CSS | 3.2.4   |
| ⌨️ Typescript   | 4.8.4   |
| ⛏️ Eslint       | 8.27.0  |

## Development

You will be utilizing Wrangler for local development to emulate the Cloudflare runtime. This is already wired up in your package.json as the `dev` script:

```sh
# start the remix dev server and wrangler
npm run dev
```

Open up [http://127.0.0.1:8788](http://127.0.0.1:8788) and you should be ready to go!

### Environmental Variables

When using Cloudflare Pages, `env` variables work differently. Local environment variables should be defined in a `.dev.vars` file in the `root` directory. It shares the same syntax as an `.env` file.

```sh
SOME_SECRET = "insert secret here"
```

In your `loader` functions, you can access environment variables directly on `context`:

```js
export const loader = async ({ context }: LoaderArgs) => {
  console.log(context.SOME_SECRET);
};
```

## Deployment

Cloudflare Pages are currently only deployable through their Git provider integrations.

If you don't already have an account, then [create a Cloudflare account here](https://dash.cloudflare.com/sign-up/pages) and after verifying your email address with Cloudflare, go to your dashboard and follow the [Cloudflare Pages deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything).

Configure the "Build command" should be set to `npm run build`, and the "Build output directory" should be set to `public`.
