export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yeipi.vercel.app"
).replace(/\/$/, "");
