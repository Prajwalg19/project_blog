import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {Button, TextInput} from "flowbite-react";

const Profile = () => {
    const {currentUser} = useSelector((store: RootState) => store.user);
    function handleSubmit() {

    }
    return (
        <main className="flex flex-col gap-14 w-full items-center mt-24 p-2">
            <h1 className="text-4xl font-bold text-center">Profile</h1>
            <div className="flex justify-center w-full">
                <div className="border-[5px] border-slate-400 w-28 h-28 md:w-36 md:h-36 flex items-center justify-center rounded-full">
                    <img src={`${currentUser?.userPfp}`} className="md:w-32 md:h-32 w-24 h-24 rounded-full" />
                </div>
            </div>

            <form className="flex flex-col gap-5 max-w-2xl w-full" onSubmit={handleSubmit}>
                <TextInput type="text" value={currentUser?.userName} sizing="lg" placeholder="Username" />
                <TextInput type="email" value={currentUser?.email} sizing="lg" placeholder="Email" />
                <TextInput type="text" sizing="lg" placeholder="Password" />
                <Button gradientDuoTone="greenToBlue" size="lg" outline>Update</Button>
            </form>
            <span className="flex flex-row items-center justify-between w-full max-w-2xl text-red-600 -mt-5">
                <button>Delete Account</button>
                <button>Sign out</button>
            </span>
        </main>
    );
};

export default Profile;
