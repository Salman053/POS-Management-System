import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Sidebar from "./components/shared/Sidebar"
import ClientRoutes from "./routes/client-routes/ClientRoutes"
import Header from "./components/shared/Header"
import useScrollToTop from "./hooks/use-scroll-restore";
import AuthRoutes from "./routes/auth-routes/AuthRoutes";
import { useMainContext } from "./context/MainContext";
import { MainContextType } from "./types";

const App = () => {
  const location = useLocation();
  const { currentUser } = useMainContext() as MainContextType;


  // scroll to top
  useScrollToTop(location.pathname, '.content-area');



  // Auth routes
  if (!currentUser) {
    return (
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="*" element={<Navigate replace to="/auth/" />} />
      </Routes>
    );
  }

 

  // Protected routes
  return (
    <div className="flex h-screen overflow-y-hidden select-none bg-gray-50">
      <Sidebar />
      <div className="main flex-1">
        <Header />
        <div className="content-area max-w-[100vw] max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Routes>
            <Route path="/shop/*" element={<ClientRoutes />} />
            <Route path="*" element={<Navigate replace to="/shop/home" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;