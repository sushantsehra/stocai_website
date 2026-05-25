import { afterEach, describe, expect, test, vi } from "vitest";

const originalEnv = { ...process.env };

afterEach(() => {
  vi.resetModules();
  process.env = { ...originalEnv };
});

describe("env utility", () => {
  test("uses development defaults when no public URLs are configured", async () => {
    process.env.NODE_ENV = "development";
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_APP_URL;
    delete process.env.NEXT_PUBLIC_APP_PUBLIC_URL;
    delete process.env.NEXT_PUBLIC_BACKEND_API_URL;

    const { env, getAppUrl, getSignupUrl } = await import("./env");

    expect(env.current).toBe("development");
    expect(env.apiUrl).toBe("http://127.0.0.1:8000");
    expect(env.publicUrl).toBe("http://localhost:3000");
    expect(getAppUrl()).toBe("http://localhost:3001");
    expect(getSignupUrl("/blog/post-1")).toBe(
      "http://localhost:3001/signUp?redirect=%2Fblog%2Fpost-1"
    );
  });

  test("prefers explicit app URL over legacy app public URL", async () => {
    process.env.NODE_ENV = "production";
    process.env.NEXT_PUBLIC_APP_URL = "https://app.example.test";
    process.env.NEXT_PUBLIC_APP_PUBLIC_URL = "https://legacy.example.test";
    process.env.NEXT_PUBLIC_SITE_URL = "https://site.example.test";

    const { env, getSignupUrl } = await import("./env");

    expect(env.isProduction).toBe(true);
    expect(env.publicUrl).toBe("https://site.example.test");
    expect(env.productUrl).toBe("https://app.example.test");
    expect(getSignupUrl()).toBe("https://app.example.test/signUp");
  });
});
