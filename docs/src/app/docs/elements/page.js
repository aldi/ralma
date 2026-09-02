import Hero from '@/components/Hero';
import Breadcrumb from '@/components/Breadcrumb';
import CodeBlock from '@/components/CodeBlock';
import { snippets } from '@/data/ralmaCatalog';

export const metadata = {
  title: 'Elements - Ralma Docs',
};

export default function ElementsPage() {
  const breadcrumbItems = [
    { label: 'Ralma', href: '/' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Elements', active: true },
  ];

  return (
    <>
      <Hero title="Elements" subtitle="Button and content helpers for Ractive templates" />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Breadcrumb items={breadcrumbItems} />

              <div className="message is-info mt-4">
                <div className="message-header">Available Elements</div>
                <div className="message-body">
                  <p>
                    Use <code>button</code> for Bulma actions and <code>content</code> for rich text
                    blocks.
                  </p>
                </div>
              </div>

              <article className="content mt-5">
                <h2 className="title is-4">button</h2>
                <p className="subtitle is-6">
                  Renders a button by default. If <code>href</code> passes safety checks, it renders
                  as an anchor element.
                </p>
                <CodeBlock language="html">{snippets.button}</CodeBlock>
              </article>

              <hr />

              <article className="content mt-5">
                <h2 className="title is-4">content</h2>
                <p className="subtitle is-6">
                  Wrap semantic HTML in Bulma&apos;s content styling for CMS output and markdown
                  blocks.
                </p>
                <CodeBlock language="html">{snippets.content}</CodeBlock>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
