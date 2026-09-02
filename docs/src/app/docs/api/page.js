import Hero from '@/components/Hero';
import Breadcrumb from '@/components/Breadcrumb';
import CodeBlock from '@/components/CodeBlock';
import { snippets } from '@/data/ralmaCatalog';

export const metadata = {
  title: 'API - Ralma Docs',
};

export default function ApiPage() {
  const breadcrumbItems = [
    { label: 'Ralma', href: '/' },
    { label: 'Documentation', href: '/docs' },
    { label: 'API', active: true },
  ];

  return (
    <>
      <Hero title="API" subtitle="Register components and control name collisions" />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Breadcrumb items={breadcrumbItems} />

              <div className="message is-warning mt-4">
                <div className="message-header">Exports</div>
                <div className="message-body">
                  <p>
                    Import <code>registerRalma</code> to install the components. Import{' '}
                    <code>componentNames</code> when you need the complete tag list.
                  </p>
                </div>
              </div>

              <article className="content mt-5">
                <h2 className="title is-4">registerRalma(Ractive, options?)</h2>
                <p className="subtitle is-6">
                  Adds Ralma&apos;s component constructors to <code>Ractive.components</code>.
                  Re-running registration leaves existing matching components in place.
                </p>
                <CodeBlock language="javascript">{snippets.registerOptions}</CodeBlock>
              </article>

              <hr />

              <article className="content mt-5">
                <h2 className="title is-4">Options</h2>
                <ul className="subtitle is-6">
                  <li>
                    <code>overwrite</code>: replace existing component names when <code>true</code>
                  </li>
                  <li>
                    <code>warnOnCollision</code>: log warnings when a name is already registered
                  </li>
                </ul>
              </article>

              <article className="content mt-5">
                <h2 className="title is-4">Link Safety</h2>
                <p className="subtitle is-6">
                  Link-capable components reject unsafe schemes such as <code>javascript:</code>,{' '}
                  <code>data:</code>, and <code>vbscript:</code>. Components that can render as
                  buttons use button mode instead.
                </p>
              </article>

              <article className="content mt-5">
                <h2 className="title is-4">componentNames</h2>
                <p className="subtitle is-6">
                  Use the exported list to render component indexes, validate templates, or assert
                  that registration completed.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
