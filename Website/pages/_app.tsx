// _app.tsx
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Navbar from "../components/navbar";

// Import the Inter font from Google Fonts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Liste des chemins où la navbar ne doit pas apparaître
  const noNavbarPaths = ["/login", "/register"];

  return (
    <main className={inter.className}>
      {!noNavbarPaths.includes(router.pathname) && <Navbar />}
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;