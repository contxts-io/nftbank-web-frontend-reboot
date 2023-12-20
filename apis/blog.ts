import { Article } from '@/interfaces/blog';
import Axios from 'axios';

const rssUrl = 'https://medium.com/feed/nftbank-ai';

// summary
const mediumURL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
  rssUrl,
)}`;
export const getMediumItemListApi = async () => {
  // const result = await Axios.get(mediumURL);
  // return result;
  const response = await Axios.get<{items: Article[]}>(mediumURL);
  return response.data;
}