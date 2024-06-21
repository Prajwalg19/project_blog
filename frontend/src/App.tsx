import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "@/components/header"
import Login from "./pages/login";
import Register from "./pages/register";
import {Toaster} from "react-hot-toast";
import Home from "./pages/home";
import Profile from "./pages/profile";
import CreateBlog from "./pages/createBlog";
import BlogPage from "./pages/blogPage"
import PrivateRoute from "./components/privateRoute";
import Footer from "./components/footer"
import Allblogs from "./pages/allBlogs";
import Myblogs from "./pages/myblogs"
const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Toaster position="bottom-center" />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Login />} path="login" />
                <Route element={<Register />} path="register" />
                <Route element={<PrivateRoute />} path="/createblog">
                    <Route element={<CreateBlog />} path="/createblog" />
                </Route>
                <Route element={<PrivateRoute />} path="/profile">
                    <Route element={<Profile />} path="/profile" />
                </Route>
                <Route element={<BlogPage />} path="/blog/:id" />
                <Route element={<Allblogs />} path="/blogs" />
                <Route element={<PrivateRoute />} path="/myblogs">
                    <Route element={<Myblogs />} path="/myblogs" />
                </Route>


            </Routes>


            <Footer />
        </BrowserRouter>
    )
}

export default App;

