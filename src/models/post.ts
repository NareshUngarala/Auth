import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPost extends Document {
    title: string;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new Schema<IPost>(
    {
        title: { type: String, required: true },
        likes: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);

export default Post;
