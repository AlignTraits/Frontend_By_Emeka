import { useEffect } from 'react';

interface DocumentMeta {
  title: string;
  description: string;
}

/**
 * Sets the page title and meta description for this route and puts the previous values
 * back on unmount, so other routes in the app are unaffected.
 */
export function useDocumentMeta({ title, description }: DocumentMeta): void {
  useEffect(() => {
    const previousTitle = document.title;
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = tag?.getAttribute('content') ?? null;
    let created = false;

    if (!tag) {
      tag = document.createElement('meta');
      tag.name = 'description';
      document.head.appendChild(tag);
      created = true;
    }

    document.title = title;
    tag.setAttribute('content', description);

    return () => {
      document.title = previousTitle;
      if (created) {
        tag.remove();
      } else if (previousDescription !== null) {
        tag.setAttribute('content', previousDescription);
      }
    };
  }, [title, description]);
}
