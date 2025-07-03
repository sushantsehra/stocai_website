# Dynamic Blog Features

This Next.js blog implementation supports both static and dynamic blog features including likes and comments. The system is designed to work with static blog posts by default, with optional dynamic features when connected to a backend API.

## Features

### Static Features (Always Available)
- Server-side rendered blog posts
- SEO optimized with metadata and structured data
- Static generation for fast loading
- Related posts
- Responsive design

### Dynamic Features (Requires Backend API)
- User authentication
- Like functionality
- Comment system
- User intent preservation (likes/comments are saved when users need to sign up)

## Configuration

### Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Backend API URL for dynamic blog features
# Leave empty or omit to disable dynamic features
NEXT_PUBLIC_BACKEND_API_URL=your-backend-api-url

# Examples:
# Development: NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8000
# Production: NEXT_PUBLIC_BACKEND_API_URL=https://your-api-domain.com
```

### Backend API Requirements

If you want to enable dynamic features, your backend API should provide the following endpoints:

#### Like a Blog Post
```
POST /blogs/{blog_id}/like?user_id={user_id}
```

#### Get Comments for a Blog Post
```
GET /blogs/comment/{blog_id}
Response: Array of comments with structure:
{
  comment_id: string,
  user_id: string,
  text: string,
  username: string,
  blog_id: string,
  created_at: string
}
```

#### Add a Comment
```
POST /blogs/{blog_id}/comment
Body: {
  user_id: string,
  text: string,
  username: string
}
```

## File Structure

```
src/
├── app/blog/[slug]/
│   ├── page.tsx          # Main blog page with metadata
│   └── blog.tsx          # Blog component with dynamic features
├── components/
│   └── BlogInteractions.tsx  # Client component for likes/comments
├── contexts/
│   └── UserContext.tsx   # User authentication context
├── types/
│   └── blog.ts          # TypeScript interfaces
└── data/
    └── blogPosts.ts     # Static blog data
```

## Usage

### Static Mode (Default)
When no `NEXT_PUBLIC_BACKEND_API_URL` is provided, the blog will:
- Display static blog content
- Show placeholder interaction buttons (likes/comments)
- Redirect to signup page when users try to interact

### Dynamic Mode (With Backend)
When `NEXT_PUBLIC_BACKEND_API_URL` is configured, the blog will:
- Display static blog content
- Enable real-time likes and comments
- Store user interactions in the backend
- Preserve user intent across login sessions

## User Authentication

The system includes a demo authentication system:
- Users can sign up with basic information
- Demo user option for quick testing
- User data is stored in localStorage (replace with real auth in production)
- Supports redirect back to blog after signup

## Extending the System

### Adding New Blog Posts
Add new posts to `src/data/blogPosts.ts`:

```typescript
{
  id: "unique-id",
  title: "Your Blog Title",
  slug: "your-blog-slug",
  excerpt: "Brief description",
  content: "Full markdown content",
  date: "January 1, 2024",
  author: "Author Name",
  imageUrl: "/path/to/image.jpg",
  tags: ["tag1", "tag2"]
}
```

### Customizing Styles
The components use Tailwind CSS classes. Key design elements:
- Primary color: `#54B0AF` (teal)
- Hover states with color variations
- Responsive design breakpoints
- Consistent spacing and typography

### Backend Integration
To integrate with a real backend:
1. Replace the mock authentication in `UserContext.tsx`
2. Update API endpoints in `BlogInteractions.tsx`
3. Add error handling and loading states
4. Implement proper user session management

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The blog pages are statically generated for optimal performance while maintaining dynamic interaction capabilities. 