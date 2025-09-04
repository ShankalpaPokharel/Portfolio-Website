// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
// import Post from '@/models/Post';

// export async function POST(request: NextRequest) {
//   try {
//     await dbConnect();
//     const body = await request.json();
    
//     // Check if slug already exists
//     const existingPost = await Post.findOne({ slug: body.slug });
//     if (existingPost) {
//       return NextResponse.json(
//         { error: 'Slug already exists' },
//         { status: 400 }
//       );
//     }
    
//     const post = await Post.create(body);
//     return NextResponse.json(post, { status: 201 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }

// // Add to the existing route.ts
// export async function GET(request: NextRequest) {
//   try {
//     await dbConnect();
    
//     const { searchParams } = new URL(request.url);
//     const published = searchParams.get('published');
//     const page = parseInt(searchParams.get('page') || '1');
//     const limit = parseInt(searchParams.get('limit') || '10');
//     const skip = (page - 1) * limit;
    
//     let query = {};
//     if (published === 'true') {
//       query = { published: true };
//     }
    
//     const posts = await Post.find(query)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();
    
//     const total = await Post.countDocuments(query);
    
//     return NextResponse.json({
//       posts,
//       pagination: {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });
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

import { cookies } from 'next/headers';

function isAuthenticated() {
  const session = cookies().get('admin_session');
  return !!session;
}

export async function POST(request: NextRequest) {
    if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await dbConnect();
    console.log('Connected to MongoDB');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    // Check if slug already exists
    const existingPost = await Post.findOne({ slug: body.slug });
    if (existingPost) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }
    
    const post = await Post.create(body);
    console.log('Post created successfully:', post);
    
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    console.log('Connected to MongoDB for GET');
    
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    let query = {};
    if (published === 'true') {
      query = { published: true };
    }
    else{
    //to show only published posts if user is reqesting unpublished, check if user is authenticated
    if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
    }

    
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Post.countDocuments(query);
    
    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}