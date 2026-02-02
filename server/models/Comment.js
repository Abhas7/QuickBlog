import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'blog', required: true },
    userName: { type: String, required: true },
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: false }
}, { timestamps: true });

const Comment = mongoose.model('comment', commentSchema);

export default Comment;
