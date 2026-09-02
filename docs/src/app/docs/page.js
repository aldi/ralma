import Link from 'next/link';
import { docsSections, docsSectionVisuals } from '@/data/ralmaCatalog';

export const metadata = {
  title: 'Documentation - Ralma',
};

const cardTones = ['is-warning', 'is-success', 'is-info', 'is-danger', 'is-warning'];
const essentialSectionHrefs = new Set(['/docs/getting-started', '/docs/components']);

function dedupeSectionsByHref(sections) {
  return sections.filter(
    (section, index) =>
      sections.findIndex((candidate) => candidate.href === section.href) === index,
  );
}

export default function DocsIndexPage() {
  const uniqueSections = dedupeSectionsByHref(docsSections);
  const essentials = uniqueSections.filter((section) => essentialSectionHrefs.has(section.href));
  const references = uniqueSections.filter((section) => !essentialSectionHrefs.has(section.href));
  const mergedSections = [...essentials, ...references];

  return (
    <>
      <section className="docs-hero">
        <div className="floating-icons">
          {docsSectionVisuals.map((item, index) => {
            const cols = 3;
            const row = Math.floor(index / cols);
            const col = index % cols;
            const top = 18 + row * 26 + (col % 2) * 6;
            const left = 14 + col * 28 + (row % 2) * 8;
            const delay = (index * 0.08) % 2;

            return (
              <i
                key={item.code}
                className={`floating-icon fa-solid ${item.icon}`}
                style={{
                  color: item.hsl,
                  top: `${top}%`,
                  left: `${left}%`,
                  animationDelay: `${delay}s`,
                }}
              ></i>
            );
          })}
        </div>
        <div className="docs-hero-content">
          <h1 className="docs-hero-title">Documentation</h1>
          <p className="docs-hero-subtitle">
            Install Ralma, register the component set, and use Bulma-style tags in Ractive
            templates.
          </p>
        </div>
      </section>

      <section className="docs-section">
        <div className="docs-container">
          <div className="columns is-variable is-6 py-6">
            <div className="column is-10-desktop">
              <h2 className="title is-3 mb-2">Guides</h2>
              <p className="subtitle is-5 mb-0">
                Start with setup, then jump into component examples or the registration API.
              </p>
            </div>
          </div>

          <div className="columns is-multiline pb-6">
            {mergedSections.map((section, index) => (
              <div key={section.href} className="column is-one-third">
                <Link className="glass-card is-fullheight" href={section.href}>
                  <div className={`glass-card-icon ${cardTones[index % cardTones.length]}`}>
                    <i className={`fa-solid ${section.icon}`}></i>
                  </div>
                  <h2 className="glass-card-title">
                    {section.title}
                    <span className="arrow">→</span>
                  </h2>
                  <p className="glass-card-description">{section.description}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
