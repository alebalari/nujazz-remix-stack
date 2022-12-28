import { Outlet } from '@remix-run/react';

export default function __auth() {
	return (
		<section className='bg-white dark:bg-gray-900'>
			<div className='grid lg:h-screen lg:grid-cols-2'>
				<Outlet />
			</div>
		</section>
	);
}
