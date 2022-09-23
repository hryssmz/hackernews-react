// utils/constants.ts
export const AUTH_TOKEN = "auth-token";
export const LINKS_PER_PAGE = 5;
export const DEFAULT_FEED_QUERY_VARS = {
  take: LINKS_PER_PAGE,
  skip: 0,
  orderBy: { createdAt: "desc" },
};
