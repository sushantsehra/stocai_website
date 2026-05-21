import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const originalBackendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

beforeEach(() => {
  vi.resetModules();
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  process.env.NEXT_PUBLIC_BACKEND_API_URL = originalBackendUrl;
  vi.restoreAllMocks();
});

describe("blogPosts data helpers", () => {
  test("returns an empty list when backend URL is not configured", async () => {
    delete process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { getAllBlogPosts } = await import("./blogPosts");

    await expect(getAllBlogPosts()).resolves.toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith("Backend blog API URL not configured");
  });

  test("fetches, transforms, and sorts backend blog posts", async () => {
    process.env.NEXT_PUBLIC_BACKEND_API_URL = "https://api.example.test";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [
        {
          blog_id: "old",
          title: "Older Post!",
          subtitle: "Older subtitle",
          description: "Older body",
          username: "Editor",
          created_at: "2026-01-01T00:00:00Z",
          blog_tags: " leadership, , growth ",
          like_count: 2,
          comment_count: 3,
        },
        {
          blog_id: "new",
          title: "Newest Post",
          description: "Newest body",
          created_at: "2026-03-10T00:00:00Z",
          blog_tags: ["career", "strategy"],
        },
      ],
    });
    vi.stubGlobal("fetch", fetchMock);

    const { getAllBlogPosts } = await import("./blogPosts");

    await expect(getAllBlogPosts()).resolves.toEqual([
      expect.objectContaining({
        id: "new",
        title: "Newest Post",
        slug: "newest-post",
        excerpt: "Newest body...",
        author: "Better Corporate Life",
        tags: ["career", "strategy"],
        like_count: 0,
        comment_count: 0,
      }),
      expect.objectContaining({
        id: "old",
        title: "Older Post!",
        slug: "older-post",
        excerpt: "Older subtitle",
        author: "Editor",
        tags: ["leadership", "growth"],
        like_count: 2,
        comment_count: 3,
      }),
    ]);
    expect(fetchMock).toHaveBeenCalledWith("https://api.example.test/blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });
  });

  test("returns undefined for missing backend URL when fetching a single post", async () => {
    delete process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const { getBlogPost, getBlogPostById } = await import("./blogPosts");

    await expect(getBlogPost("a-post")).resolves.toBeUndefined();
    await expect(getBlogPostById("post-id")).resolves.toBeUndefined();
  });

  test("derives counts from fetched blog detail", async () => {
    process.env.NEXT_PUBLIC_BACKEND_API_URL = "https://api.example.test";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          blog_id: "post-id",
          title: "Count Post",
          description: "Body",
          created_at: "2026-01-01T00:00:00Z",
          like_count: 7,
          comment_count: 4,
        }),
      })
    );

    const { getBlogLikeCount, getBlogCommentCount } = await import("./blogPosts");

    await expect(getBlogLikeCount("post-id")).resolves.toBe(7);
    await expect(getBlogCommentCount("post-id")).resolves.toBe(4);
  });
});
