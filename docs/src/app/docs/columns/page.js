import Hero from '@/components/Hero';
import Breadcrumb from '@/components/Breadcrumb';
import CodeBlock from '@/components/CodeBlock';
import { snippets } from '@/data/ralmaCatalog';

export const metadata = {
  title: 'Columns - Ralma Docs',
};

export default function ColumnsPage() {
  const breadcrumbItems = [
    { label: 'Ralma', href: '/' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Columns', active: true },
  ];

  return (
    <>
      <Hero title="Columns" subtitle="Responsive layout primitives mapped to Bulma columns" />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Breadcrumb items={breadcrumbItems} />

              <div className="content my-4">
                <p className="subtitle is-5">
                  Use <code>columns</code> and <code>column</code> tags to build responsive
                  two-column and multi-column layouts.
                </p>
              </div>

              <CodeBlock language="html">{snippets.columns}</CodeBlock>

              <hr />

              <div className="content mt-5">
                <h2 className="title is-4">Common Patterns</h2>
                <ul className="subtitle is-6">
                  <li>
                    Fractional widths: <code>half</code>, <code>one-third</code>,{' '}
                    <code>two-thirds</code>
                  </li>
                  <li>
                    Numeric widths: <code>6</code>, <code>offset-3</code>
                  </li>
                  <li>
                    Responsive suffixes: <code>half-mobile</code>, <code>one-third-desktop</code>
                  </li>
                  <li>
                    Container-level variants: <code>multiline</code>, <code>gapless</code>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
