'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Save, ArrowLeft, ImageIcon, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { calculateReadingTime } from '@/lib/readingTime';

interface PostForm {
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  published: boolean;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  categories: string;
  tags: string;
  canonicalUrl: string;
  readingTime: number;
}

export default function EditBlogPost({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(params.slug !== 'new');
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<PostForm>({
    title: '',
    slug: '',
    description: '',
    content: `# Welcome\n\nStart writing your **blog post** here!\n\n- Point 1\n- Point 2`,
    coverImage: '',
    coverImageAlt: '',
    author: 'Shankalpa Pokharel',
    published: false,
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    categories: '',
    tags: '',
    canonicalUrl: '',
    readingTime: 0,
  });

  // Image upload states
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [inlineImageFile, setInlineImageFile] = useState<File | null>(null);
  const [inlineImageUrl, setInlineImageUrl] = useState<string>('');
  const [isInlineUploading, setIsInlineUploading] = useState(false);
  const [inlineUploadError, setInlineUploadError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (params.slug !== 'new') {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [params.slug]);


  useEffect(() => {
    const readingTime = calculateReadingTime(formData.content);
    // You can display this in the UI if you want
    setFormData({ ...formData, readingTime });
  }, [formData.content]);

  useEffect(() => {
    // if (params.slug === 'new' && formData.title && !formData.slug) {
    const generatedSlug = formData.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // replace spaces with -
      .replace(/[^a-z0-9\-]/g, ''); // remove special characters

    setFormData(prev => ({ ...prev, slug: generatedSlug }));

    // }
  }, [formData.title]);


  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.slug}`);
      const post = await response.json();

      setFormData({
        title: post.title,
        slug: post.slug,
        description: post.description,
        content: post.content,
        coverImage: post.coverImage || '',
        coverImageAlt: post.coverImageAlt || '',
        author: post.author || 'Shankalpa Pokharel',
        published: post.published || false,
        metaTitle: post.metaTitle || '',
        metaDescription: post.metaDescription || '',
        keywords: post.keywords?.join(', ') || '',
        categories: post.categories?.join(', ') || '',
        tags: post.tags?.join(', ') || '',
        canonicalUrl: post.canonicalUrl || '',
        readingTime: post.readingTime || 0,
      });
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (file: File, isInline: boolean = false) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return { error: "Only JPEG, PNG, GIF, or WebP files are allowed." };
    }
    if (file.size > 5 * 1024 * 1024) {
      return { error: "Image size must be less than 5MB." };
    }

    const uploadFunction = isInline ? setIsInlineUploading : setIsUploading;
    const errorFunction = isInline ? setInlineUploadError : setUploadError;

    uploadFunction(true);
    errorFunction(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      if (isInline) {
        setInlineImageUrl(data.url);
        return { url: data.url };
      } else {
        setFormData(prev => ({ ...prev, coverImage: data.url }));
        return { url: data.url };
      }
    } catch (err: any) {
      errorFunction(err.message);
      return { error: err.message };
    } finally {
      uploadFunction(false);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      handleImageUpload(file, false);
    }
  };

  const handleInlineImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInlineImageFile(file);
      handleImageUpload(file, true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
        categories: formData.categories.split(',').map(c => c.trim()).filter(c => c),
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        publishedAt: formData.published ? new Date() : undefined,
      };

      const url = params.slug === 'new'
        ? '/api/posts'
        : `/api/posts/${params.slug}`;

      const method = params.slug === 'new' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/admin/blog');
        router.refresh();
      } else {
        const error = await response.json();
        console.error('Error saving post:', error.error);
        alert(`Error saving post: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex items-center mb-6">
        <Link href="/admin/blog">
          <Button variant="ghost" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Posts
          </Button>
        </Link>

      </div>
      <h2 className="text-xl font-bold mb-4 mr-6">
        {params.slug === 'new' ? 'Create New Post' : 'Edit Post'}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Blog Editing */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>The main content of your blog post.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter post title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  placeholder="URL-friendly slug"
                />
                <p className="text-sm text-muted-foreground">
                  This will be used in the URL: /blog/{formData.slug || 'your-slug'}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Brief description of your post"
                  rows={3}
                />
              </div>

              {/* Cover Image Upload */}
              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div className="flex flex-col gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    disabled={isUploading}
                    name='coverImage'
                  />
                  <Button
                    onClick={() => document.getElementById('coverImageInput')?.click()}
                    disabled={isUploading}
                    variant="outline"
                    size="sm"
                    className="w-fit"
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    {isUploading ? 'Uploading...' : 'Upload Cover Image'}
                  </Button>
                </div>
                {uploadError && <p className="text-sm text-destructive">{uploadError}</p>}
                {formData.coverImage && (
                  <div className="mt-2">
                    <img
                      src={formData.coverImage}
                      alt="Cover preview"
                      className="w-full max-w-xs rounded-md border"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImageAlt">Cover Image Alt Text</Label>
                <Input
                  id="coverImageAlt"
                  name="coverImageAlt"
                  value={formData.coverImageAlt}
                  onChange={handleChange}
                  placeholder="Description for accessibility and SEO"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  placeholder="Write your blog content in Markdown..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>

              {/* Inline Image Upload */}
              <div className="space-y-2">
                <Label>Upload Inline Image</Label>
                <div className="flex flex-col gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleInlineImageChange}
                    disabled={isInlineUploading}
                  />
                  <Button
                    onClick={() => document.getElementById('inlineImageInput')?.click()}
                    disabled={isInlineUploading}
                    variant="outline"
                    size="sm"
                    className="w-fit"
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    {isInlineUploading ? 'Uploading...' : 'Upload Inline Image'}
                  </Button>
                </div>
                {inlineUploadError && <p className="text-sm text-destructive">{inlineUploadError}</p>}
                {inlineImageUrl && (
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <p className="text-sm mb-2 font-medium">Markdown Image URL:</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-background p-2 rounded break-all flex-1">
                        ![alt text]({inlineImageUrl})
                      </code>
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(`![alt text](${inlineImageUrl})`);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        variant="outline"
                        size="sm"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your post for search engines.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  placeholder="If empty, will use the post title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  placeholder="If empty, will use the post description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  placeholder="Comma-separated keywords (e.g., react, nextjs, tutorial)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <Input
                  id="canonicalUrl"
                  name="canonicalUrl"
                  value={formData.canonicalUrl}
                  onChange={handleChange}
                  placeholder="Optional canonical URL for SEO"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Post author name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categories">Categories</Label>
                <Input
                  id="categories"
                  name="categories"
                  value={formData.categories}
                  onChange={handleChange}
                  placeholder="Comma-separated categories (e.g., Technology, Web Development)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Comma-separated tags (e.g., react, javascript, tutorial)"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  name="published"
                  checked={formData.published}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, published: checked as boolean }))
                  }
                />
                <Label htmlFor="published" className="cursor-pointer">
                  Publish this post
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={saving}
                size="lg"
                onClick={handleSubmit}
              >
                <Save className="mr-2 h-4 w-4" />
                {saving ? 'Saving...' : params.slug === 'new' ? 'Create Post' : 'Update Post'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right: Live Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>See how your post will look to readers</CardDescription>
            </CardHeader>
            <CardContent>
              <article className="prose max-w-none">
                <h1>{formData.title || 'Post Title'}</h1>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span>By {formData.author}</span>
                  <span>•</span>
                  <time>{new Date().toLocaleDateString()}</time>
                </div>

                {formData.description && (
                  <p className="text-lg text-muted-foreground">{formData.description}</p>
                )}

                {formData.coverImage && (
                  <div className="my-6">
                    <img
                      src={formData.coverImage}
                      alt={formData.coverImageAlt || formData.title}
                      className="w-full rounded-lg"
                    />
                  </div>
                )}


                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-2xl font-bold mt-5 mb-2">{children}</h3>,
                    p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
                    ul: ({ children }) => <ul className="mb-4 pl-6 list-disc">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-4 pl-6 list-decimal">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 italic mb-4">
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
                        <div className="relative group mb-4">
                          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <code className={className} {...props}>
                              {code}
                            </code>
                          </pre>
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => navigator.clipboard.writeText(code)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    },
                  }}
                >
                  {formData.content}
                </ReactMarkdown>
              </article>
            </CardContent>
          </Card>


        </div>
      </div>
    </div>
  );
}