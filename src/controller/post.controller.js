import {Post} from '../model/post.model.js';
export const createPost = async (req, res) => {
try {
const { caption } = req.body;
if (!req.file) {
return res.status(400).json({ status: 'fail', message: 'Image isrequired' });
 }
const post = await Post.create({
caption: caption,
image: `/uploads/${req.file.filename}`,
userId: req.user._id


 });
 res.status(201).json({ status: 'success', data: post });
 } catch (err) {
 res.status(400).json({ status: 'fail', message: err.message });
 }
}            