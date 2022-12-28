import { createCookieSessionStorage } from '@remix-run/cloudflare';


export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        domain: 'securitydistributors.com',
        secrets: ['my-secret'],
    }
})