import {useEffect, useState} from "react";
import axios from "../utils/axios";
import BlogCard from "../components/blogCard";
import {Spinner} from "flowbite-react";
import toast from "react-hot-toast";

type BlogType = {
    _id: string;
    title: string;
    content: string;
    image: string;
    createdAt: string;
    user: string;
};

const AllBlogs = () => {
    const [allPosts, setAllPosts] = useState<BlogType[]>([]);
    const [loading, setLoading] = useState<true | false>(true);
    const [totalPosts, setTotalPosts] = useState(0);
    const [posts, setPosts] = useState(0);
    const [loadingMore, setLoadingMore] = useState<true | false>(false);

    useEffect(() => {
        async function fetchBlogs() {
            setLoading(true);
            try {
                const response = await axios.get(`/blog/allblogs?page=0&limit=5`);
                setAllPosts(response.data.blogs);
                setTotalPosts(response.data.total);
                setPosts(5);
                setLoading(false);
            } catch (e) {
                toast.error("Something went wrong");
                setLoading(false);
            }
        }
        fetchBlogs();
    }, []);

    const loadMoreBlogs = async () => {
        setLoadingMore(true);
        try {
            const response = await axios.get(`/blog/allblogs?page=${posts}&limit=2`);
            setAllPosts((prevPosts) => [...prevPosts, ...response.data.blogs]);
            setPosts(posts + 2);
            setLoadingMore(false);
        } catch (e) {
            toast.error("Something went wrong");
            setLoadingMore(false);
        }
    };

    return (
        loading ? (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl' />
            </div>
        ) : (
            <div>
                <h1 className='text-center text-3xl my-7 font-semibold'>All Blogs</h1>
                <div className="mt-10 min-h-screen grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                    {allPosts.map((item) => (
                        <BlogCard key={item._id} post={item} />
                    ))}
                    {allPosts.length < totalPosts && (
                        <div className='flex w-full justify-center items-center mt-10'>
                            <button
                                className="border flex justify-center items-center self-center p-2 mb-10 rounded-md w-32 border-cyan-700"
                                onClick={loadMoreBlogs}
                                disabled={loadingMore}
                            >
                                {loadingMore ? 'Loading...' : 'Load More'}
                            </button>
                        </div>
                    )}
                </div>

            </div>
        )
    );
};

export default AllBlogs;
