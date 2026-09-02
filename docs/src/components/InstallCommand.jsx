'use client';

import { useEffect, useRef, useState } from 'react';
import { writeClipboardText } from './clipboard';

export default function InstallCommand({ command }) {
  const [status, setStatus] = useState('idle');
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await writeClipboardText(command);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setStatus('idle');
    }, 2000);
  };

  const iconClass =
    status === 'copied'
      ? 'fa-solid fa-check'
      : status === 'failed'
        ? 'fa-solid fa-triangle-exclamation'
        : 'fa-solid fa-copy';
  const ariaLabel = status === 'failed' ? 'Copy failed' : 'Copy install command';

  return (
    <div className="home-install-box">
      <code>{command}</code>
      <button className="copy-btn" onClick={handleCopy} aria-label={ariaLabel}>
        <i className={iconClass}></i>
      </button>
    </div>
  );
}
