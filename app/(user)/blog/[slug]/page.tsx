import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

import { Toaster } from 'sonner';
import { ShareButtons } from '@/components/blog-share';

interface Post {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage?: string;
  coverImageAlt?: string;
  author: string;
  published: boolean;
  publishedAt: string;
  readingTime: number;
  views: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  categories: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

async function getPost(slug: string): Promise<Post | null> {
  console.log("-----------------------------")
  console.log('slug get post called', slug)
  console.log("-----------------------------")

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${slug}`, {
      // Remove revalidate if you want SSR, or keep for ISR
      next: { revalidate: 60 }, // Optional: Revalidate every 60 seconds
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords?.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

// Remove generateStaticParams completely - we don't need it for dynamic routes

export default async function BlogPostPage({ params }: { params: { slug: string } }) {

  console.log("-----------------------------")
  console.log('slug', params)
  console.log("-----------------------------")

  const post = await getPost(params.slug);

  if (!post) {
    notFound();
    console.log('Post not found');
  }



  return (
    <div className="min-h-screen bg-background text-foreground">

      <Toaster position="top-right" />
      <article className="container mx-auto px-4 py-10 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readingTime} min read</span>
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              <span>{post.views} views</span>
            </div>
          </div>

          {post.coverImage && (
            <div className="overflow-hidden rounded-lg mb-6 flex justify-center">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                width={1200} // provide width & height for Next.js Image
                height={800}
                className="w-auto max-h-96 object-contain"
              />
            </div>
          )}


          {post.description && (
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              {post.description}
            </p>
          )}

          {/* Categories and Tags */}
          {(post.categories.length > 0 || post.tags.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  {category}
                </span>
              ))}
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-7 prose-p:mb-4 prose-ul:mb-4 prose-ol:mb-4 prose-li:mb-1 prose-blockquote:border-primary prose-blockquote:bg-primary/10 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-lg">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-4xl font-bold mt-10 mb-6">{children}</h1>,
              h2: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
              h3: ({ children }) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
              p: ({ children }) => <p className="mb-6 leading-7">{children}</p>,
              ul: ({ children }) => <ul className="mb-6 pl-6 list-disc">{children}</ul>,
              ol: ({ children }) => <ol className="mb-6 pl-6 list-decimal">{children}</ol>,
              li: ({ children }) => <li className="mb-2">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-6 italic my-6 py-2 bg-primary/5 rounded-r">
                  {children}
                </blockquote>
              ),
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                const code = String(children).replace(/\n$/, '');

                const isInline = !match; // Determine if it's inline based on the absence of a language match

                if (isInline) {
                  return (
                    <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
                      {code}
                    </code>
                  );
                }

                return (
                  <div className="relative group my-6">
                    {match && (
                      <div className="flex justify-between items-center bg-muted px-4 py-2 rounded-t-lg text-sm">
                        <span className="text-muted-foreground">{match[1]}</span>
                      </div>
                    )}
                    <pre className={`bg-muted p-4 overflow-x-auto ${match ? 'rounded-b-lg' : 'rounded-lg'}`}>
                      <code className={className} {...props}>
                        {code}
                      </code>
                    </pre>
                  </div>
                );
              },
              img: ({ src, alt }) => (
                src &&



                <Image
                  src={src}
                  alt={alt || ''}
                  width={1200} // provide width & height for Next.js Image
                  height={800}
                  className="w-auto max-h-96 object-contain mx-auto"
                />




              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {children}
                </a>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>

        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="font-semibold text-primary text-lg">
                  {post.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium">Written by {post.author}</p>
                <p className="text-sm text-muted-foreground">
                  Created on   <time dateTime={post.publishedAt}>
                    {new Date(post?.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </p>
              </div>
            </div>

            <Link href="/blog">
              <Button variant="outline">
                ← Back to Blog
              </Button>
            </Link>
          </div>
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Share this post</h3>
            <ShareButtons
              url={`${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}`}
              title={post.title}
              description={post.description}
            />
          </div>
        </footer>
      </article>

      {/* Related Posts Section (Optional) */}
      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">More Articles</h2>
          <p className="text-muted-foreground">Discover other posts you might enjoy</p>
        </div>

        <div className="text-center">
          <Link href="/blog">
            <Button size="lg">
              View All Posts
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}