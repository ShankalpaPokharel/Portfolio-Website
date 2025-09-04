export interface Post {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  publishedAt: string;
  readingTime: number;
  views: number;
}

export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts?published=true`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    return data.posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}