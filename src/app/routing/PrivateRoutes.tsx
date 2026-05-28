import { FC, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import type { WithChildren } from "../../shared/types";
import NotFoundPage from "../modules/errors/NotFoundPage";

const LandingPage = lazy(() => import("../modules/landing/LandingPage"));
const EditorPage = lazy(() => import("../modules/editor/EditorPage"));
const PrivacyPolicyPage = lazy(() => import("../modules/legal/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("../modules/legal/TermsPage"));

const TOPBAR_COLOR = "#6c63ff";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SuspensedView>
            <LandingPage />
          </SuspensedView>
        }
      />
      <Route
        index
        element={
          <SuspensedView>
            <LandingPage />
          </SuspensedView>
        }
      />

      <Route
        path="/editor"
        element={
          <SuspensedView>
            <EditorPage />
          </SuspensedView>
        }
      />

      <Route
        path="/privacy"
        element={
          <SuspensedView>
            <PrivacyPolicyPage />
          </SuspensedView>
        }
      />
      <Route
        path="/terms"
        element={
          <SuspensedView>
            <TermsPage />
          </SuspensedView>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  TopBarProgress.config({
    barColors: {
      "0": TOPBAR_COLOR,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
