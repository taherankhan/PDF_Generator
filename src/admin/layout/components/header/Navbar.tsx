import clsx from "clsx";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import { HeaderUserMenu, ThemeModeSwitcher } from "../../../partials";
import { useLayout } from "../../core";

const itemClass = "ms-1 ms-md-4";
const btnClass = "btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px";
const userAvatarClass = "symbol-35px";
const btnIconClass = "fs-2";
const Navbar = () => {
    const { config } = useLayout();

    return (
        <div className="app-navbar flex-shrink-0">
            {/* <div className={clsx('app-navbar-item', itemClass)}>
        <div
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          className={btnClass}
        >
          <KTIcon iconName='element-plus' className={btnIconClass} />
        </div>
        <HeaderNotificationsMenu />
      </div> */}
            <div className={clsx("app-navbar-item", itemClass)} style={{ position: "relative" }}>
                <div
                    className="cursor-pointer d-flex align-items-center rounded"
                    style={{
                        // width: "151px",
                        // height: "46px",
                        borderRadius: "12px",
                        padding: "8px",
                        gap: "6px",
                        backgroundColor: "#F5F5F5",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",

                    }}
                    data-kt-menu-trigger="{default: 'click'}"
                    data-kt-menu-attach="parent"
                    data-kt-menu-placement="bottom-end"
                >
                    {/* White rounded square with initials */}
                    <div
                        className="bg-white rounded d-flex align-items-center justify-content-center"
                        style={{ width: "35px", height: "35px", borderRadius: "6px" }}
                    >
                        <span className="fs-4 fw-bolder text-primary">
                            PG
                        </span>
                    </div>

                    {/* Admin text */}
                    <span className="fs-6 fw-bold flex-grow-1" style={{ color: "#2C3E50" }}>
                        PDF Generator
                    </span>

                    <KTIcon iconName="arrow-right" className="flex-shrink-0 me-3 fs-4 text-dark" />
                </div>
                {/* <HeaderUserMenu /> */}
            </div>
            {config.app?.header?.default?.menu?.display && (
                <div className="app-navbar-item d-lg-none ms-2 me-n3" title="Show header menu">
                    <div className="btn btn-icon btn-active-color-primary w-35px h-35px" id="kt_app_header_menu_toggle">
                        <KTIcon iconName="text-align-left" className={btnIconClass} />
                    </div>
                </div>
            )}
        </div>
    );
};
export { Navbar };
