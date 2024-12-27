/**
 * Formats and validates Bubble.io URLs
 */
export function formatBubbleUrl(url: string): string {
  if (!url) {
    throw new Error('Bubble.io URL is required');
  }

  // Remove whitespace
  let cleanUrl = url.trim();

  // Ensure URL has https://
  if (!/^https?:\/\//i.test(cleanUrl)) {
    cleanUrl = `https://${cleanUrl}`;
  }

  try {
    const urlObj = new URL(cleanUrl);
    // Remove trailing slashes and /version-test
    const hostname = urlObj.hostname.replace(/\/+$/, '').replace(/\/version-test\/?$/, '');
    return `https://${hostname}`;
  } catch (error) {
    throw new Error('Please enter a valid Bubble.io application URL');
  }
}