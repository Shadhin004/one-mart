"use client";

import { SessionProvider } from "next-auth/react";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Providers({ children }) {
  return <SessionProvider>
            <Provider store={store}>{children}</Provider>
        </SessionProvider>;
}
