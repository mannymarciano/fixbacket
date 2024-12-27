export function extractBaseUrl(url: string): string {
  if (!url) {
    throw new Error('URL is required');
  }

  try {
    // Remove protocol if present
    let cleanUrl = url.replace(/^(https?:\/\/)/, '');
    
    // Remove trailing slashes
    cleanUrl = cleanUrl.replace(/\/+$/, '');
    
    // Get the domain part
    const domain = cleanUrl.split('/')[0];
    
    // Validate domain format
    if (!domain.includes('.')) {
      throw new Error('Invalid domain format');
    }

    return domain;
  } catch (error) {
    throw new Error('Invalid URL format');
  }
}