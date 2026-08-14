"use client";

import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
import { getAppUrl, getSignupUrl } from "@/utils/env";
import styles from "./page.module.css";

export default function PromotionStoryUserNav() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <span className={styles.userNavPlaceholder} aria-hidden="true" />;
  }

  if (!user) {
    return (
      <a href={getSignupUrl("/")} className={styles.signInLink}>
        Sign in
      </a>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`.trim();

  return (
    <a
      href={`${getAppUrl()}/`}
      className={styles.userLink}
      aria-label={`Open ${fullName || "your"} account`}
    >
      <Image
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || user.email || "User")}&background=ffffff&color=0B64F4&size=32&bold=true`}
        alt=""
        width={32}
        height={32}
        className={styles.userAvatar}
      />
      <span>{user.firstName || "My account"}</span>
    </a>
  );
}
