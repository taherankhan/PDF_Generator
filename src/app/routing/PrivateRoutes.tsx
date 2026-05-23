import { FC, lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../admin/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { getCSSVariableValue } from "../../admin/assets/ts/_utils";
import { WithChildren } from "../../admin/helpers";
import LandingPage from "../modules/landing/LandingPage";
import EditorPage from "../modules/editor/EditorPage";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Landing Page */}
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          index
          element={<LandingPage />}
        />

        {/* Editor Page */}
        <Route
          path="/editor"
          element={<EditorPage />}
        />

        {/* Page Not Found */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Route>
    </Routes>
  );
};
const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};
export { PrivateRoutes };
