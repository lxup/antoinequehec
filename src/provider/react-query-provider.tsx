'use client';
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { matchQuery, MutationCache, QueryClient, QueryClientProvider, QueryKey } from "@tanstack/react-query";

type ReactQueryProviderProps = {
	children: React.ReactNode;
};

const ReactQueryProvider = ({ children } : ReactQueryProviderProps) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				staleTime: 60_000,
			}
		},
		mutationCache: new MutationCache({
			onSuccess: (_data, _variables, _context, mutation) => {
			  queryClient.invalidateQueries({
				predicate: (query) =>
				  Array.isArray(mutation.options.meta?.invalidates) &&
				  (mutation.options.meta?.invalidates as QueryKey[]).some((queryKey) =>
					matchQuery({ queryKey }, query),
				  ),
			  })
			}
		  })
	});

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
		</QueryClientProvider>
	)
};

export { ReactQueryProvider };