export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 100;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}