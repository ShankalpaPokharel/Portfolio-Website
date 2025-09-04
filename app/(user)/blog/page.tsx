import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Clock } from 'lucide-react';
import Image from 'next/image';
import { getPosts } from './getPosts';
import BlogLists from './BlogLists';


export const metadata: Metadata = {
  title: 'Blog - My Portfolio',
  description: 'Read the latest articles and tutorials from my blog.',
};



export default async function BlogPage() {

  const posts = await getPosts();

  return (
    <BlogLists posts={posts} />
  );
}