import {Link} from "react-router-dom";
import {Spinner, TextInput} from "flowbite-react";
import {Label} from "flowbite-react";
import {Button} from "flowbite-react";
import {Formik} from "formik";
import {loginSchema} from "@/utils/validateSchema";
import axios from "@/utils/axios"
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {loginSuccess} from "@/redux/slices/userSlice";
import {useDispatch} from "react-redux";
import OAuth from "@/components/OAuth";
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const formData = {
        email: "",
        password: "",
    }
    async function onSubmit(value: typeof formData) {
        setLoading(true);
        toast.dismiss();
        try {
            const response = await axios.post("/auth/login", {
                password: value.password,
                email: value.email.trim()
            })
            dispatch(loginSuccess(response.data));
            toast.success("Login Successfull")
            navigate("/");

        } catch (e: unknown) {
            console.log(e)
            if (e instanceof AxiosError) {
                if (e.response?.status == 400) {
                    toast.error("All fields are required");
                } else if (e.response?.status == 401) {
                    toast.error(e.response.data.message)
                } else if (e.response?.status == 404) {
                    toast.error(e.response.data.message)
                }
            } else {
                toast.error("Something went wrong")
            }

            setLoading(false);
        }


    }
    return (
        <main className="h-screen mt-20">
            <div className="max-w-4xl p-3 gap-14 mx-auto flex md:flex-row flex-col md:items-center">
                <span className="flex-1 whitespace-nowrap px-2 py-1 gap-4 flex flex-col items-center justify-center md:items-start">
                    <Link className="text-2xl gap-2 flex flex-row items-center" to="/">
                        <span className="bg-gradient-to-r to-green-500 from-purple-600 text-white px-2 py-1 rounded-lg">Your</span>
                        <span>Blog</span>
                    </Link>
                    <span className="text-gray-500 text-sm">Write your experiences and things you know  <br /> on here. </span>
                </span>
                <Formik initialValues={formData} onSubmit={onSubmit} validationSchema={loginSchema}>
                    {({handleSubmit, handleChange, errors, touched, values, handleBlur}) => (
                        <form className="flex-1 flex flex-col" onSubmit={handleSubmit}>
                            <div className="h-[5.5rem]">
                                <Label value="Email" />
                                <TextInput placeholder="Email" type="email" id="email" value={values.email} onBlur={handleBlur} onChange={handleChange} />
                                {touched.email && errors.email ? <span className="text-red-500 text-xs">{errors.email}</span> : null}
                            </div>
                            <div className="h-[6rem]">
                                <Label value="Password" />
                                <TextInput placeholder="Password" onBlur={handleBlur} value={values.password} type="password" id="password" onChange={handleChange} />
                                {touched.password && errors.password ? <span className="text-red-500 text-xs">{errors.password}</span> : null}
                            </div>
                            <div className="flex flex-col gap-3 justify-center">
                                <Button gradientDuoTone="greenToBlue" className="font-semibold" type="submit" disabled={loading}>
                                    {!loading ? (<div>Login</div>) : <><Spinner size="sm" /><span className="pl-3">Loading...</span></>}
                                </Button>
                                <OAuth />
                                <span className="text-sm">Don&apos;t Have An Account? <Link className="text-teal-500" to="/register">Register here</Link></span>

                            </div>
                        </form>

                    )}

                </Formik>
            </div>


        </main>
    )
}

export default Login;
