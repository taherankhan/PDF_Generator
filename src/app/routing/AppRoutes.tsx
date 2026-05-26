/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { ErrorsPage } from "../modules/errors/ErrorsPage";
import { App } from "../App";
import PageTracker from "./PageTracker";

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { BASE_URL } = import.meta.env;

const AppRoutes: FC = () => {
  return (
    <BrowserRouter basename={BASE_URL}>
      <PageTracker />
      <Routes>
        <Route element={<App />}>
          <Route
            path="error/*"
            element={<ErrorsPage />}
          />
          <Route
            path="*"
            element={<PrivateRoutes />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
