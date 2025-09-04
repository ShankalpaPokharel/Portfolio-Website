// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
// import Post from '@/models/Post';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { slug: string } }
// ) {
//   try {
//     await dbConnect();
//     const post = await Post.findOne({ slug: params.slug });
    
//     if (!post) {
//       return NextResponse.json(
//         { error: 'Post not found' },
//         { status: 404 }
//       );
//     }
    
//     // Increment view count
//     if (post.published) {
//       await Post.findByIdAndUpdate(post._id, { $inc: { views: 1 } });
//     }
    
//     return NextResponse.json(post);
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params.slug });
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Only increment views for published posts
    if (post.published) {
      // Use atomic update to avoid race conditions
      await Post.findByIdAndUpdate(
        post._id,
        { $inc: { views: 1 } },
        { new: true }
      );
    }
    
    return NextResponse.json(post);
  } catch (error: any) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // If slug is being updated, check if new slug exists
    if (body.slug && body.slug !== params.slug) {
      const existingPost = await Post.findOne({ slug: body.slug });
      if (existingPost) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }
    
    const post = await Post.findOneAndUpdate(
      { slug: params.slug },
      body,
      { new: true, runValidators: true }
    );
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const post = await Post.findOneAndDelete({ slug: params.slug });
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}