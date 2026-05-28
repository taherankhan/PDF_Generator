import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LEGAL_LAST_UPDATED, LEGAL_SITE_NAME } from './legalMeta';
import './LegalPages.css';

type Props = {
  title: string;
  children: ReactNode;
};

const LegalLayout: FC<Props> = ({ title, children }) => (
  <div className="legal-page">
    <div className="legal-page-inner">
      <Link to="/" className="legal-back">
        <i className="bi bi-arrow-left" aria-hidden="true" />
        Back to {LEGAL_SITE_NAME}
      </Link>
      <h1>{title}</h1>
      <p className="legal-updated">Last updated: {LEGAL_LAST_UPDATED}</p>
      {children}
      <nav className="legal-footer-links" aria-label="Legal">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/">Home</Link>
      </nav>
    </div>
  </div>
);

export default LegalLayout;
