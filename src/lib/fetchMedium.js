export async function getMediumPosts() {
    try {
      const url =
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@immichaelliav";
      const response = await fetch(url);
  
      if (!response.ok) {
        console.error("HTTP error! Status:", JSON.stringify(response.status));
        return [];
      }
  
      const data = await response.json();
  
      if (!data.items || data.items.length === 0) {
        console.warn("No articles found in the response");
        return [];
      }
  
      // Function to extract first image from the content
      function extractImage(htmlContent) {
        const match = htmlContent.match(/<img[^>]+src="([^">]+)"/);
        return match ? match[1] : null;
      }
  
      // Add images manually if missing
      const articles = data.items.map((article) => ({
        ...article,
        image: article.thumbnail || extractImage(article.content), // Use `thumbnail` if available, otherwise extract from `content`
      }));
  
      return articles;
    } catch (error) {
      console.error("Error fetching Medium posts:", error);
      return [];
    }
  }