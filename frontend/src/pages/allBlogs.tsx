import {useEffect, useState} from "react";
import axios from "../utils/axios";
import BlogCard from "../components/blogCard";
import {Spinner} from "flowbite-react"

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

    useEffect(() => {
        async function fetchBlogs() {
            setLoading(true)
            try {
                const response = await axios.get("/blog/allblogs");
                setAllPosts(response.data);
                setLoading(false)
            } catch (e) {
                console.error("Failed to fetch blogs", e);
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
            : (
                <div className="mt-10 min-h-screen grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                    {allPosts.map((item) => (
                        <BlogCard key={item._id} post={item} />
                    ))
                    }
                </div >

            )
    );
};

export default Allblogs;
