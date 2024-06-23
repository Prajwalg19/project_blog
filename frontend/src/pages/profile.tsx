import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {Button, TextInput} from "flowbite-react";
import axios from "../utils/axios"
import {logOut} from "@/redux/slices/userSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const {currentUser} = useSelector((store: RootState) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function handleDelete() {
        try {
            if (currentUser) {
                const response = await axios.delete(`/auth/delete/${currentUser._id}`)
                if (response.status == 200) {
                    dispatch(logOut());
                }

            }

        } catch (e: unknown) {

        }

    }
    return (
        <main className="min-h-screen flex flex-col gap-14 w-full items-center mt-24 p-2">
            <h1 className="text-4xl font-bold text-center">Profile</h1>
            <div className="flex justify-center w-full">
                <div className="border-[5px] border-slate-400 w-28 h-28 md:w-36 md:h-36 flex items-center justify-center rounded-full">
                    <img src={`${currentUser?.userPfp}`} className="md:w-32 md:h-32 w-24 h-24 rounded-full" />
                </div>
            </div>

            <span className="flex flex-col gap-5 max-w-2xl w-full" >
                <TextInput type="text" defaultValue={currentUser?.userName} sizing="lg" placeholder="Username" />
                <TextInput type="email" defaultValue={currentUser?.email} sizing="lg" placeholder="Email" />
                <Button gradientDuoTone="greenToBlue" size="lg" outline onClick={() => {dispatch(logOut()); navigate("/login")}}>Sign Out</Button>
                <Button gradientMonochrome="failure" size="lg" outline onClick={handleDelete}>Delete Account</Button>
            </span >
        </main >
    );
};

export default Profile;
