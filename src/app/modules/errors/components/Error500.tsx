import { FC } from "react";
import { Link } from "react-router-dom";

const Error500: FC = () => (
  <>
    <p className="app-error-code">500</p>
    <h1>System error</h1>
    <p className="app-error-desc">Something went wrong. Please try again later.</p>
    <div className="app-error-actions">
      <Link to="/" className="app-error-btn app-error-btn--primary">
        Return home
      </Link>
    </div>
  </>
);

export { Error500 };
