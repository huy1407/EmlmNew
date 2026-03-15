/**
 * Strip HTML tags and convert to plain text
 */
export const stripHtml = (html: string): string => {
  if (!html) return '';
  
  // Replace <br> and <br/> with newlines
  let text = html.replace(/<br\s*\/?>/gi, '\n');
  
  // Remove all HTML tags
  text = text.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  text = decodeHtmlEntities(text);
  
  // Clean up whitespace
  text = text.trim();
  
  return text;
};

/**
 * Decode HTML entities
 */
export const decodeHtmlEntities = (text: string): string => {
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
  };
  
  let result = text;
  Object.keys(entities).forEach((entity) => {
    result = result.replace(new RegExp(entity, 'g'), entities[entity]);
  });
  
  return result;
};

/**
 * Get preview text from content (first N characters)
 */
export const getPreviewText = (content: string, length: number = 100): string => {
  const stripped = stripHtml(content);
  if (stripped.length > length) {
    return stripped.substring(0, length).trim() + '...';
  }
  return stripped;
};

/**
 * Search in content (case-insensitive)
 */
export const searchInContent = (
  content: string,
  query: string
): boolean => {
  const stripped = stripHtml(content).toLowerCase();
  return stripped.includes(query.toLowerCase());
};
