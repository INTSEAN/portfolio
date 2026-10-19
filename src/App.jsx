import { lazy, Suspense, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Bann from "./components/Bann";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Immersive = lazy(() => import("./components/immersive/Immersive"));

export default function App() {
  const [immersive, setImmersive] = useState(() => window.location.hash === "#immersive");
  useEffect(() => {
    const navigate = () => {
      const next = window.location.hash === "#immersive";
      setImmersive(next);
      if (next) window.scrollTo(0, 0);
      else requestAnimationFrame(() => {
        const id = window.location.hash.slice(1) || "home";
        document.getElementById(id)?.scrollIntoView();
      });
    };
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);
  return (
    <>
      {!immersive && <Bann />}
      <NavBar immersive={immersive} />
      {immersive ? (
        <main className="gallery-page">
          <Suspense fallback={<section className="gallery-loading" role="status">Loading gallery…</section>}>
            <Immersive />
          </Suspense>
        </main>
      ) : <><Banner /><Skills /><Projects /><Contact /></>}
      <Footer compact={immersive} />
    </>
  );
}
