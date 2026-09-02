import Link from 'next/link';
import Hero from '@/components/Hero';
import Breadcrumb from '@/components/Breadcrumb';
import CodeBlock from '@/components/CodeBlock';
import { componentGroups, snippets, supportedComponentPages } from '@/data/ralmaCatalog';

export const metadata = {
  title: 'Components - Ralma Docs',
};

export default function ComponentsPage() {
  const tileTones = ['is-warning', 'is-success', 'is-info', 'is-danger', 'is-warning'];
  const breadcrumbItems = [
    { label: 'Ralma', href: '/' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Components', active: true },
  ];

  return (
    <>
      <Hero title="Components" subtitle="Examples for the supported Bulma component wrappers" />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Breadcrumb items={breadcrumbItems} />

              <div className="content my-4">
                <p className="subtitle is-5">
                  Ralma components follow Bulma&apos;s markup structure while letting you write
                  named tags in Ractive templates.
                </p>
              </div>

              <CodeBlock language="html">{snippets.componentsExample}</CodeBlock>

              <div className="content mt-6">
                <h2 className="title is-4">Examples</h2>
                <p className="subtitle is-6">
                  Open a component family for supported tags, common modifiers, and sample markup.
                </p>
              </div>

              <div className="columns is-multiline mb-6">
                {supportedComponentPages.map((entry, index) => (
                  <div key={entry.slug} className="column is-half">
                    <Link
                      className="glass-card is-fullheight component-index-tile"
                      href={entry.href}
                    >
                      <div className={`glass-card-icon ${tileTones[index % tileTones.length]}`}>
                        <i className={`fa-solid ${entry.icon}`}></i>
                      </div>
                      <p className="bulma-support-group">{entry.sectionTitle}</p>
                      <h3 className="glass-card-title">
                        {entry.title}
                        <span className="arrow">→</span>
                      </h3>
                      <p className="glass-card-description">{entry.summary}</p>
                    </Link>
                  </div>
                ))}
              </div>

              {componentGroups.map((group) => (
                <article key={group.id} id={`group-${group.id}`} className="docs-tag-section mt-5">
                  <h2 className="title is-4">{group.title}</h2>
                  <p className="subtitle is-6">{group.description}</p>
                  <div className="tags">
                    {group.items.map((name) => (
                      <span key={name} className="tag is-rounded is-light is-medium">
                        {`<${name}>`}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
