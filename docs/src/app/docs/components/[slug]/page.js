import Link from 'next/link';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import Breadcrumb from '@/components/Breadcrumb';
import CodeBlock from '@/components/CodeBlock';
import { supportedComponentBySlug, supportedComponentPages } from '@/data/ralmaCatalog';

export function generateStaticParams() {
  return supportedComponentPages.map((component) => ({
    slug: component.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const component = supportedComponentBySlug[slug];

  return {
    title: component ? `${component.title} - Ralma Docs` : 'Component - Ralma Docs',
  };
}

export default async function ComponentDetailsPage({ params }) {
  const { slug } = await params;
  const component = supportedComponentBySlug[slug];
  if (!component) notFound();

  const breadcrumbItems = [
    { label: 'Ralma', href: '/' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Components', href: '/docs/components' },
    { label: component.title, active: true },
  ];

  const relatedComponents = supportedComponentPages.filter(
    (entry) => entry.sectionId === component.sectionId && entry.slug !== component.slug,
  );

  return (
    <>
      <Hero title={component.title} subtitle={component.summary} />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Breadcrumb items={breadcrumbItems} />

              <div className="message is-info mt-4">
                <div className="message-header">Bulma Pattern</div>
                <div className="message-body">
                  <p>
                    This wrapper follows Bulma&apos;s <strong>{component.sectionTitle}</strong>{' '}
                    markup. Compare class behavior with{' '}
                    <a href={component.bulmaHref} target="_blank" rel="noreferrer">
                      the official Bulma docs
                    </a>
                    .
                  </p>
                </div>
              </div>

              <article className="content mt-5">
                <h2 className="title is-4">Supported tags</h2>
                <div className="tags">
                  {component.tags.map((tag) => (
                    <span key={tag} className="tag is-rounded is-medium is-light">
                      {`<${tag}>`}
                    </span>
                  ))}
                </div>
              </article>

              <article className="content mt-5">
                <h2 className="title is-4">Example</h2>
                <CodeBlock language="html">{component.snippet}</CodeBlock>
              </article>

              {component.highlights.length > 0 ? (
                <article className="content mt-5">
                  <h2 className="title is-4">Usage Notes</h2>
                  <ul className="subtitle is-6">
                    {component.highlights.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </article>
              ) : null}

              {relatedComponents.length > 0 ? (
                <article className="docs-related-card mt-5">
                  <p className="title is-5">More in {component.sectionTitle}</p>
                  <div className="tags">
                    {relatedComponents.map((entry) => (
                      <Link
                        key={entry.slug}
                        className="tag is-rounded is-link is-light"
                        href={entry.href}
                      >
                        {entry.title}
                      </Link>
                    ))}
                  </div>
                </article>
              ) : null}

              <div className="mt-5">
                <Link className="button is-link is-light is-outlined" href="/docs/components">
                  <span className="icon">
                    <i className="fa-solid fa-arrow-left"></i>
                  </span>
                  <span>Back to Components</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
