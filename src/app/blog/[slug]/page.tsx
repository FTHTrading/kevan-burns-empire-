import BlogPostClient from './BlogPostClient';
import blogData from '@/data/blog-posts.json';

export function generateStaticParams() {
  return blogData.posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
