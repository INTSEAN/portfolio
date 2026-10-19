import { useEffect, useRef, useState } from "react";
import { projects } from "../../data/projects";
import { createGalleryScene } from "./galleryScene";
import "./Immersive.css";

const formatNumber = value => String(value + 1).padStart(2, "0");

export default function Immersive() {
  const root = useRef(null);
  const host = useRef(null);
  const controller = useRef(null);
  const closeButton = useRef(null);
  const overviewButton = useRef(null);
  const indexButton = useRef(null);
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("space");
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [paused, setPaused] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState("");
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const focused = selected !== null ? projects[selected] : null;
  const isIndex = view === "index" || unavailable;

  useEffect(() => {
    document.documentElement.classList.add("in-immersive");
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = event => setReducedMotion(event.matches);
    const onFullscreen = () => setFullscreen(document.fullscreenElement === root.current);
    media.addEventListener("change", onMotion);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => {
      document.documentElement.classList.remove("in-immersive");
      media.removeEventListener("change", onMotion);
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, []);

  useEffect(() => {
    if (isIndex) return;
    let scene;
    setReady(false);
    try {
      scene = createGalleryScene(host.current, projects, setSelected, () => setReady(true), () => setUnavailable(true));
      controller.current = scene;
    } catch {
      setUnavailable(true);
    }
    return () => { scene?.dispose(); controller.current = null; };
  }, [isIndex]);

  useEffect(() => {
    controller.current?.update({ selected, paused, reducedMotion });
  }, [selected, paused, reducedMotion, isIndex]);

  useEffect(() => {
    if (selected !== null) closeButton.current?.focus({ preventScroll: true });
  }, [selected]);

  const reset = () => {
    setSelected(null);
    controller.current?.update({ reset: true });
    (isIndex ? indexButton : overviewButton).current?.focus({ preventScroll: true });
  };
  const step = direction => setSelected(current => current === null ? direction > 0 ? 0 : projects.length - 1 : (current + direction + projects.length) % projects.length);
  const onKeys = event => {
    if (["INPUT", "TEXTAREA"].includes(event.target.tagName)) return;
    if (event.key === "Escape" && selected !== null) { event.preventDefault(); reset(); }
    if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
  };
  const toggleFullscreen = async () => {
    setFullscreenError("");
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await root.current.requestFullscreen();
    } catch { setFullscreenError("Fullscreen isn’t available in this browser."); }
  };

  return (
    <section ref={root} className={`immersive ${focused ? "has-focus" : ""} ${isIndex ? "index-view" : ""}`} id="immersive" onKeyDown={onKeys} aria-labelledby="gallery-title">
      <header className="gallery-header">
        <h1 id="gallery-title">Selected work<span aria-hidden="true">.</span></h1>
        <div className="gallery-view-switch" role="group" aria-label="Gallery view">
          <button ref={overviewButton} className={!isIndex ? "active" : ""} aria-pressed={!isIndex} disabled={unavailable} onClick={() => { setView("space"); setSelected(null); }}>Explore</button>
          <button ref={indexButton} className={isIndex ? "active" : ""} aria-pressed={isIndex} onClick={() => { setView("index"); setSelected(null); }}>Index</button>
        </div>
      </header>

      <div className="gallery-room">
        <div className="gallery-atmosphere" aria-hidden="true" />
        {!isIndex && <div ref={host} className="gallery-canvas" aria-label="Drag horizontally to look around. Use the index or arrow controls to select a project." />}
        {!ready && !isIndex && <div className="gallery-preparing" role="status">Loading gallery…</div>}
        {isIndex && (
          <section className="gallery-index" aria-label="Project index">
            {unavailable && <p className="gallery-fallback-note">3D isn’t available. Explore the project index.</p>}
            {projects.map((project, index) => (
              <button className={`index-card ${selected === index ? "selected" : ""}`} key={project.title} onClick={() => setSelected(index)} aria-label={`Explore ${project.title}`}>
                <div className="index-card-image"><img src={project.imgUrl} alt={`${project.title} website preview`} loading="lazy" /></div>
                <div className="index-card-caption"><h2>{project.title}</h2><span>{project.date}</span></div>
              </button>
            ))}
          </section>
        )}

        {focused && (
          <section className="gallery-project-detail" aria-labelledby="focused-project-title">
            <div className="detail-topline"><span>{focused.date}</span><button ref={closeButton} onClick={reset} aria-label="Close project details">×</button></div>
            <h2 id="focused-project-title">{focused.title}</h2>
            <p>{focused.description.replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, "").trim()}</p>
            <div className="detail-technologies">{focused.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
            <a href={focused.link} target="_blank" rel="noopener noreferrer">{focused.link.includes("github.com") ? "View repository" : "Visit project"}<span aria-hidden="true">↗</span></a>
          </section>
        )}
      </div>

      <div className="gallery-controls" role="group" aria-label="Gallery controls">
        {!isIndex && <p className="gallery-hint">Drag to explore</p>}
        <div className="gallery-step-controls">
          <button onClick={() => step(-1)} aria-label="Previous project">←</button>
          <span>{focused ? `${formatNumber(selected)} / ${String(projects.length).padStart(2, "0")}` : `${String(projects.length).padStart(2, "0")} projects`}</span>
          <button onClick={() => step(1)} aria-label="Next project">→</button>
        </div>
        <div className="gallery-utilities">
          <button onClick={() => setPaused(value => !value)} aria-pressed={paused || reducedMotion} aria-label={paused ? "Resume ambient motion" : "Pause ambient motion"} disabled={reducedMotion || isIndex}>{paused || reducedMotion ? "▷" : "Ⅱ"}</button>
          <button onClick={toggleFullscreen} aria-label={fullscreen ? "Exit full screen" : "Enter full screen"}>{fullscreen ? "↙" : "⛶"}</button>
        </div>
      </div>
      {fullscreenError && <p className="gallery-fullscreen-error" role="status">{fullscreenError}</p>}
      <p className="gallery-announcement" aria-live="polite">{focused ? `${focused.title}. ${focused.description}. Project ${selected + 1} of ${projects.length}.` : "Gallery overview. Nine projects to explore."}</p>
    </section>
  );
}
