import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "../pages/not-found";
import { publicRoutes } from "../configs/routes";
import MainLayout from "../components/MainLayout";
export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Element = route.element;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <MainLayout>
                  <Element />
                </MainLayout>
              }
            />
          );
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
