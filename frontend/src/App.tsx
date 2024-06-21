import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "@/components/header"
import Login from "./pages/login";
import Register from "./pages/register";
import {Toaster} from "react-hot-toast";
import Home from "./pages/home";
import Profile from "./pages/profile";
const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Toaster position="bottom-center" />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Login />} path="login" />
                <Route element={<Register />} path="register" />
                <Route element={<Profile />} path="profile" />
            </Routes>

        </BrowserRouter>
    )
}

export default App;

