import { useEffect } from 'react';

const SITE = 'CertFarmer';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : SITE;
    return () => { document.title = SITE; };
  }, [title]);
}
