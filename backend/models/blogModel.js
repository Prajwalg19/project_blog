import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            default:
                'https://images.pexels.com/photos/768474/pexels-photo-768474.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
    },
    {timestamps: true}
);

const Blog = mongoose.model('blog', blogSchema);

export default Blog;
