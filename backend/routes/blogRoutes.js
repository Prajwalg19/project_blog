import express from 'express';
import verifyToken from '../utils/verfiyUser.js';
import {getBlog, allBlogs, myblogs, createBlog} from '../controllers/blogController.js';

const router = express.Router();

router.post('/create', verifyToken, createBlog)
router.get('/getblog/', getBlog)
router.get('/allblogs/', allBlogs)
router.get('/myblogs/', verifyToken, myblogs)


export default router;
