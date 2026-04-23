import { supabase } from "@/integrations/supabase/client";

export type ArticleTag = "regulation" | "health" | "industry" | "guides";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body_md: string;
  cover_url: string | null;
  tag: ArticleTag;
  reading_minutes: number;
  published_at: string;
}

export async function listArticles(tag?: ArticleTag): Promise<Article[]> {
  let q = supabase
    .from("articles")
    .select("id, slug, title, excerpt, body_md, cover_url, tag, reading_minutes, published_at")
    .order("published_at", { ascending: false });
  if (tag) q = q.eq("tag", tag);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Article[];
}

export async function getArticle(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("id, slug, title, excerpt, body_md, cover_url, tag, reading_minutes, published_at")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as Article) ?? null;
}
