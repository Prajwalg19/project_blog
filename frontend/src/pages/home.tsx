import {useEffect, useState} from "react";
import axios from "../utils/axios";
import BlogCard from "../components/blogCard";
import {Spinner} from "flowbite-react";
import {Link} from "react-router-dom";

type BlogType = {
    _id: string;
    title: string;
    content: string;
    image: string;
    createdAt: string;
    user: string;
};

const Home = () => {
    const [allPosts, setAllPosts] = useState<BlogType[]>([]);
    const [loading, setLoading] = useState<true | false>(true);
    useEffect(() => {
        async function fetchBlogs() {
            setLoading(true);
            try {
                const response = await axios.get(`/blog/allblogs?page=0&limit=5`);
                setAllPosts(response.data.blogs);
                setLoading(false);
            } catch (e) {
                console.error("Failed to fetch blogs", e);
                setLoading(false);
            }
        }
        fetchBlogs();
    }, []);


    return (
        <div className="mt-24 max-w-7xl mx-auto w-full min-h-screen">
            <span className="px-4 flex flex-col gap-10">
                <p className="text-3xl sm:text-5xl md:text-7xl font-bold">Write your thoughts out</p>
                <p className="text-sm capitalize sm:text-md font-medium text-gray-500/90 tracking-wider">A Place where people write about their experiences and thoughts </p>
                {
                    loading ? (
                        <div className='flex justify-center items-center min-h-screen'>
                            <Spinner size='xl' />
                        </div>
                    ) : (
                        <div className="flex mt-10 flex-col gap-3 justify-center">
                            <div className="font-semibold">Recent blogs</div>
                            <div className="min-h-screen grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4">
                                {allPosts.map((item) => (
                                    <BlogCard key={item._id} post={item} />
                                ))}
                            </div>

                            <Link to="/blogs" className="border flex justify-center items-center self-center p-2 mb-10 rounded-md w-32 border-cyan-700"><div>
                                View more
                            </div></Link>
                        </div>
                    )
                }

            </span>

        </div>
    )
}

export default Home
