export function writeClipboardText(text) {
  if (!navigator.clipboard?.writeText) {
    return Promise.reject(new Error('Clipboard API is unavailable'));
  }

  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Clipboard write timed out'));
    }, 1500);

    navigator.clipboard.writeText(text).then(
      () => {
        clearTimeout(timeoutId);
        resolve();
      },
      (error) => {
        clearTimeout(timeoutId);
        reject(error);
      },
    );
  });
}
