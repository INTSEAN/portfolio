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
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("in-immersive");
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = event => setReducedMotion(event.matches);
    const onFullscreen = () => setFullscreen(Boolean(document.fullscreenElement));
    media.addEventListener("change", onMotion);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.classList.remove("in-immersive");
      media.removeEventListener("change", onMotion);
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, []);

  useEffect(() => {
    if (isIndex) return;
    let scene;
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
      else await document.documentElement.requestFullscreen();
    } catch { setFullscreenError("Fullscreen isn’t available in this browser."); }
  };

  return (
    <main ref={root} className={`immersive ${focused ? "has-focus" : ""} ${isIndex ? "index-view" : ""}`} id="immersive" onKeyDown={onKeys} aria-label="Immersive project gallery">
      <div className="gallery-atmosphere" aria-hidden="true" />
      <header className="gallery-intro">
        <div className="gallery-eyebrow"><span /> A SPACE FOR IDEAS</div>
        <h1>{focused ? focused.title : <>A different<br /><em>perspective.</em></>}</h1>
        <p>{focused ? focused.description.replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, "").trim() : "A collection of things I’ve imagined, designed, and built."}</p>
      </header>
      <div className="gallery-coordinate" aria-hidden="true"><span>SEAN DONOVAN</span><span>PHILADELPHIA · EARTH</span><span className="gallery-coordinate-line" /><span>40° N / 75° W</span></div>

      {!isIndex && <div ref={host} className="gallery-canvas" aria-label="Drag to look around the spatial gallery. Use the project index or arrow controls to select a project." />}
      {!ready && !isIndex && <div className="gallery-preparing" role="status">Assembling your surroundings<span /></div>}
      {isIndex && (
        <section className="gallery-index" aria-label="Project index">
          {unavailable && <p className="gallery-fallback-note">Explore the same collection in the project index.</p>}
          {projects.map((project, index) => (
            <button className={`index-card ${selected === index ? "selected" : ""}`} key={project.title} onClick={() => setSelected(index)} aria-label={`Explore ${project.title}`}>
              <div className="index-card-image"><img src={project.imgUrl} alt={`${project.title} website preview`} loading="lazy" /></div>
              <div><span>{formatNumber(index)} / {project.date}</span><h2>{project.title}</h2><span aria-hidden="true">↗</span></div>
            </button>
          ))}
        </section>
      )}

      <div className="gallery-side-note" aria-hidden="true">INDEPENDENT MIND. SHARED POSSIBILITIES.</div>
      <div className="gallery-floormark" aria-hidden="true">THOUGHTFULLY BUILT.<br /><span>OPEN TO WHAT’S NEXT.</span></div>

      {focused && (
        <section className="gallery-project-detail" aria-labelledby="focused-project-title">
          <div className="detail-topline"><span>PROJECT {formatNumber(selected)} / 09</span><button ref={closeButton} onClick={reset} aria-label="Close project details">×</button></div>
          <h2 id="focused-project-title">{focused.title}</h2>
          <p>{focused.description}</p>
          <div className="detail-technologies">{focused.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
          <a href={focused.link} target="_blank" rel="noopener noreferrer">{focused.link.includes("github.com") ? "View repository" : "Visit project"}<span aria-hidden="true">↗</span></a>
        </section>
      )}
      <p className="gallery-announcement" aria-live="polite">{focused ? `${focused.title}. ${focused.description}. Project ${selected + 1} of ${projects.length}.` : "Gallery overview. Nine projects to explore."}</p>

      <div className="gallery-controls" role="group" aria-label="Gallery controls">
        <div className="gallery-count"><span className="live-dot" />SELECTED WORK <span className="gallery-count-divider">/</span> {focused ? formatNumber(selected) : "09"}<span className="gallery-count-sub">{focused ? "OF 09 PROJECTS" : "PROJECTS & EXPLORATIONS"}</span></div>
        <div className="gallery-control-center">
          <div className="gallery-view-switch" role="group" aria-label="Gallery view">
            <button ref={overviewButton} className={!isIndex ? "active" : ""} aria-pressed={!isIndex} disabled={unavailable} onClick={() => { setView("space"); setSelected(null); }}>◈ <span>Explore</span></button>
            <button ref={indexButton} className={isIndex ? "active" : ""} aria-pressed={isIndex} onClick={() => { setView("index"); setSelected(null); }}>☷ <span>Index</span></button>
          </div>
          <div className="gallery-step-controls"><button onClick={() => step(-1)} aria-label="Previous project">←</button><span>{focused ? `${formatNumber(selected)} / 09` : "DRAG TO EXPLORE"}</span><button onClick={() => step(1)} aria-label="Next project">→</button></div>
        </div>
        <div className="gallery-utilities">
          <button className="gallery-motion" onClick={() => setPaused(value => !value)} aria-pressed={paused || reducedMotion} aria-label={paused ? "Resume ambient motion" : "Pause ambient motion"} disabled={reducedMotion || isIndex}>{paused || reducedMotion ? "▷" : "Ⅱ"}</button>
          <button onClick={toggleFullscreen} aria-label={fullscreen ? "Exit full screen" : "Enter full screen"} className="gallery-fullscreen">{fullscreen ? "↙" : "⛶"}</button>
          <a href="#projects" className="gallery-exit" aria-label="Return to classic portfolio">Exit <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      {fullscreenError && <p className="gallery-fullscreen-error" role="status">{fullscreenError}</p>}
      <div className="gallery-keyboard-help">← → TO DISCOVER <span>·</span> ESC TO STEP BACK</div>
    </main>
  );
}
