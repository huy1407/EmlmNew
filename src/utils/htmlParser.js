// Utility to parse HTML content and convert to plain text
export const stripHtmlTags = (html) => {
  if (!html) return '';
  
  let text = html;
  
  // Replace <br> and <br/> with newlines
  text = text.replace(/<br\s*\/?>/gi, '\n');
  
  // Remove <p> and </p> tags
  text = text.replace(/<p>/gi, '');
  text = text.replace(/<\/p>/gi, '\n');
  
  // Remove other common HTML tags
  text = text.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  text = decodeHtmlEntities(text);
  
  // Clean up multiple spaces and newlines
  text = text.replace(/\n\n+/g, '\n');
  text = text.trim();
  
  return text;
};

// Helper to decode HTML entities
const decodeHtmlEntities = (text) => {
  const entities = {
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&amp;': '&',
  };
  
  let decoded = text;
  Object.keys(entities).forEach((entity) => {
    decoded = decoded.replace(new RegExp(entity, 'g'), entities[entity]);
  });
  
  return decoded;
};

// Search in documents
export const searchInDocuments = (documents, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') return [];
  
  const term = searchTerm.toLowerCase();
  const results = [];
  
  documents.forEach((doc) => {
    if (doc.list && Array.isArray(doc.list)) {
      doc.list.forEach((item, index) => {
        const title = item.title?.toLowerCase() || '';
        const content = item.content?.toLowerCase() || '';
        
        if (title.includes(term) || content.includes(term)) {
          const plainContent = stripHtmlTags(item.content);
          const preview = plainContent.substring(0, 100) + (plainContent.length > 100 ? '...' : '');
          
          results.push({
            documentIndex: documents.indexOf(doc),
            documentName: doc.shortName,
            itemIndex: index,
            title: item.title,
            preview: preview,
            fullContent: plainContent,
          });
        }
      });
    }
  });
  
  return results;
};

// Format content for sharing
export const formatContentForShare = (documentName, sectionTitle, content) => {
  const plainContent = stripHtmlTags(content);
  return `${documentName}\n${sectionTitle}\n\n${plainContent}`;
};
