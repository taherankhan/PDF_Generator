import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { usePageData } from './PageData';

const MetaHead: FC = () => {
  const { pageTitle, pageDescription } = usePageData();

  return (
    <Helmet>
      <title>{pageTitle ? `${pageTitle} | Markdown to PDF Generator` : 'Markdown to PDF Generator'}</title>
      {pageDescription && <meta name="description" content={pageDescription} />}
    </Helmet>
  );
};

export { MetaHead };

