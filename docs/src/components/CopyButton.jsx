'use client';

import { useEffect, useRef, useState } from 'react';
import { writeClipboardText } from './clipboard';

export default function CopyButton({ code }) {
  const [status, setStatus] = useState('idle');
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async (e) => {
    const target = e.currentTarget;
    const figure = target.closest('figure');
    const codeElement = figure?.querySelector('code');

    if (codeElement) {
      const range = document.createRange();
      range.selectNodeContents(codeElement);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }

    try {
      await writeClipboardText(code);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setStatus('idle'), 2000);
  };

  const label = status === 'copied' ? 'Copied!' : status === 'failed' ? 'Failed' : 'Copy';
  const title =
    status === 'copied' ? 'Copied!' : status === 'failed' ? 'Copy failed' : 'Copy to clipboard';

  return (
    <button className="button is-small bd-copy" onClick={handleCopy} title={title}>
      {label}
    </button>
  );
}
