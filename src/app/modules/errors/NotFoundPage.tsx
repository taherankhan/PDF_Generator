import { FC } from 'react';
import { Link } from 'react-router-dom';
import './ErrorsPage.css';

const NotFoundPage: FC = () => (
  <div className="app-error-page">
    <div className="app-error-card">
      <p className="app-error-code">404</p>
      <h1>Page not found</h1>
      <p className="app-error-desc">
        The URL you requested does not exist on MD2PDFX.
      </p>
      <div className="app-error-actions">
        <Link to="/" className="app-error-btn app-error-btn--primary">
          Back to home
        </Link>
        <Link to="/editor" className="app-error-btn app-error-btn--ghost">
          Open editor
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
