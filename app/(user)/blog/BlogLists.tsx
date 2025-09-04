import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Clock } from 'lucide-react';
import Image from 'next/image';
import { getPosts, Post } from './getPosts';




type BlogListsProps = {
  showTitle?: boolean;
  numberOfPosts?: number;
  posts: Post[]
};

export default function BlogLists({
  showTitle = true,
  numberOfPosts,
  posts
}: BlogListsProps) {

  return (
   <>
   {showTitle &&
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Thoughts, tutorials, and insights on web development, design, and more.
        </p>
      </div>
}
      {posts.length === 0 && showTitle ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No posts yet</h2>
          <p className="text-muted-foreground">Check back later for new content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {posts.length > 0 && posts.slice(0, numberOfPosts || posts.length).map((post) => (
            <Card key={post._id} className="flex flex-col h-full">
              <div className="aspect-video overflow-hidden rounded-lg bg-muted min-h-96">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-gray-300 dark:bg-gray-800" />
                )}
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readingTime} min read</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{post.views} views</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <time className="text-sm text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
</>
  );
}