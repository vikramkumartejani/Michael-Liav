import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show the loader only when the site is first loaded
    const isFirstLoad = sessionStorage.getItem("isFirstLoad");

    if (!isFirstLoad) {
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("isFirstLoad", "true"); // Prevents loader from showing again
      }, 2000);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
