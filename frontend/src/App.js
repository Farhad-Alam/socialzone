import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { loadUser } from "./redux/slices/userSlice";
import UserPosts from "./pages/UserPosts";
import ResetPassword from "./components/ResetPassword";
import User from "./components/User";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  console.log(process.env.REACT_APP_MAIN_URL);  
  return (
    <div className="">
      <Router>
        <div className="">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to="/auth" />}
            />
            <Route
              path="/createpost"
              element={
                isAuthenticated ? <CreatePost /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="/userposts"
              element={
                isAuthenticated ? <UserPosts /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="/auth"
              element={!isAuthenticated ? <Auth /> : <Navigate to="/" />}
            />
            <Route path="/user/:id" element={<User />} />
            <Route path="/reset/password/:token" element={<ResetPassword />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
