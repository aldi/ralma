import Link from 'next/link';
import InstallCommand from '@/components/InstallCommand';
import { allComponentNames, componentGroups, docsVisuals } from '@/data/ralmaCatalog';

const INSTALL_COMMAND = 'npm install @aldi/ralma';

function getOrbitPosition(index, total, radius, offsetAngle = 0) {
  const angle = (index / total) * 2 * Math.PI + offsetAngle - Math.PI / 2;
  const x = Math.round((Math.cos(angle) * radius + 50) * 100) / 100;
  const y = Math.round((Math.sin(angle) * radius + 50) * 100) / 100;
  return { x, y };
}

export default function HomePage() {
  const version = process.env.RALMA_VERSION || 'dev';
  const totalVisuals = docsVisuals.length;
  const orbit1Count = Math.floor(totalVisuals * 0.5);
  const orbit2Count = Math.floor(totalVisuals * 0.3);

  const orbits = [
    {
      items: docsVisuals.slice(0, orbit1Count),
      className: 'social-orbit',
    },
    {
      items: docsVisuals.slice(orbit1Count, orbit1Count + orbit2Count),
      className: 'social-orbit orbit-2',
    },
    {
      items: docsVisuals.slice(orbit1Count + orbit2Count),
      className: 'social-orbit orbit-3',
    },
  ];

  const renderOrbit = (items, orbitClassName) => (
    <div className={orbitClassName} key={orbitClassName}>
      {items.map((item, i) => {
        const pos = getOrbitPosition(i, items.length, 50);
        return (
          <Link
            key={item.code}
            href={item.href}
            className="button orbit-icon"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: item.hsl,
              borderColor: item.hsl,
              color: '#ffffff',
            }}
            title={item.name}
          >
            <span className="icon">
              <i className={`fa-solid ${item.icon}`}></i>
            </span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      <section className="home-hero">
        <div className="hero-orbs">
          <div className="hero-orb"></div>
          <div className="hero-orb"></div>
          <div className="hero-orb"></div>
          <div className="hero-orb"></div>
        </div>

        <div className="home-hero-center">
          {orbits.map((orbit) => renderOrbit(orbit.items, orbit.className))}

          <div className="home-hero-content">
            <h1 className="home-hero-title">
              <span className="gradient-text">Ralma Components</span> <br />
              <span className="subtitle-text">for Bulma</span>{' '}
              <sup className="version-badge">v{version}</sup>
            </h1>

            <p className="home-hero-subtitle">
              Stateless wrappers for Bulma widgets with safe rendering and predictable registration.
            </p>

            <div className="home-cta-group">
              <Link href="/docs/getting-started" className="home-cta is-primary">
                <i className="fa-solid fa-rocket"></i>
                <span>Get Started</span>
              </Link>
              <Link href="/docs" className="home-cta is-info">
                <i className="fa-solid fa-book"></i>
                <span>Documentation</span>
              </Link>
              <a
                href="https://github.com/aldi/ralma"
                className="home-cta is-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-github"></i>
                <span>GitHub</span>
              </a>
            </div>

            <InstallCommand command={INSTALL_COMMAND} />
            <p className="is-size-7 has-text-grey mt-3">
              Requires{' '}
              <a href="https://bulma.io/" target="_blank" rel="noopener noreferrer">
                Bulma
              </a>{' '}
              <code>&gt;= 1.0.0</code>, Ractive <code>&gt;= 1.4.4</code>, and Node{' '}
              <code>&gt;= 22</code>
            </p>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="home-features-header">
          <h2 className="home-features-title">Why Use Ralma</h2>
          <p className="home-features-subtitle">
            Keep Bulma&apos;s classes and layout rules, but write them as reusable Ractive
            components.
          </p>
        </div>

        <div className="home-features-grid">
          <div className="feature-card">
            <div className="feature-card-icon is-blue">
              <i className="fa-solid fa-cubes"></i>
            </div>
            <h3 className="feature-card-title">{allComponentNames.length} Components</h3>
            <p className="feature-card-description">
              Register the supported tag set once and use it across Ractive templates.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card-icon is-pink">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <h3 className="feature-card-title">{componentGroups.length} Groups</h3>
            <p className="feature-card-description">
              Components are grouped by the same sections developers already know from Bulma.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card-icon is-purple">
              <i className="fa-solid fa-rotate"></i>
            </div>
            <h3 className="feature-card-title">Idempotent Registration</h3>
            <p className="feature-card-description">
              Re-run <code>registerRalma()</code> without replacing matching component definitions.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card-icon is-green">
              <i className="fa-solid fa-shield"></i>
            </div>
            <h3 className="feature-card-title">Safe Link Handling</h3>
            <p className="feature-card-description">
              Link-capable components reject unsafe URL schemes before rendering anchors.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card-icon is-orange">
              <i className="fa-solid fa-code"></i>
            </div>
            <h3 className="feature-card-title">ESM + Browser Bundle</h3>
            <p className="feature-card-description">
              Import from npm or load the prebuilt browser bundle on static pages.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card-icon is-cyan">
              <i className="fa-solid fa-feather-pointed"></i>
            </div>
            <h3 className="feature-card-title">Zero Runtime Dependencies</h3>
            <p className="feature-card-description">
              Ralma adds component definitions without adding another runtime dependency chain.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
