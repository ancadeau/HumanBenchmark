// pages/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers la page de login
    router.push("/login");
  }, [router]);

  return null;
};

export default Home;