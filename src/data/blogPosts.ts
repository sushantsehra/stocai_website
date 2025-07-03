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

// Backend blog post interface - adjust based on your actual API response
interface BackendBlogPost {
  blog_id: string;
  title: string;
  slug?: string;
  description: string;
  username: string;
  created_at: string;
  image_url?: string;
  blog_tags?: string;
  content?: string;
  excerpt?: string;
  like_count?: number;
  comment_count?: number;
}

// Fallback data for when backend is unavailable or during build
const fallbackBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How AI is Revolutionizing Investment Strategies",
    slug: "ai-revolutionizing-investment-strategies",
    excerpt: "Discover how artificial intelligence is transforming traditional investment approaches and creating new opportunities for investors.",
    content: `# How AI is Revolutionizing Investment Strategies

Artificial intelligence has become a game-changer in the investment world. From algorithmic trading to risk assessment, AI tools are helping investors make better decisions and achieve higher returns.

## The Rise of AI in Finance

Over the past decade, we've seen a significant increase in the adoption of AI technologies across the financial sector. Investment firms are leveraging machine learning algorithms to analyze market trends, predict price movements, and identify investment opportunities that human analysts might miss.

## Key Benefits of AI-Powered Investing

- **Enhanced Data Analysis**: AI can process vast amounts of data from multiple sources in real-time
- **Reduced Emotional Bias**: Algorithms make decisions based on data, not emotions
- **Improved Risk Management**: AI can identify potential risks before they become problems
- **24/7 Market Monitoring**: Continuous analysis without human limitations

## How Stocai is Leading the Way

At Stocai, we're combining cutting-edge AI with human expertise to create investment strategies that outperform traditional approaches. Our platform uses advanced machine learning models to analyze market data, identify patterns, and generate actionable insights for investors.`,
    date: "June 15, 2023",
    author: "Sarah Johnson",
    imageUrl: "/blog/ai-investing.jpg",
    tags: ["AI", "Investment", "Technology"],
    like_count: 0,
    comment_count: 0
  },
  {
    id: "2",
    title: "Understanding Market Volatility Through Data Science",
    slug: "understanding-market-volatility-data-science", 
    excerpt: "Learn how data science techniques can help investors navigate and profit from market volatility.",
    content: `# Understanding Market Volatility Through Data Science

Market volatility can be intimidating for many investors, but with the right data science approaches, it can also present unique opportunities. This article explores how modern analytical techniques are changing the way we understand and respond to market fluctuations.

## The Nature of Volatility

Volatility is often misunderstood as simply "risk," but it's more accurately described as the rate at which prices increase or decrease. High volatility means prices change rapidly in either direction, while low volatility indicates more stable price movements.

## Measuring Volatility with Data Science

Data scientists use various metrics to quantify volatility:

1. **Standard Deviation**: Measures the dispersion of returns
2. **Beta**: Compares an asset's volatility to the market
3. **VIX Index**: The market's expectation of 30-day volatility`,
    date: "July 3, 2023",
    author: "Michael Chen",
    imageUrl: "/blog/market-volatility.jpg",
    tags: ["Data Science", "Volatility", "Risk Management"],
    like_count: 0,
    comment_count: 0
  }
];

// Helper function to convert backend blog post to frontend format
function transformBackendBlogPost(backendPost: BackendBlogPost): BlogPost {
  return {
    id: backendPost.blog_id,
    title: backendPost.title,
    slug: backendPost.slug || generateSlug(backendPost.title),
    excerpt: backendPost.excerpt || backendPost.description.substring(0, 200) + '...',
    content: backendPost.content || backendPost.description,
    date: new Date(backendPost.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    }),
    author: backendPost.username,
    imageUrl: backendPost.image_url,
    tags: backendPost.blog_tags ? backendPost.blog_tags.split(',').map(tag => tag.trim()) : [],
    like_count: backendPost.like_count || 0,
    comment_count: backendPost.comment_count || 0
  };
}

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Get backend URL from environment variable
function getBackendUrl(): string | null {
  return process.env.NEXT_PUBLIC_BACKEND_API_URL || null;
}

