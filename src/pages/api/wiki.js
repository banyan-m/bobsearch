import axios from 'axios';

export default async (req, res) => {
  const { query: { title } } = req;
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&titles=${title}&origin=*`;
  try {
    const apiResponse = await axios.get(apiUrl);
    res.status(200).json(apiResponse.data);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching article content from Wikipedia API' });
  }
};
