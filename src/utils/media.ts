const MAX_MEDIA_URL_LENGTH = 2_000_000;

export function isSafeMediaUrl(value: unknown, options: { allowVideo?: boolean } = {}): value is string {
  if (typeof value !== 'string' || value.length === 0 || value.length > MAX_MEDIA_URL_LENGTH) return false;
  const trimmed = value.trim();
  if (trimmed !== value) return false;
  if (trimmed.startsWith('data:')) {
    return /^data:image\/(png|jpeg|jpg|gif|webp);base64,/i.test(trimmed);
  }
  try {
    const url = new URL(trimmed, window.location.href);
    if (url.protocol === 'blob:') return true;
    if (url.protocol === 'http:' || url.protocol === 'https:') return true;
    return options.allowVideo === true && url.protocol === 'media:';
  } catch {
    return false;
  }
}

export function safeMediaUrl(value: unknown, fallback = ''): string {
  return isSafeMediaUrl(value) ? value : fallback;
}

export function isMemeLike(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object') return false;
  const meme = value as Record<string, unknown>;
  return typeof meme.id === 'string' && typeof meme.title === 'string' && isSafeMediaUrl(meme.imageUrl);
}

export function sanitizeMemes<T extends { id: string; title: string; imageUrl: string; likes: number; tags: string[] }>(value: unknown, max = 500): T[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isMemeLike).slice(0, max).map((raw) => {
    const meme = raw as T;
    return {
      ...meme,
      id: meme.id.slice(0, 120),
      title: meme.title.slice(0, 240),
      imageUrl: meme.imageUrl,
      likes: Number.isFinite(meme.likes) && meme.likes >= 0 ? Math.floor(meme.likes) : 0,
      tags: Array.isArray(meme.tags) ? meme.tags.filter((tag): tag is string => typeof tag === 'string').slice(0, 20).map((tag) => tag.slice(0, 80)) : [],
    };
  });
}

export function safeVideoUrl(value: unknown, fallback: string): string {
  if (typeof value !== 'string' || value.length > 2048) return fallback;
  try {
    const url = new URL(value, window.location.href);
    return url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'blob:' ? value : fallback;
  } catch {
    return fallback;
  }
}
