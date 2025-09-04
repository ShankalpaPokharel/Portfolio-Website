import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage?: string;
  coverImageAlt?: string;
  author: string;
  published: boolean;
  publishedAt?: Date;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  categories: string[];
  tags: string[];
  readingTime: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: '',
    },
    coverImageAlt: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: 'Admin',
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    keywords: [{
      type: String,
    }],
    canonicalUrl: {
      type: String,
    },
    categories: [{
      type: String,
    }],
    tags: [{
      type: String,
    }],
    readingTime: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate reading time before saving
// PostSchema.pre<IPost>('save', function(next) {
//   const wordsPerMinute = 100;
//   const words = this.content.split(/\s+/).length;
//   this.readingTime = Math.ceil(words / wordsPerMinute);
//   next();
// });

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);