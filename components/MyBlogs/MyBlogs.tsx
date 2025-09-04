import BlogPage, { getPosts } from '@/app/(user)/blog/page';
import React from 'react'

export default async function MyBlogs() {
    const posts = await getPosts();
    if (posts.length === 0) {
        return null
    }
    return (
        <div>
            <div className="w-fit rounded-3xl border border-slate-500 px-5 py-2">
                <p>My Blogs</p>
            </div>
            <BlogPage showTitle={false} numberOfPosts={4} />
        </div>
    )

}
