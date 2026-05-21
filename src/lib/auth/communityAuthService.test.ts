import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("firebase/auth", () => ({
  signInWithPopup: vi.fn(),
}));

vi.mock("./firebase", () => ({
  auth: {},
  googleProvider: {},
}));

const originalEnv = { ...process.env };

beforeEach(() => {
  vi.resetModules();
  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_BACKEND_API_URL: "https://api.example.test",
  };
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  process.env = { ...originalEnv };
});

describe("CommunityAuthService", () => {
  test("signUp posts backend-compatible firstName and lastName fields", async () => {
    const { CommunityAuthService } = await import("./communityAuthService");

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user_id: "user-1",
        firstName: "Blog",
        lastName: "Reader",
        email: "reader@example.test",
        access_token: "token-1",
        token_type: "bearer",
        preview_status: "community",
      }),
    } as Response);

    await expect(
      CommunityAuthService.signUp({
        fullName: "Blog Reader",
        email: "reader@example.test",
        password: "password123",
      })
    ).resolves.toMatchObject({
      user_id: "user-1",
      firstName: "Blog",
      lastName: "Reader",
      preview_status: "community",
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.test/community/signUp",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          email: "reader@example.test",
          password: "password123",
          firstName: "Blog",
          lastName: "Reader",
          access_tier: "community",
          source: "blog_auth_modal",
        }),
      })
    );
  });

  test("signIn posts to the community login route", async () => {
    const { CommunityAuthService } = await import("./communityAuthService");

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user_id: "user-1",
        firstName: "Blog",
        lastName: "Reader",
        email: "reader@example.test",
        access_token: "token-1",
        token_type: "bearer",
        preview_status: "community",
      }),
    } as Response);

    await CommunityAuthService.signIn({
      email: "reader@example.test",
      password: "password123",
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.test/community/logIn",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          email: "reader@example.test",
          password: "password123",
          source: "blog_auth_modal",
        }),
      })
    );
  });

  test("signIn surfaces backend error detail", async () => {
    const { CommunityAuthService } = await import("./communityAuthService");

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ detail: "Invalid email or password" }),
    } as Response);

    await expect(
      CommunityAuthService.signIn({
        email: "reader@example.test",
        password: "wrong-password",
      })
    ).rejects.toThrow("Invalid email or password");
  });
});
