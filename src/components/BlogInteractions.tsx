"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { getSignupUrl } from '@/utils/env';
import type { Comment, UserIntent, DynamicBlogPost } from '@/types/blog';
import Image from 'next/image';

interface BlogInteractionsProps {
  blog: DynamicBlogPost;
  slug: string;
}

export default function BlogInteractions({ blog, slug }: BlogInteractionsProps) {
  const { user } = useUser();
  const router = useRouter();
  
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState(blog.like_count || 0);
  const [commentCount, setCommentCount] = useState(blog.comment_count || 0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has liked this blog
    const likedKey = `liked-${blog.blog_id}`;
    setLiked(localStorage.getItem(likedKey) === 'true');
  }, [blog.blog_id]);

  // Function to fetch current blog stats and comments
  const fetchBlogData = async () => {
    if (!process.env.NEXT_PUBLIC_BACKEND_API_URL) {
      setIsLoading(false);
      return;
    }

    try {
      // Fetch both blog data and comments
      const [blogResponse, commentsResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blog/${blog.blog_id}`),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blogs/comment/${blog.blog_id}`)
      ]);

      // Update like count from blog data
      if (blogResponse.ok) {
        const blogData = await blogResponse.json();
        setLikes(blogData.like_count || 0);
        setCommentCount(blogData.comment_count || 0);
      } else {
        console.error('Failed to fetch blog data:', blogResponse.status);
      }

      // Update comments and comment count from comments data
      if (commentsResponse.ok) {
        const commentsData = await commentsResponse.json();
        console.log('Comments data fetched:', commentsData);
        const sortedComments = commentsData.sort(
          (a: Comment, b: Comment) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setComments(sortedComments);
        // Use the actual comments length if backend comment_count seems off
        setCommentCount(sortedComments.length);
      } else {
        console.error('Failed to fetch comments:', commentsResponse.status);
      }
    } catch (err) {
      console.error('Error fetching blog data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [blog.blog_id]);

  useEffect(() => {
    // Handle stored user intent after login
    const intentStr = localStorage.getItem('userIntent');
    if (!intentStr) return;

    try {
      const intent: UserIntent = JSON.parse(intentStr);
      
      if (
        intent.blogId === blog.blog_id &&
        Date.now() - intent.timestamp < 5 * 60 * 1000 // 5-minute window
      ) {
        const executeIntent = async () => {
          if (intent.actionType === 'like' && !liked && user) {
            await handleLike();
          } else if (intent.actionType === 'comment' && intent.payload && user) {
            setCommentText(intent.payload);
            await handleAddComment(intent.payload);
          }
          localStorage.removeItem('userIntent');
        };

        executeIntent();
      }
    } catch (error) {
      console.error('Error parsing user intent:', error);
      localStorage.removeItem('userIntent');
    }
  }, [user, blog.blog_id, liked]);

  const saveUserIntent = (actionType: 'like' | 'comment', blogId: string, payload?: string) => {
    const intent: UserIntent = {
      actionType,
      blogId,
      payload,
      timestamp: Date.now(),
    };
    localStorage.setItem('userIntent', JSON.stringify(intent));
  };

  const handleLike = async () => {
    if (!user?.user_id) {
      saveUserIntent('like', blog.blog_id);
      router.push(getSignupUrl(`/blog/${slug}`));
      return;
    }

    if (!process.env.NEXT_PUBLIC_BACKEND_API_URL) {
      console.error('Backend API URL not configured');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blogs/${blog.blog_id}/like?user_id=${user.user_id}`,
        { method: 'POST' }
      );

      if (!response.ok) {
        console.error('Like failed');
        const errorData = await response.json();
        if (errorData.detail === "User already liked this blog") {
          setLiked(true);
          localStorage.setItem(`liked-${blog.blog_id}`, 'true');
        }
        return;
      }

      setLiked(true);
      localStorage.setItem(`liked-${blog.blog_id}`, 'true');
      
      // Refetch blog data to get updated counts
      fetchBlogData();
    } catch (err) {
      console.error('Error liking blog:', err);
    }
  };

  const handleAddComment = async (text?: string) => {
    const commentContent = text || commentText.trim();
    
    if (!user?.user_id) {
      saveUserIntent('comment', blog.blog_id, commentContent);
      router.push(getSignupUrl(`/blog/${slug}`));
      return;
    }

    if (!commentContent) return;

    if (!process.env.NEXT_PUBLIC_BACKEND_API_URL) {
      console.error('Backend API URL not configured');
      return;
    }

    setCommentText('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blogs/${blog.blog_id}/comment`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user.user_id,
            text: commentContent,
            username: `${user.firstName} ${user.lastName}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      // Refetch blog data to get updated comments and counts
      fetchBlogData();
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  if (isLoading) {
    return <div className="mt-6">Loading interactions...</div>;
  }

  return (
    <div className="mt-6">
      <hr className="mb-6" />
      
      <div className="flex items-center gap-4 text-gray-600 mb-4">
        <button
          className={`flex items-center gap-1 transition-colors ${
            liked ? 'text-blue-600' : 'hover:text-blue-600'
          }`}
          onClick={handleLike}
          disabled={liked}
        >
          <ThumbsUp className="w-4 h-4" />
          {likes}
        </button>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          {commentCount}
        </div>
      </div>

      <div className="mb-6">
        <textarea
          className="w-full border border-gray-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#54B0AF] focus:border-transparent"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={3}
        />
        <button
          onClick={() => handleAddComment()}
          disabled={!commentText.trim()}
          className="mt-2 px-4 py-2 bg-[#54B0AF] text-white rounded-lg hover:bg-[#459190] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Post Comment
        </button>
      </div>

      {comments.length > 0 && (
        <div>
          <h4 className="font-semibold mb-4 text-lg">Comments ({commentCount})</h4>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.comment_id}
                className="border border-gray-200 p-4 rounded-lg bg-gray-50"
              >
                <div className="flex items-center mb-2">
<Image
  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.username)}&background=54B0AF&color=fff`}
  alt={comment.username}
  width={32} // w-8 = 32px
  height={32}
  className="rounded-full mr-3"
/>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {comment.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.created_at).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 