import type { ActionArgs } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/cloudflare';

export async function action({ request }: ActionArgs) {
	return null;
}

export async function loader() {
	return redirect('/login');
}
