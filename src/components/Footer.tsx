export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-obsidian">
      <div className="gold-line absolute inset-x-0 top-0 opacity-60" />
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/40 bg-gradient-to-br from-charcoal-3 to-obsidian font-display text-lg font-bold text-gold">
                A
              </span>
              <div className="leading-tight">
                <p className="font-display text-base font-semibold text-ivory">Agarwal Classes</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-ash">for Social Science</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist/60">
              A specialist Social Science &amp; Humanities institute in Mathura, U.P. — led by Ghanshyam
              Agarwal with 9+ years of academic excellence across CBSE and State Board.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm text-mist/70">
              {[
                ["Overview", "#overview"],
                ["Classes", "#classes"],
                ["Why Choose Us", "#why"],
                ["Results", "#results"],
                ["Contact", "#contact"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="transition hover:text-gold">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Subjects</p>
            <ul className="mt-4 space-y-2.5 text-sm text-mist/70">
              <li>History</li>
              <li>Geography</li>
              <li>Civics / Pol. Science</li>
              <li>Economics</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Visit</p>
            <p className="mt-4 text-sm leading-relaxed text-mist/70">
              Near Holi Gate, Mathura – 281001
              <br />
              Uttar Pradesh, India
            </p>
            <p className="mt-3 text-sm text-mist/70">
              Mon – Sat · 7:00 AM – 8:00 PM
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/5 pt-6 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Agarwal Classes for Social Science. All rights reserved.</p>
          <p>
            Crafted with <span className="text-gold">◆</span> in Mathura
          </p>
        </div>
      </div>
    </footer>
  );
}
