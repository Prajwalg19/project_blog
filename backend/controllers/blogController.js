import BlogModel from '../models/blogModel.js';
import customError from '../utils/error.js';
import userModel from "../models/userModel.js"

export const createBlog = async (req, res, next) => {
    if (!req.body.title || !req.body.content) {
        return next(customError('Please provide all required fields', 400));
    }

    const newPost = new BlogModel({
        ...req.body,
        userId: req.user.id,
    });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
};
export const getBlog = async (req, res, next) => {
    try {
        const blog = await BlogModel.findById(req.query.id);
        const user = await userModel.findById(blog.userId)
        res.json({...blog._doc, user: user.userName});
    } catch (e) {
        next(e);
    }
}

export const allBlogs = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        if (page == 0) {
            const blogs = await BlogModel.find().sort({createdAt: -1}).skip(page).limit(limit);
            let total = await BlogModel.find();
            total = total.length;
            res.json({
                total,
                blogs
            });
        } else {
            const blogs = await BlogModel.find().sort({createdAt: -1}).skip(page).limit(limit);
            res.json({
                blogs
            });

        }
    } catch (e) {
        next(e);
    }
}
export const myblogs = async (req, res, next) => {
    try {
        const myblogs = await BlogModel.find({userId: req.query.id})
        res.json(myblogs)
    } catch (e) {

    }
}
//export const getposts = async (req, res, next) => {
//    try {
//        const startIndex = parseInt(req.query.startIndex) || 0;
//        const limit = parseInt(req.query.limit) || 9;
//        const sortDirection = req.query.order === 'asc' ? 1 : -1;
//        const posts = await BlogModel.find({
//            ...(req.query.userId && {userId: req.query.userId}),
//            ...(req.query.category && {category: req.query.category}),
//            ...(req.query.slug && {slug: req.query.slug}),
//            ...(req.query.postId && {_id: req.query.postId}),
//            ...(req.query.searchTerm && {
//                $or: [
//                    {title: {$regex: req.query.searchTerm, $options: 'i'}},
//                    {content: {$regex: req.query.searchTerm, $options: 'i'}},
//                ],
//            }),
//        })
//            .sort({updatedAt: sortDirection})
//            .skip(startIndex)
//            .limit(limit);
//
//        const totalPosts = await BlogModel.countDocuments();
//
//        const now = new Date();
//
//        const oneMonthAgo = new Date(
//            now.getFullYear(),
//            now.getMonth() - 1,
//            now.getDate()
//        );
//
//        const lastMonthPosts = await BlogModel.countDocuments({
//            createdAt: {$gte: oneMonthAgo},
//        });
//
//        res.status(200).json({
//            posts,
//            totalPosts,
//            lastMonthPosts,
//        });
//    } catch (error) {
//        next(error);
//    }
//};

export const deletepost = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(customError('You are not allowed to delete this post', 403));
    }
    try {
        await BlogModel.findByIdAndDelete(req.params.postId);
        res.status(200).json('The post has been deleted');
    } catch (error) {
        next(error);
    }
};

export const updatepost = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(customError('You are not allowed to update this post', 403));
    }
    try {
        const updatedPost = await BlogModel.findByIdAndUpdate(
            req.params.postId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    category: req.body.category,
                    image: req.body.image,
                },
            },
            {new: true}
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
};
