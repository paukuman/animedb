import type { MetaFunction, LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

interface Env {
  DB: D1Database;
}

export const loader: LoaderFunction = async ({ context, params }) => {
  let env = context.env as Env;

  let { results } = await env.DB.prepare("SELECT * FROM anime LIMIT 5").all();
  return results;
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const results: unknown = useLoaderData<typeof loader>();
  return (
    
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
