import {Button, Spinner} from 'flowbite-react';
import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "../utils/axios"
import {AxiosError} from 'axios';

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
    const [error, setError] = useState(false);
    const [post, setPost] = useState<postType>({
        title: "",
        content: "",
        image: "",
        createdAt: "",
        user: ""
    });
    const [recentPosts, setRecentPosts] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/blog/getblog?id=${id}`);
                console.log(res.data)
                setPost(res.data);
                setLoading(false);
                setError(false);
            } catch (error: unknown) {
                if (error.response) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    //useEffect(() => {
    //    try {
    //        const fetchRecentPosts = async () => {
    //            const res = await axios.get(`/post/getposts?limit=3`);
    //            if (res.data) {
    //                setRecentPosts(res.data);
    //            }
    //        };
    //        fetchRecentPosts();
    //    } catch (error: unknown) {
    //        if (error instanceof AxiosError && error.response) {
    //            console.log(error.response.data);
    //        }
    //    }
    //}, []);
    //
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
