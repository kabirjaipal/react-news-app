const axios = require("axios");
const cheerio = require("cheerio");
const NodeCache = require("node-cache");
const { newsUrls } = require("./newsUrls");

const rssCache = new NodeCache();

async function generateNews() {
  // An empty array to store the news items
  let newsItems = [];

  // Create an array of promises that fetch the RSS feeds
  const rssPromises = newsUrls.map(async (url) => {
    let response;
    const cachedResponse = rssCache.get(url);
    if (cachedResponse) {
      response = { data: cachedResponse };
    } else {
      response = await axios.get(url, { timeout: 5000 });
      rssCache.set(url, response.data);
    }
    const $ = cheerio.load(response.data, { xmlMode: true });
    $("item").each((i, item) => {
      // Extract the required fields from the RSS item
      const postUrl = $(item).find("link").text();
      const title = $(item).find("title").text();
      const thumbnail =
        $(item).find("media\\:content, content").attr("url") ||
        $(item).find("enclosure").attr("url") ||
        $(item).find("image").attr("url") ||
        $(item).find("og:image").attr("content") ||
        $(item).find("twitter:image").attr("content") ||
        "https://via.placeholder.com/150"; // Default thumbnail

      const date = $(item).find("pubDate").text();

      // Add the news item to the array
      newsItems.push({ postUrl, title, thumbnail, date });
    });
  });

  // Wait for all the RSS feeds to be fetched and then return the news items
  await Promise.allSettled(rssPromises);

  return newsItems;
}

module.exports = generateNews;
