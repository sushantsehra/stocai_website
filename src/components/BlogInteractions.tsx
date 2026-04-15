"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import type { Comment, UserIntent, DynamicBlogPost } from '@/types/blog';
import Image from 'next/image';
import { auth } from '@/lib/auth/firebase';
import BlogAuthModal from '@/components/BlogAuthModal';
import { getAuthCookie } from '@/utils/cookies';

interface BlogInteractionsProps {
  blog: DynamicBlogPost;
}

export default function BlogInteractions({ blog }: BlogInteractionsProps) {
  const { user } = useUser();
  const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState(blog.like_count || 0);
  const [commentCount, setCommentCount] = useState(blog.comment_count || 0);
  const [isLoading, setIsLoading] = useState(true);
  const [interactionApiAvailable, setInteractionApiAvailable] = useState(Boolean(backendApiUrl));
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const processedIntentKeyRef = useRef<string | null>(null);

  const getAuthorizationHeader = useCallback(async () => {
    const communityToken = getAuthCookie('community_access_token');
    if (communityToken) {
      return { Authorization: `Bearer ${communityToken}` };
    }

    const currentUser = auth.currentUser;

    if (!currentUser) {
      return null;
    }

    const token = await currentUser.getIdToken();
    return { Authorization: `Bearer ${token}` };
  }, []);

  const openAuthModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  useEffect(() => {
    // Check if user has liked this blog
    const likedKey = `liked-${blog.blog_id}`;
    setLiked(localStorage.getItem(likedKey) === 'true');
  }, [blog.blog_id]);

  // Function to fetch current blog stats and comments
  const fetchBlogData = useCallback(async () => {
    if (!backendApiUrl || !interactionApiAvailable) {
      setIsLoading(false);
      return;
    }

    try {
      const [blogResponse, commentsResponse] = await Promise.all([
        fetch(`${backendApiUrl}/blog/${blog.blog_id}`),
        fetch(`${backendApiUrl}/blogs/comment/${blog.blog_id}`)
      ]);

      if (blogResponse.status === 404) {
        setInteractionApiAvailable(false);
        return;
      }

      if (blogResponse.ok) {
        const blogData = await blogResponse.json();
        setLikes(blogData.like_count || 0);
        setCommentCount(blogData.comment_count || 0);
      } else if (blogResponse.status >= 500) {
        console.warn('Blog interaction stats are temporarily unavailable.');
      }

      if (commentsResponse.ok) {
        const commentsData = await commentsResponse.json();
        const sortedComments = commentsData.sort(
          (a: Comment, b: Comment) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setComments(sortedComments);
        setCommentCount(sortedComments.length);
      } else if (commentsResponse.status === 404) {
        setComments([]);
      } else if (commentsResponse.status >= 500) {
        console.warn('Blog comments are temporarily unavailable.');
      }
    } catch {
      setInteractionApiAvailable(false);
    } finally {
      setIsLoading(false);
    }
  }, [backendApiUrl, blog.blog_id, interactionApiAvailable]);

  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);


  const handleLike = useCallback(async () => {
    if (!user?.user_id) {
      saveUserIntent('like', blog.blog_id);
      openAuthModal();
      return;
    }

    if (!backendApiUrl || !interactionApiAvailable) {
      return;
    }

    try {
      const authHeader = await getAuthorizationHeader();
      if (!authHeader) {
        saveUserIntent('like', blog.blog_id);
        openAuthModal();
        return;
      }

      const response = await fetch(
        `${backendApiUrl}/blogs/${blog.blog_id}/like`,
        {
          method: 'POST',
          headers: authHeader,
        }
      );

      if (response.status === 404) {
        setInteractionApiAvailable(false);
        return;
      }

      if (!response.ok) {
        console.warn('Unable to update blog like right now.');
        const errorData = await response.json().catch(() => null);
        if (errorData?.detail === "User already liked this blog") {
          setLiked(true);
          localStorage.setItem(`liked-${blog.blog_id}`, 'true');
          fetchBlogData();
        }
        return;
      }

      setLiked(true);
      localStorage.setItem(`liked-${blog.blog_id}`, 'true');
      
      fetchBlogData();
    } catch {
      console.warn('Unable to update blog like right now.');
    }
  }, [user, backendApiUrl, interactionApiAvailable, blog.blog_id, fetchBlogData, getAuthorizationHeader, openAuthModal]);

  const handleAddComment = useCallback(async (text?: string) => {
    const commentContent = text || commentText.trim();
    
    if (!user?.user_id) {
      saveUserIntent('comment', blog.blog_id, commentContent);
      openAuthModal();
      return;
    }

    if (!commentContent) return;

    if (!backendApiUrl || !interactionApiAvailable) {
      return;
    }

    setCommentText('');

    try {
      const authHeader = await getAuthorizationHeader();
      if (!authHeader) {
        saveUserIntent('comment', blog.blog_id, commentContent);
        openAuthModal();
        return;
      }

      const response = await fetch(
        `${backendApiUrl}/blogs/${blog.blog_id}/comment`,
        {
          method: 'POST',
          headers: {
            ...authHeader,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: commentContent,
          }),
        }
      );

      if (response.status === 404) {
        setInteractionApiAvailable(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      fetchBlogData();
    } catch {
      console.warn('Unable to post comment right now.');
    }
  }, [user, backendApiUrl, interactionApiAvailable, blog.blog_id, commentText, fetchBlogData, getAuthorizationHeader, openAuthModal]);

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
        const intentKey = JSON.stringify(intent);
        if (processedIntentKeyRef.current === intentKey) {
          return;
        }

        const executeIntent = async () => {
          processedIntentKeyRef.current = intentKey;
          localStorage.removeItem('userIntent');

          if (intent.actionType === 'like' && !liked && user) {
            await handleLike();
          } else if (intent.actionType === 'comment' && intent.payload && user) {
            setCommentText(intent.payload);
            await handleAddComment(intent.payload);
          }
        };

        executeIntent();
      } else {
        localStorage.removeItem('userIntent');
      }
    } catch (error) {
      console.error('Error parsing user intent:', error);
      localStorage.removeItem('userIntent');
    }
  }, [user, blog.blog_id, liked, handleLike, handleAddComment]);

  const saveUserIntent = (actionType: 'like' | 'comment', blogId: string, payload?: string) => {
    const intent: UserIntent = {
      actionType,
      blogId,
      payload,
      timestamp: Date.now(),
    };
    localStorage.setItem('userIntent', JSON.stringify(intent));
  };


  if (isLoading) {
    return <div className="mt-6">Loading interactions...</div>;
  }

  return (
    <div className="mt-6">
      <BlogAuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <hr className="mb-6" />
      
      <div className="flex items-center gap-4 text-[#323232] mb-4">
        <button
          className={`flex cursor-pointer items-center gap-1 transition-colors ${
            liked ? 'blog-accent-text' : 'hover:text-[#0B64F4]'
          }`}
          onClick={handleLike}
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
          className="blog-input w-full resize-none rounded-lg p-3"
          placeholder={interactionApiAvailable ? "Add a comment..." : "Comments are unavailable right now."}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={3}
          disabled={!interactionApiAvailable}
        />
        <button
          onClick={() => handleAddComment()}
          disabled={!commentText.trim() || !interactionApiAvailable}
          className="blog-accent-bg mt-2 rounded-lg px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
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
  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.username)}&background=0B64F4&color=fff`}
  alt={comment.username}
  width={32} // w-8 = 32px
  height={32}
  className="rounded-full mr-3"
/>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#323232]">
                      {comment.username}
                    </p>
                    <p className="text-xs text-[#323232]">
                      {new Date(comment.created_at).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-[#323232]">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 
