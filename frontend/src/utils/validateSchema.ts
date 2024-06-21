import * as Yup from "yup"

export const registerSchema = Yup.object().shape(
    {
        userName: Yup.string().required("User name required"),
        email: Yup.string().email().required("Email Required"),
        password: Yup.string().required("Password Required").min(8)
    }
)


export const loginSchema = Yup.object().shape(
    {
        email: Yup.string().email().required("Email Required"),
        password: Yup.string().required("Password Required").min(8)
    }
)

