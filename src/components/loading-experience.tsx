"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

type LoaderStage = "idle" | "revealing" | "exiting" | "done";

const defaultGrid = {
  columns: 6,
  rows: 5,
};

function getMosaicGrid() {
  const isMobile = window.matchMedia("(max-width: 640px)").matches;
  const targetTileSize = isMobile ? 100 : 150;

  return {
    columns: Math.max(4, Math.ceil(window.innerWidth / targetTileSize)),
    rows: Math.max(4, Math.ceil(window.innerHeight / targetTileSize)),
  };
}

export function LoadingExperience() {
  const [stage, setStage] = useState<LoaderStage>("idle");
  const [grid, setGrid] = useState(defaultGrid);

  const tiles = useMemo(
    () =>
      Array.from({ length: grid.columns * grid.rows }, (_, index) => {
        const row = Math.floor(index / grid.columns);
        const column = index % grid.columns;
        const centerColumn = (grid.columns - 1) / 2;
        const distanceFromCenter = Math.abs(column - centerColumn);

        return {
          id: index,
          style: {
            "--tile-delay": `${row * 55 + distanceFromCenter * 36}ms`,
            "--tile-exit-x": column < centerColumn ? "-120vw" : "120vw",
          } as CSSProperties,
        };
      }),
    [grid],
  );

  useEffect(() => {
    const updateGrid = () => setGrid(getMosaicGrid());

    updateGrid();
    window.addEventListener("resize", updateGrid);

    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  useEffect(() => {
    if (stage === "done") {
      return undefined;
    }

    document.body.classList.add("loader-active");

    return () => {
      document.body.classList.remove("loader-active");
    };
  }, [stage]);

  useEffect(() => {
    if (stage !== "revealing") {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      const reducedTimer = window.setTimeout(() => setStage("done"), 650);
      return () => window.clearTimeout(reducedTimer);
    }

    const exitTimer = window.setTimeout(() => setStage("exiting"), 1650);
    return () => window.clearTimeout(exitTimer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "exiting") {
      return undefined;
    }

    const doneTimer = window.setTimeout(() => setStage("done"), 1500);
    return () => window.clearTimeout(doneTimer);
  }, [stage]);

  if (stage === "done") {
    return null;
  }

  return (
    <div className={`loading-experience is-${stage}`} aria-live="polite">
      <div
        className="loader-mosaic"
        aria-hidden="true"
        style={
          {
            "--mosaic-columns": grid.columns,
            "--mosaic-rows": grid.rows,
          } as CSSProperties
        }
      >
        {tiles.map((tile) => (
          <span className="loader-tile" key={tile.id} style={tile.style} />
        ))}
      </div>

      <div className="loader-content">
        <button
          className="loader-enter"
          onClick={() => setStage("revealing")}
          type="button"
        >
          enter
        </button>

        <div className="loader-brand" aria-hidden={stage === "idle"}>
          <p>El Yeipi</p>
          <span>producer, filmmaker, memory maker</span>
        </div>
      </div>
    </div>
  );
}
