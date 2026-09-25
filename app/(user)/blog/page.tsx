import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Clock } from 'lucide-react';
import Image from 'next/image';
import { getPosts } from './getPosts';
import BlogLists from './BlogLists';


export const metadata: Metadata = {
  title: 'Blog | Shankalpa Pokharel - Web Development Articles & Tutorials',
  description: 'Read the latest web development articles, tutorials, and insights by Shankalpa Pokharel. Topics include Next.js, React, JavaScript, MERN stack, and more.',
  alternates: {
    canonical: 'https://www.shankalpapokharel.com.np/blog',
  },
  openGraph: {
    title: 'Blog | Shankalpa Pokharel',
    description: 'Web development articles and tutorials by Shankalpa Pokharel.',
    type: 'website',
    url: 'https://www.shankalpapokharel.com.np/blog',
  },
};



export default async function BlogPage() {

  const posts = await getPosts();

  return (
    <BlogLists posts={posts} />
  );
}