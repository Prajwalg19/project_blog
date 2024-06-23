import {useEffect, useState} from "react";
import axios from "../utils/axios";
import BlogCard from "../components/blogCard";
import {Spinner} from "flowbite-react"
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import toast from "react-hot-toast";
type BlogType = {
    _id: string;
    title: string;
    content: string;
    image: string;
    createdAt: string;
    user: string;
};

const Allblogs = () => {
    const [allPosts, setAllPosts] = useState<BlogType[]>([]);
    const [loading, setLoading] = useState<true | false>(true);
    const currentuser = useSelector((store: RootState) => store.user.currentUser)

    useEffect(() => {
        async function fetchBlogs() {
            setLoading(true)
            try {
                const response = await axios.get(`/blog/myblogs?id=${currentuser?._id}`);
                setAllPosts(response.data);
                setLoading(false)
            } catch (e) {
                toast.error("Failed to fetch blogs")
                setLoading(false)
            }
        }
        fetchBlogs();
    }, []);

    return (
        loading ?
            (
                <div className='flex justify-center items-center min-h-screen'>
                    <Spinner size='xl' />
                </div>

            )
            :
            allPosts.length == 0 ? (
                <div className="min-h-screen text-3xl font-semibold flex w-full justify-center items-center">User has posted no blogs</div >
            ) :
                (
                    <div>
                        <h1 className='text-center text-3xl my-7 font-semibold'>My Blogs</h1>
                        <div className="mt-10 min-h-screen grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                            {allPosts.map((item) => (
                                <BlogCard key={item._id} post={item} />
                            ))
                            }
                        </div >

                    </div >

                )

    );
};

export default Allblogs;

