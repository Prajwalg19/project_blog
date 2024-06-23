import {Spinner} from 'flowbite-react';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "../utils/axios"
import {AxiosError} from 'axios';
import toast from 'react-hot-toast';

type postType = {
    title: string,
    content: string,
    image: string,
    createdAt: string,
    user: string
}
export default function PostPage() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<postType>({
        title: "",
        content: "",
        image: "",
        createdAt: "",
        user: ""
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/blog/getblog?id=${id}`);
                setPost(res.data);
                setLoading(false);
            } catch (error: unknown) {
                if (error instanceof AxiosError && error.response) {
                    toast.error(error.response.data);
                    setLoading(false);
                    return;
                }
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading)
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl' />
            </div>
        );
    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen '>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
                {post && post.title}
            </h1>
            <img
                src={post && post.image}
                alt={post && post.title}
                className='mt-10 p-3 max-h-[600px] w-full object-cover'
            />
            <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='italic'>
                    By {post && (post.user)}
                </span>
            </div>
            <div
                className="p-3 max-w-2xl mx-auto w-full post-content"
                dangerouslySetInnerHTML={{__html: post && post.content}}
            ></div>

        </main>
    );
}
