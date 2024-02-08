import {
  type DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { type AppType } from "next/dist/shared/lib/utils";
import React, { useState } from "react";
import "~/styles/globals.css";
import { Toaster } from "src/components/ui/toaster"


const MyApp: AppType<{ dehydratedState: DehydratedState }> = ({
  Component,
  pageProps,
}) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <Toaster />
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default MyApp;
