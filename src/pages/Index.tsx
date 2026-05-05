import { useEffect, useState } from "react";
import logo from "@/assets/global-ghosts-logo.png";
import heroBg from "@/assets/hero-bg.jpg";

const LAUNCH = new Date();
LAUNCH.setDate(LAUNCH.getDate() + 30);

const useCountdown = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, LAUNCH.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
};

const Cell = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="min-w-[70px] sm:min-w-[96px] rounded-md border border-foreground/15 bg-foreground/5 backdrop-blur-sm px-3 py-3 sm:px-5 sm:py-4 text-3xl sm:text-5xl font-mono font-bold tracking-tight text-foreground tabular-nums shadow-[0_0_30px_rgba(0,0,0,0.6)]">
      {String(value).padStart(2, "0")}
    </div>
    <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-foreground/60">{label}</span>
  </div>
);

const Index = () => {
  const { d, h, m, s } = useCountdown();

  useEffect(() => {
    document.title = "Global Ghosts — DayZ Server | Coming Soon";
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background */}
      <img
        src={heroBg}
        alt="Foggy forest with abandoned watchtower at dusk"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_50%_120%,transparent_30%,hsl(var(--background))_70%)]" />
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 py-10">
        <header className="w-full max-w-6xl flex items-center justify-between text-xs uppercase tracking-[0.3em] text-foreground/60">
          <span>EST. 2026</span>
          <span className="hidden sm:inline">Chernarus · Livonia</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--blood))] animate-pulse" />
            Status: Building
          </span>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <img
            src={logo}
            alt="Global Ghosts DayZ Server logo"
            className="w-[min(90vw,640px)] drop-shadow-[0_8px_30px_rgba(0,0,0,0.8)] [filter:invert(1)_brightness(1.1)]"
          />

          <h1 className="sr-only">Global Ghosts DayZ Server — Coming Soon</h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-foreground/70">
            The site is still in the woods. Our website is being assembled — gear up, the server is almost live.
          </p>

          <div className="mt-10 flex items-center gap-3 sm:gap-5">
            <Cell value={d} label="Days" />
            <span className="text-3xl sm:text-5xl text-foreground/30 font-mono">:</span>
            <Cell value={h} label="Hours" />
            <span className="text-3xl sm:text-5xl text-foreground/30 font-mono">:</span>
            <Cell value={m} label="Min" />
            <span className="text-3xl sm:text-5xl text-foreground/30 font-mono">:</span>
            <Cell value={s} label="Sec" />
          </div>

          <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-foreground/20 bg-foreground/5 px-5 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--ember))] animate-pulse" />
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-foreground/80">
              Stay tuned — survivors wanted
            </span>
          </div>
        </div>

        <footer className="w-full max-w-6xl flex items-center justify-between text-xs uppercase tracking-[0.3em] text-foreground/50">
          <span>© Global Ghosts</span>
          <span>DayZ Community Server</span>
        </footer>
      </section>
    </main>
  );
};

export default Index;
