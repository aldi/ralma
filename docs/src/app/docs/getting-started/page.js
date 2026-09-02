import Link from 'next/link';
import Hero from '@/components/Hero';
import Breadcrumb from '@/components/Breadcrumb';
import CodeBlock from '@/components/CodeBlock';
import { snippets } from '@/data/ralmaCatalog';

export const metadata = {
  title: 'Getting Started - Ralma Docs',
};

export default function GettingStartedPage() {
  const breadcrumbItems = [
    { label: 'Ralma', href: '/' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Getting Started', active: true },
  ];

  return (
    <>
      <Hero title="Getting Started" subtitle="Install Ralma and register the component tags" />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Breadcrumb items={breadcrumbItems} />
              <p className="subtitle is-5 my-4">
                Ralma expects Bulma CSS and a Ractive application.
              </p>

              <div className="message is-warning">
                <div className="message-header">Requirements</div>
                <div className="message-body">
                  <p>
                    Load{' '}
                    <a href="https://bulma.io/" target="_blank" rel="noopener noreferrer">
                      Bulma
                    </a>{' '}
                    <code>&gt;= 1.0.0</code> and Ractive <code>&gt;= 1.4.4</code> before rendering
                    components. Use Node <code>&gt;= 22</code> for package-based projects.
                  </p>
                </div>
              </div>

              <article className="media is-large">
                <div className="media-left">
                  <p className="title is-5">1</p>
                </div>
                <div className="media-content">
                  <p className="title is-5">Install the package:</p>
                  <div className="highlight-full header-code">
                    <CodeBlock language="bash">{snippets.install}</CodeBlock>
                  </div>
                </div>
              </article>

              <article className="media is-large">
                <div className="media-left">
                  <p className="title is-5">2</p>
                </div>
                <div className="media-content">
                  <p className="title is-5">Register all components once:</p>
                  <CodeBlock language="javascript">{snippets.esm}</CodeBlock>
                </div>
              </article>

              <article className="media is-large">
                <div className="media-left">
                  <p className="title is-5">3</p>
                </div>
                <div className="media-content">
                  <p className="title is-5">Or load the browser bundle in static pages:</p>
                  <CodeBlock language="html">{snippets.browserHeader}</CodeBlock>
                </div>
              </article>

              <hr className="hr mb-0" />

              <p className="title is-3 pt-5">First Component</p>
              <p className="subtitle is-5">Use registered tags directly in a Ractive template:</p>
              <div className="bd-snippet highlight-full header-code">
                <CodeBlock language="html">{snippets.button}</CodeBlock>
              </div>

              <hr />

              <div className="column">
                <p className="title is-4">Browse Component Examples</p>
                <p className="subtitle is-5">See the supported tags grouped by Bulma section.</p>
                <Link className="button is-link is-outlined is-light mt-2" href="/docs/components">
                  <span>Explore Components</span>
                  <span className="icon">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
