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
  like_count?: number;
  comment_count?: number;
}

interface BackendBlogPost {
  blog_id: string;
  title: string;
  subtitle?: string;
  slug?: string;
  description: string;
  username?: string;
  created_at: string;
  image_url?: string;
  blog_tags?: string[] | string;
  content?: string;
  excerpt?: string;
  like_count?: number;
  comment_count?: number;
}

function getBackendUrl(): string | null {
  return process.env.NEXT_PUBLIC_BACKEND_API_URL || null;
}

function normalizeTags(tags?: string[] | string): string[] {
  if (!tags) {
    return [];
  }

  if (Array.isArray(tags)) {
    return tags.map((tag) => tag.trim()).filter(Boolean);
  }

  return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function transformBackendBlogPost(backendPost: BackendBlogPost): BlogPost {
  return {
    id: backendPost.blog_id,
    title: backendPost.title,
    slug: backendPost.slug || generateSlug(backendPost.title),
    excerpt: backendPost.excerpt || backendPost.subtitle || `${backendPost.description.substring(0, 200)}...`,
    content: backendPost.content || backendPost.description,
    date: new Date(backendPost.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    author: backendPost.username || "Better Corporate Life",
    imageUrl: backendPost.image_url,
    tags: normalizeTags(backendPost.blog_tags),
    like_count: backendPost.like_count || 0,
    comment_count: backendPost.comment_count || 0,
  };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const backendUrl = getBackendUrl();

  if (!backendUrl) {
    console.warn("Backend blog API URL not configured");
    return [];
  }

  try {
    const response = await fetch(`${backendUrl}/blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const backendPosts: BackendBlogPost[] = await response.json();
    const transformedPosts = backendPosts.map(transformBackendBlogPost);

    return transformedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Failed to fetch blog posts from backend:", error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  if (!getBackendUrl()) {
    console.warn("Backend blog API URL not configured");
    return undefined;
  }

  try {
    const allPosts = await getAllBlogPosts();
    return allPosts.find((post) => post.slug === slug);
  } catch (error) {
    console.error(`Failed to fetch blog post with slug ${slug}:`, error);
    return undefined;
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | undefined> {
  const backendUrl = getBackendUrl();

  if (!backendUrl) {
    console.warn("Backend blog API URL not configured");
    return undefined;
  }

  try {
    const response = await fetch(`${backendUrl}/blog/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const backendPost: BackendBlogPost = await response.json();
    return transformBackendBlogPost(backendPost);
  } catch (error) {
    console.error(`Failed to fetch blog post with ID ${id}:`, error);
    return undefined;
  }
}

export async function getRecentBlogPosts(count: number = 3): Promise<BlogPost[]> {
  try {
    const allPosts = await getAllBlogPosts();
    return allPosts.slice(0, count);
  } catch (error) {
    console.error("Failed to fetch recent blog posts:", error);
    return [];
  }
}

export async function getBlogLikeCount(blogId: string): Promise<number> {
  const post = await getBlogPostById(blogId);
  return post?.like_count || 0;
}

export async function getBlogCommentCount(blogId: string): Promise<number> {
  const post = await getBlogPostById(blogId);
  return post?.comment_count || 0;
}
