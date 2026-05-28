import { Outlet } from "react-router-dom";
import "./ErrorsPage.css";

const ErrorsLayout = () => (
  <div className="app-error-page">
    <div className="app-error-card">
      <Outlet />
    </div>
  </div>
);

export { ErrorsLayout };
