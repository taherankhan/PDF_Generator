import { FC } from "react";
import { Link } from "react-router-dom";

const Error404: FC = () => (
  <>
    <p className="app-error-code">404</p>
    <h1>Page not found</h1>
    <p className="app-error-desc">We can&apos;t find that page.</p>
    <div className="app-error-actions">
      <Link to="/" className="app-error-btn app-error-btn--primary">
        Return home
      </Link>
    </div>
  </>
);

export { Error404 };
