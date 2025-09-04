import EditBlogPost from '../edit/[slug]/page';

// This reuses the same component as the edit page
// but with an empty form for creating a new post
export default function NewBlogPost() {
  return <EditBlogPost params={{ slug: 'new' }} />;
}