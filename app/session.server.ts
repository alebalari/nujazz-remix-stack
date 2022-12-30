import { createCookie, createCookieSessionStorage } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/server-runtime';
import type { Session } from '@supabase/auth-helpers-remix';

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 1 week
const SESSION_DOMAIN = 'example.com';
const SESSION_KEY = 'accessToken';

// Create session cookie
const sessionCookie = createCookie('__session', {
	httpOnly: true,
	path: '/',
	sameSite: 'lax',
	domain: SESSION_DOMAIN,
	secure: true,
	maxAge: SESSION_MAX_AGE,
	secrets: ['SESSION_SECRET'],
});

// Create session storage for the cookie
export const sessionStorage = createCookieSessionStorage({
	cookie: sessionCookie,
});

// We use this function to pull the session cookie from the request
export async function getSession(request: Request) {
	const cookie = request.headers.get('Cookie');
	return sessionStorage.getSession(cookie);
}

// We use this function to pull the user from the session cookie
export async function getUser(request: Request): Promise<Session['user'] | null> {
	const session = await getSession(request);
	const user =  session.get('user');
	return user;
}

// We use this function to pull the userId from the session cookie
export async function getUserId(request: Request): Promise<Session['user']['id'] | null> {
	const session = await getSession(request);
	const userId = session.get('user')?.id;
	return userId;
}

// We use this function to pull the access token from the session cookie
export async function getAuthorizedSession(request: Request): Promise<Session['access_token'] | null> {
	const session = await getSession(request);
	const accessToken = session.get(SESSION_KEY);
	return accessToken;
}

// We use this function to require an authorized session, and redirect to the login page if it doesn't exist
export async function requireAuthorizedSession(request: Request) {
	const accessToken = await getAuthorizedSession(request);
	if (!accessToken) {
		return redirect('/login');
	}
	return accessToken;
}

// We use this function to set the access token in the cookie and commit an authorized session
export async function commitAuthorizedSession({
	request,
	accessToken,
	rememberMe,
	redirectTo,
}: {
	request: Request;
	accessToken: Session['access_token'];
	rememberMe: boolean;
	redirectTo: string;
}) {
	const session = await getSession(request);
	session.set(SESSION_KEY, accessToken);
	return redirect(redirectTo, {
		headers: {
			'Set-Cookie': await sessionStorage.commitSession(session, {
				maxAge: rememberMe ? SESSION_MAX_AGE : undefined,
			}),
		},
	});
}

// We use this function to destroy the session cookie for the request, effectively logging the user out
export async function destroyAuthorizedSession(request: Request) {
	const session = await getSession(request);
	return redirect('/', {
		headers: {
			'Set-Cookie': await sessionStorage.destroySession(session),
		},
	});
}