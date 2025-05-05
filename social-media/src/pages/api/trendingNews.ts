import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=9f38269d8ecf4c5394ad49adee69b1d5`;

  try {
    const response = await axios.get(url);
    const articles = response.data.articles.map((article: any) => ({
      title: article.title,
      url: article.url,
      urlToImage: article.urlToImage,
    }));
console.log("articles",articles)
    res.status(200).json(articles);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Failed to fetch news' });
  }
}
