import { Outlet, useOutletContext } from '@remix-run/react';

import type { SupabaseContext } from '~/root';

export default function __auth() {
	// We use our outlet context to access our single instance of Supabase
	const { supabase, session } = useOutletContext<SupabaseContext>();
	return (
		<section className='bg-white dark:bg-gray-900'>
			<div className='grid lg:h-screen lg:grid-cols-2'>
				<Outlet context={{ supabase, session }} />
			</div>
		</section>
	);
}
