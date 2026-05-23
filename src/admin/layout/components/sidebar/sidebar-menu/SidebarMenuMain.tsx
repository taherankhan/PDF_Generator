import { SidebarMenuItem } from "./SidebarMenuItem";
import DashboardIcon from "../../../../../admin/assets/media/sidebaricons/dashboard.svg";
const SidebarMenuMain = () => {
    return (
        <>
            <SidebarMenuItem to="/" icon={DashboardIcon} title="Home" fontIcon="bi-app-indicator" />
        </>
    );
};
export { SidebarMenuMain };
