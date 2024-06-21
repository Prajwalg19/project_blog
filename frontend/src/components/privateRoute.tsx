import {useSelector} from "react-redux"
import {RootState} from "@/redux/store"
import {Navigate, Outlet} from "react-router-dom"
const PrivateRoute = () => {
    const user = useSelector((store: RootState) => store.user.currentUser)
    return !user ? <Navigate to="/login" /> : <Outlet />

}

export default PrivateRoute

