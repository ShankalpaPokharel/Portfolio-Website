import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET() {
  try {
    await dbConnect();
    
    // Test connection by counting documents
    const count = await Post.countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connected successfully',
      postCount: count
    });
  } catch (error: any) {
    console.error('MongoDB connection test failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Check your MONGODB_URI in .env.local'
    }, { status: 500 });
  }
}