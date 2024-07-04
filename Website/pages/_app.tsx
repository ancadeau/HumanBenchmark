﻿// _app.tsx
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Navbar from "../components/navbar"; // Assurez-vous que le chemin est correct

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Liste des chemins où la navbar ne doit pas apparaître
  const noNavbarPaths = ["/login", "/register"];

  return (
    <>
      {!noNavbarPaths.includes(router.pathname) && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;