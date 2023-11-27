import {BrowserRouter, Route, Routes, Redirect, Navigate} from "react-router-dom";
import Login from "./pages/Auth/Login";
import {PrivateRoutes} from "./utils/PrivateRoute";
import RegisterUser from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import AddArticle from "./pages/Articles/AddArticle";
import ArtilesList from "./pages/Articles/ArtilesList";
import EditArticle from "./pages/Articles/EditArticle";
function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <div className="container-fluid">
            <div className="row">
              <main>
                <Routes>
                  <Route exact path="/" element={ <Navigate to="/login" replace={true} />} />
                  <Route element={<PrivateRoutes />}>
                    <Route path={"/articles/add"} element={<AddArticle />} />
                    <Route path={"/articles"} element={<ArtilesList />} />
                    <Route path={"/articles/edit"} element={<EditArticle />} />
                    <Route path={"/dashboard"} element={<Dashboard />} />
                  </Route>
                  <Route path={"/login"} element={<Login />} />
                  <Route path={"/register"} element={<RegisterUser />} />

                </Routes>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
