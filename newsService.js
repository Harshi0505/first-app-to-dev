import axios from 'axios';

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual NewsAPI key
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchTopHeadlines = async (category = 'general') => {
  try {
    const response = await axios.get(`${BASE_URL}?country=us&category=${category}&apiKey=${API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
