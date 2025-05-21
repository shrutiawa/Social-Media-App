import { store } from "@/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider, useSession } from "next-auth/react";
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === "loading") {
    return <div className="p-4 text-sm">Loading...</div>; 
  }

  return <>{children}</>;
};
export default function App({ Component, pageProps }: AppProps) {
  return(
    <SessionProvider session={pageProps.session}>
      <AuthGuard>
      <ToastContainer position="top-center" autoClose={3000} />
      <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </AuthGuard>
    </SessionProvider>
  )
}
