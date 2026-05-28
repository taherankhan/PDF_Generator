import { FC } from 'react';
import { Link } from 'react-router-dom';

const NetworkError: FC = () => (
  <>
    <p className="app-error-code">!</p>
    <h1>Network error</h1>
    <p className="app-error-desc">Check your connection and try again.</p>
    <div className="app-error-actions">
      <Link to="/" className="app-error-btn app-error-btn--primary">
        Return home
      </Link>
    </div>
  </>
);

export { NetworkError };
