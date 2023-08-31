import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

 const ReactQueryClient = cache(() => new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 3,
      useErrorBoundary: true,
    },
  },
}));
export default ReactQueryClient;