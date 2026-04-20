import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import Footer from "@/pages/dashboard/Footer";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;

  return (
    <div className="max-h-screen bg-blue-gray-50/50 flex">
      {/* Sidebar - Fixed on desktop, overlay on mobile */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 transform  transition-transform duration-300 ease-in-out
        xl:relative xl:translate-x-0 xl:z-auto
        ${openSidenav ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}
      `}>
        <Sidenav
          routes={routes}
          brandImg={
            sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
          }
        />
      </div>

      {/* Mobile overlay */}
      {openSidenav && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 xl:ml-0">
        {/* Top padding for desktop sidebar space */}
        <div className="flex-1  flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex-shrink-0 bg-white px-4 pt-4">
            <DashboardNavbar />
          </div>

          {/* Main content with scroll */}
          <main className="flex-1 overflow-y-auto px-4 py-4">
            <div className="max-w-full">
              <Routes>
                {routes.map(
                  ({ layout, pages }) =>
                    layout === "dashboard" &&
                    pages.map(({ path, element }) => (
                      <Route key={path} path={path} element={element} />
                    ))
                )}
              </Routes>
            </div>
          </main>

          {/* Footer - Fixed at bottom */}
          <div className="flex-shrink-0 mt-auto">
            <Footer />
          </div>
        </div>
      </div>

      {/* Configurator */}
      <Configurator />
      
      {/* Floating settings button */}
      <IconButton
        size="lg"
        color="white"
        className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg shadow-blue-gray-900/20 hover:shadow-xl transition-shadow"
        ripple={false}
        onClick={() => setOpenConfigurator(dispatch, true)}
      >
        <Cog6ToothIcon className="h-5 w-5" />
      </IconButton>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;