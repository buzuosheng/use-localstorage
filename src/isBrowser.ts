const isBrowser: boolean = typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement === 'function';

export default isBrowser;