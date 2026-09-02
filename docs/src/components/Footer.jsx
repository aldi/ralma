export default function Footer() {
  return (
    <div className="footer has-text-centered">
      <p>
        Maintained by{' '}
        <a href="https://github.com/aldi" target="_blank" rel="noopener noreferrer">
          aldi
        </a>
      </p>
      <p>
        The source code is licensed under{' '}
        <a
          href="https://opensource.org/licenses/mit-license.php"
          target="_blank"
          rel="noopener noreferrer"
        >
          MIT
        </a>
        .
      </p>
      <p>
        Available on{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/aldi/ralma">
          GitHub
        </a>{' '}
        and{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://www.npmjs.com/package/ralma">
          npm
        </a>
        .
      </p>
    </div>
  );
}
