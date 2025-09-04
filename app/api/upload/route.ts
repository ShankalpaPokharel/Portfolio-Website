// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   const formData = await req.formData();
//   const file = formData.get('file');

//   if (!file || typeof file === 'string') {
//     return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
//   }

//   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
// const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;


//   if (!cloudName || !uploadPreset) {
//     return NextResponse.json({ error: 'Missing Cloudinary config' }, { status: 500 });
//   }

//   const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

//   const cloudinaryForm = new FormData();
//   cloudinaryForm.append('file', file);
//   cloudinaryForm.append('upload_preset', uploadPreset);

//   try {
//     const uploadRes = await fetch(cloudinaryUrl, {
//       method: 'POST',
//       body: cloudinaryForm,
//     });

//     const data = await uploadRes.json();

//     if (!uploadRes.ok) {
//       return NextResponse.json({ error: data.error?.message || 'Upload failed' }, { status: 400 });
//     }

//     return NextResponse.json({ url: data.secure_url });
//   } catch (err) {
//     return NextResponse.json({ error: 'Server error' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return NextResponse.json({ error: 'Missing Cloudinary config' }, { status: 500 });
  }

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const cloudinaryForm = new FormData();
  cloudinaryForm.append('file', file);
  cloudinaryForm.append('upload_preset', uploadPreset);

  try {
    const uploadRes = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: cloudinaryForm,
    });

    const data = await uploadRes.json();

    if (!uploadRes.ok) {
      return NextResponse.json({ error: data.error?.message || 'Upload failed' }, { status: 400 });
    }

    return NextResponse.json({ url: data.secure_url });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}