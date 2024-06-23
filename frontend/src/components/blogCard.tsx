import {Link} from "react-router-dom";

export default function BlogCard({post}: {post: {_id: string; image: string; title: string}}) {
    return (
        <div className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg transition-all">
            <Link to={`/blog/${post._id}`}>
                <img
                    src={post.image}
                    alt="post cover"
                    className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300"
                />
            </Link>
            <div className="p-3 flex flex-col gap-2">
                <Link to={`/blog/${post._id}`} className="text-lg font-semibold line-clamp-2">{post.title}</Link>
                <Link
                    to={`/blog/${post._id}`}
                    className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
                >
                    Read article
                </Link>
            </div>
        </div>
    );
}
