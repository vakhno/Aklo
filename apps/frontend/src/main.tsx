import { initAuthClient } from "@shared/auth/client";
import ReactDOM from "react-dom/client";

import "./global.css";

import { QueryProvider } from "@/providers/query-provider";
import { RouteProvider } from "@/providers/router-provider";
import { ToasterProvider } from "@/providers/toaster-provider";

initAuthClient({ options: { baseURL: `${import.meta.env.VITE_APP_URL}` } });

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);

	root.render(
		<QueryProvider>
			<ToasterProvider />
			<RouteProvider>
			</RouteProvider>
		</QueryProvider>
	);
}
