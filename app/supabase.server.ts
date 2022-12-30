import { createServerClient } from '@supabase/auth-helpers-remix';

import type { AppLoadContext } from '@remix-run/cloudflare';
import type { Database, TypedSupabaseClient } from './types';

export function CreateSupabaseServerClient({request, response, context}:{
	request: Request;
	response: Response;
	context: AppLoadContext;}
): TypedSupabaseClient {
	return createServerClient<Database>(context.SUPABASE_URL as string, context.SUPABASE_ANON_PUBLIC_KEY as string, {
		request,
		response,
	});
}
