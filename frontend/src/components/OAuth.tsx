import {Button} from "flowbite-react";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {FcGoogle} from "react-icons/fc";
import {app} from "../../firebase"
import {getAuth} from "firebase/auth";
import toast from "react-hot-toast";
import {loginSuccess} from "@/redux/slices/userSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "@/utils/axios"
import {AxiosError} from "axios";
import {useState} from "react";
const OAuth = () => {
    const [loading, setLoading] = useState(false);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    provider.setCustomParameters({prompt: "select_account"}) // without this the user will not get a pop up if they have already signed in with the google OAuth earlier instead it would let them directly login with the past google account.
    const auth = getAuth(app);

    async function handleOAuth() {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            const {displayName, email, photoURL} = user;
            const response = await axios.post("/auth/oauth", {displayName, email, photoURL})
            dispatch(loginSuccess(response.data));
            setLoading(false);
            navigate("/");
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                toast.error(e.response.data)
            } else {
                toast.error("Something went wrong");
            }
            setLoading(false);
        }

    }
    return (
        <Button disabled={loading} type="button" onClick={handleOAuth} className="w-full hover:text-white" gradientMonochrome="pink" outline><span className="font-semibold flex flex-row gap-2 items-center justify-center"> <FcGoogle /> <span>Google</span></span></Button>
    )
}

export default OAuth;
