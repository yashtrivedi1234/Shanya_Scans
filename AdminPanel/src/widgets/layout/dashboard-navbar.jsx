import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/context";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "@/Rtk/authApi";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const dispatch1 = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    const response = await logout();
    console.log(response);
    if (response?.data?.success) {
      navigate("/login");
    }
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all border-b border-gray-300 ${
        fixedNavbar
          ? "sticky top-4 z-40 py-2 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex justify-between items-center gap-4">
        {/* Left side - Breadcrumbs */}
        <div className="capitalize flex-1">
          <Breadcrumbs
            className="bg-transparent p-0 transition-all"
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-60 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              {page}
            </Typography>
          </Breadcrumbs>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={2} className="h-5 w-5 text-blue-gray-600" />
          </IconButton>


          {/* User Avatar with Dropdown Menu */}
          <Menu placement="bottom-end">
            <MenuHandler>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg p-1 transition-colors">
                <Avatar
                  variant="circular"
                  size="sm"
                  alt="User Avatar"
                  className="cursor-pointer border border-gray-300"
                  src="https://www.pngall.com/wp-content/uploads/15/User-PNG-Images-HD.png"
                />
                <ChevronDownIcon className="h-3 w-3 text-blue-gray-500 hidden xl:block" />
              </div>
            </MenuHandler>
            <MenuList className="p-1 min-w-[180px]">
             
              <MenuItem 
                className="flex items-center gap-2 rounded hover:bg-red-50 focus:bg-red-50 active:bg-red-50"
                onClick={handleLogout}
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 text-red-500" />
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal text-red-500"
                >
                  Logout
                </Typography>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;