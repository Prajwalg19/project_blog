import {Avatar, Button, Dropdown, Navbar} from "flowbite-react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {FaMoon} from "react-icons/fa6";
import {FaSun} from "react-icons/fa6";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {IoPersonSharp} from "react-icons/io5";
import {useDispatch} from "react-redux";
import {changeTheme} from "@/redux/slices/themeSlice";
import {logOut} from "@/redux/slices/userSlice"

const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const currentTheme = useSelector((store: RootState) => store.theme.themeState)
    const {currentUser} = useSelector((store: RootState) => store.user)
    return (
        <Navbar className="bg-slate-100 w-full max-w-7xl mx-auto dark:bg-black">
            <Navbar.Brand as={Link} to="/" className="text-xl font-bold flex flex-row items-center gap-1">
                <span className="bg-gradient-to-r to-green-500 from-purple-600 text-white text-xl px-2 py-1 font-bold rounded-lg">Your</span>
                <span>Blog</span>
            </Navbar.Brand>

            <div className="md:order-2 flex flex-row items-center gap-10 text-center">
                <button className=" border border-black/10 bg-slate-50 dark:bg-black dark:border-slate-600 px-6 py-3 rounded-full" onClick={() => dispatch(changeTheme())}>{currentTheme == "dark" ? <FaMoon className="text-white" /> : (<FaSun />)}</button>
                {currentUser ? (
                    <Dropdown arrowIcon={false} inline label={ // inline to make the image as the source for Dropdown
                        <Avatar img={currentUser.userPfp} rounded bordered />
                    }>
                        <Dropdown.Item className="text-xs" icon={IoPersonSharp} as={Link} to="/profile">{currentUser.userName}</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-xs" onClick={() => dispatch(logOut())}>Sign out</Dropdown.Item>

                    </Dropdown>

                ) : (
                    <Link to="/login">
                        <Button outline className="h-10" gradientDuoTone="purpleToBlue">
                            Log In
                        </Button>
                    </Link>

                )
                }

                <Navbar.Toggle />
            </div>


            <Navbar.Collapse className="text-center font-medium">
                <Navbar.Link active={location.pathname == "/" ? true : false} as={Link} to="/">Home</Navbar.Link>
                <Navbar.Link active={location.pathname == "/blogs" ? true : false} as={Link} to="/blogs">All blogs</Navbar.Link>
                {
                    currentUser ? (
                        <>
                            <Navbar.Link active={location.pathname == "/createblog"} as={Link} to="/createblog">Create a Blog</Navbar.Link>
                            <Navbar.Link active={location.pathname == "/myblogs"} as={Link} to="/myblogs">My Blogs</Navbar.Link>
                        </>

                    ) : null
                }
            </Navbar.Collapse>


        </Navbar >
    )
}

export default Header;


