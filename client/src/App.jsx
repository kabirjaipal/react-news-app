import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { NewsContextProvider } from "../contexts/NewsContext";
import Navbar from "./components/Navbar";
import NewsPage from "./components/News";

const API_BASE_URL = "http://localhost:3000";

const App = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNewsItems, setFilteredNewsItems] = useState([]);

  const fetchNews = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/news`);
      setNewsItems(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const filteredNews = useMemo(() => {
    return newsItems.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [newsItems, searchQuery]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredNewsItems(filteredNews);
    } else {
      setFilteredNewsItems(newsItems);
    }
  }, [filteredNews, newsItems, searchQuery]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <NewsContextProvider
      value={{
        newsItems,
        setNewsItems,
        isLoading,
        setLoading,
        fetchNews,
        setSearchQuery,
        searchQuery,
        filteredNewsItems,
        setFilteredNewsItems,
      }}
    >
      <Navbar />
      <NewsPage key={filteredNewsItems.length} />
    </NewsContextProvider>
  );
};

export default App;
