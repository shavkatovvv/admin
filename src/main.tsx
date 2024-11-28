import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

export const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
   <BrowserRouter>
    <QueryClientProvider client={client}>
        <App />
    </QueryClientProvider>
   </BrowserRouter>
);
