const axios = require("axios");
const cheerio = require("cheerio");
const NodeCache = require("node-cache");

const rssCache = new NodeCache();

async function generateNews() {
  // An array of URLs for websites that provide RSS feeds
  const urls = [
    "https://www.pcworld.com/index.rss",
    "https://www.cnet.com/rss/news/",
    "https://www.digitaltrends.com/feed/",
    "https://techcrunch.com/feed/",
    "https://www.theverge.com/rss/index.xml",
    "https://www.engadget.com/rss.xml",
    "https://www.zdnet.com/news/rss.xml",
    "https://feeds.feedburner.com/hackaday/LgoM",
    "https://arstechnica.com/feed/",
    "https://feeds.feedburner.com/mashable/",
    "https://www.techradar.com/rss",
    "https://venturebeat.com/feed/",
    "https://www.wired.com/feed/rss",
  ];

  // An empty array to store the news items
  let newsItems = [];

  // Create an array of promises that fetch the RSS feeds
  const rssPromises = urls.map(async (url) => {
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
