import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { KTSVG } from '../../../helpers';
import { LayoutSetup, useLayout } from '../../core';
import { Header } from './Header';
import { Navbar } from './Navbar';
import MenuIcon from '../../../assets/media/burger-menu.svg';
import GreenForgeLogo from '../../../assets/media/greenforgeLogo.png';

export function HeaderWrapper() {
  const { config, classes } = useLayout();
  if (config.app?.header?.default?.container === 'fluid') {
    LayoutSetup.classes.headerContainer.push('container-fluid');
  } else {
    LayoutSetup.classes.headerContainer.push('container-xxl');
  }
  if (!config.app?.header?.display) {
    return null;
  }
  return (
    <div
      className="app-header"
      id="kt_app_header"
      style={{ background: "#03201e" }}
    >
      <div
        className="app-header border-top-rd py-2"
        style={{ background: "white", borderBottom: "1px solid #e0e0df" }}

      // data-kt-sticky="true"
      // data-kt-sticky-activate="{default: true, lg: true}"
      // data-kt-sticky-name="app-header-minimize"
      // data-kt-sticky-offset='{default: "200px", lg: "0"}'
      // data-kt-sticky-animation="false"
      >
        <div
          id="kt_app_header_container"
          className={clsx(
            'app-container w-100 flex-lg-grow-1',
            classes.headerContainer.join(' '),
            config.app?.header?.default?.containerClass
          )}
        >
          {config.app.sidebar?.display && (
            <>
              {config.layoutType !== 'dark-header' &&
                config.layoutType !== 'light-header' ? (
                <div
                  className="d-flex align-items-center d-lg-none ms-n2 me-2"
                  title="Show sidebar menu"
                >
                  {/* <div
                    className="btn btn-icon btn-active-color-primary w-35px h-35px"
                    id="kt_app_sidebar_mobile_toggle"
                  >
                    <i className="bi bi-list fs-28"></i>
                  </div>
                  <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                    <Link
                      to="/dashboard"
                      className="d-lg-none"
                    >
                      <img
                        alt="Logo"
                        src={GreenForgeLogo}
                        className="h-25px"
                      />
                    </Link>
                  </div> */}
                </div>
              ) : null}
            </>
          )}
          {/* PDF Generator Title - Always Show */}
          <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15">
            <Link to="/">
              <div className="d-flex align-items-center">
                <i className="bi bi-file-earmark-text fs-2x text-primary me-3"></i>
                <div>
                  <h5 className="mb-0 fw-bold text-gray-800">PDF Generator</h5>
                  <small className="text-muted">Markdown to PDF</small>
                </div>
              </div>
            </Link>
          </div>
          <div
            id="kt_app_header_wrapper"
            className="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
          >
            {config.app.header.default?.content === 'menu' &&
              config.app.header.default.menu?.display && (
                <div
                  className="app-header-menu app-header-mobile-drawer align-items-stretch"
                  data-kt-drawer="true"
                  data-kt-drawer-name="app-header-menu"
                  data-kt-drawer-activate="{default: true, lg: false}"
                  data-kt-drawer-overlay="true"
                  data-kt-drawer-width="225px"
                  data-kt-drawer-direction="end"
                  data-kt-drawer-toggle="#kt_app_header_menu_toggle"
                  data-kt-swapper="true"
                  data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
                  data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
                >
                  <Header />
                </div>
              )}
            <Navbar />
          </div>
        </div>
      </div>
    </div>
  );
}
