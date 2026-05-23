import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Languages } from "./Languages";
import { toAbsoluteUrl } from "../../../helpers";

const HeaderUserMenu: FC = () => {

  return (
    <>
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-900 menu-state-bg menu-state-primary fw-500  fs-16 w-200px py-1 px-3"
        data-kt-menu="true"
      >
        <div className="menu-item">
          <div className="menu-link bg-white text-muted">
            PDF Generator
          </div>
        </div>
      </div>


    </>
  );
};

export { HeaderUserMenu };
