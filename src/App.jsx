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
  const [immersive, setImmersive] = useState(() => window.location.hash === "#immersive" && window.matchMedia("(min-width: 992px)").matches);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 992px)");
    const navigate = () => {
      if (!desktop.matches && window.location.hash === "#immersive") {
        setImmersive(false);
        window.location.replace("#projects");
        return;
      }
      const next = window.location.hash === "#immersive";
      setImmersive(next);
      if (next) window.scrollTo(0, 0);
      else requestAnimationFrame(() => {
        const id = window.location.hash.slice(1) || "home";
        document.getElementById(id)?.scrollIntoView();
      });
    };
    const onViewportChange = () => {
      if (window.location.hash === "#immersive") navigate();
    };
    window.addEventListener("hashchange", navigate);
    desktop.addEventListener("change", onViewportChange);
    onViewportChange();
    return () => {
      window.removeEventListener("hashchange", navigate);
      desktop.removeEventListener("change", onViewportChange);
    };
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
