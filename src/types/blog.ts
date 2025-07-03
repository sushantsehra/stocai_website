export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  imageUrl?: string;
  tags: string[];
}

export interface DynamicBlogPost {
  blog_id: string;
  title: string;
  description: string;
  username: string;
  created_at: string;
  image_url?: string;
  blog_tags?: string;
  like_count: number;
  comment_count?: number;
}

export interface Comment {
  comment_id: string;
  user_id: string;
  text: string;
  username: string;
  blog_id: string;
  created_at: string;
}

export interface UserIntent {
  actionType: 'like' | 'comment';
  blogId: string;
  payload?: string;
  timestamp: number;
} 