// Fetch all blog posts from backend
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const backendUrl = getBackendUrl();
  
  if (!backendUrl) {
    console.warn('Backend URL not configured, using fallback data');
    return fallbackBlogPosts;
  }

  try {
    const response = await fetch(`${backendUrl}/blogs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // For static generation, we don't want to cache this
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const backendPosts: BackendBlogPost[] = await response.json();
    
    // Transform backend posts to frontend format
    const transformedPosts = backendPosts.map(transformBackendBlogPost);
    
    // Sort by date (newest first)
    return transformedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Failed to fetch blog posts from backend:', error);
    console.log('Falling back to default blog posts');
    return fallbackBlogPosts;
  }
}

// Fetch a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const backendUrl = getBackendUrl();
  
  if (!backendUrl) {
    console.warn('Backend URL not configured, using fallback data');
    return fallbackBlogPosts.find(post => post.slug === slug);
  }

  try {
    // Try to get all posts first and find by slug
    // Alternatively, if your backend supports getting by slug: `${backendUrl}/blogs/slug/${slug}`
    const allPosts = await getAllBlogPosts();
    return allPosts.find(post => post.slug === slug);
  } catch (error) {
    console.error(`Failed to fetch blog post with slug ${slug}:`, error);
    return fallbackBlogPosts.find(post => post.slug === slug);
  }
}

// Fetch a single blog post by ID (for backend compatibility)
export async function getBlogPostById(id: string): Promise<BlogPost | undefined> {
  const backendUrl = getBackendUrl();
  
  if (!backendUrl) {
    console.warn('Backend URL not configured, using fallback data');
    return fallbackBlogPosts.find(post => post.id === id);
  }

  try {
    const response = await fetch(`${backendUrl}/blogs/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const backendPost: BackendBlogPost = await response.json();
    return transformBackendBlogPost(backendPost);
  } catch (error) {
    console.error(`Failed to fetch blog post with ID ${id}:`, error);
    return fallbackBlogPosts.find(post => post.id === id);
  }
}

// Get recent blog posts
export async function getRecentBlogPosts(count: number = 3): Promise<BlogPost[]> {
  try {
    const allPosts = await getAllBlogPosts();
    return allPosts.slice(0, count);
  } catch (error) {
    console.error('Failed to fetch recent blog posts:', error);
    return fallbackBlogPosts.slice(0, count);
  }
}

// Fetch current like count for a specific blog post
export async function getBlogLikeCount(blogId: string): Promise<number> {
  const backendUrl = getBackendUrl();
  
  if (!backendUrl) {
    console.warn('Backend URL not configured, returning 0 likes');
    return 0;
  }

  try {
    const response = await fetch(`${backendUrl}/blogs/${blogId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const backendPost: BackendBlogPost = await response.json();
    return backendPost.like_count || 0;
  } catch (error) {
    console.error(`Failed to fetch like count for blog ${blogId}:`, error);
    return 0;
  }
}

// Fetch current comment count for a specific blog post
export async function getBlogCommentCount(blogId: string): Promise<number> {
  const backendUrl = getBackendUrl();
  
  if (!backendUrl) {
    console.warn('Backend URL not configured, returning 0 comments');
    return 0;
  }

  try {
    const response = await fetch(`${backendUrl}/blogs/${blogId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const backendPost: BackendBlogPost = await response.json();
    return backendPost.comment_count || 0;
  } catch (error) {
    console.error(`Failed to fetch comment count for blog ${blogId}:`, error);
    return 0;
  }
}

// Static fallback for build time when backend might not be available
export function getAllBlogPostsSync(): BlogPost[] {
  return fallbackBlogPosts;
}

export function getBlogPostSync(slug: string): BlogPost | undefined {
  return fallbackBlogPosts.find(post => post.slug === slug);
} 