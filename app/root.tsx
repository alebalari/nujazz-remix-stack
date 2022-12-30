import type { LinksFunction, LoaderArgs, LoaderFunction, MetaFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useFetcher,
	useLoaderData,
} from '@remix-run/react';
import { createBrowserClient } from '@supabase/auth-helpers-remix';
import { CreateSupabaseServerClient } from '~/supabase.server';
import { useEffect, useState } from 'react';
import type { Database } from '~/types';

import tailwindStyles from './styles/tailwind.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: tailwindStyles }];

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Application',
	viewport: 'width=device-width,initial-scale=1',
});

export const loader: LoaderFunction = async ({ request, context }: LoaderArgs) => {
	// Pipe any necessary environment variables to the client
	// Cloudflare pages uses the `context` object to pass env vars
	const env = {
		SUPABASE_URL: context.SUPABASE_URL,
		SUPABASE_ANON_PUBLIC_KEY: context.SUPABASE_ANON_PUBLIC_KEY,
	};
	// We can retrieve the session on the server and hand it to the client.
	// This is used to make sure the session is available immediately upon rendering
	const response = new Response();

	// Create a server side instance of the supabase client
	const supabaseArgs = { request, response, context };
	const supabaseServerClient = CreateSupabaseServerClient(supabaseArgs);

	// Check if there is a session
	const {
		data: { session },
	} = await supabaseServerClient.auth.getSession();

	// in order for the set-cookie header to be set,
	// headers must be returned as part of the loader response
	return json(
		{
			env,
			session,
		},
		{
			headers: response.headers,
		}
	);
};

export default function Root() {
	const { env, session } = useLoaderData<typeof loader>();
	const fetcher = useFetcher();

	// it is important to create a single instance of Supabase
	// to use across client components - outlet context 👇
	const [supabase] = useState(() => createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_PUBLIC_KEY));

	const accessToken = session?.access_token;
	const user = session?.user;

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (session?.access_token !== accessToken) {
				// server and client are out of sync.
				// Remix recalls active loaders after actions complete
				fetcher.submit(null, {
					method: 'post',
					action: '/',
				});
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [user, accessToken, supabase, fetcher]);

	return (
		<html lang='en'>
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet context={{ supabase, session, user }} />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
