import { useEffect, useState } from 'react';
import axios from 'axios';


export default function RandomArticle() {
  const [articleTitle, setArticleTitle] = useState(null);
  const [articleContent, setArticleContent] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&pithumbsize=500&exintro&explaintext&titles=${articleTitle}&origin=*`;
    axios.get(apiUrl)
      .then(res => {
        const page = res.data.query.pages;
        const pageId = Object.keys(page)[0];
        const articleContent = page[pageId].extract;
        setArticleContent(articleContent);

        if (page[pageId].hasOwnProperty('thumbnail')) {
          const imageUrl = page[pageId].thumbnail.source;
          console.log("Image URL:", imageUrl);
          setImageUrl(imageUrl);
        } else {
          setImageUrl(null);
        }
      })
    
      .catch(err => {
        console.log(err);
      });
  }, [articleTitle]);

  useEffect(() => {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=bob%20incategory:Living_people&srprop=size&origin=*`;
    axios.get(apiUrl)
      .then(res => {
        const searchResults = res.data.query.search;
        const randomIndex = Math.floor(Math.random() * searchResults.length);
        const randomTitle = searchResults[randomIndex].title;
        setArticleTitle(randomTitle);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log("Image URL:", imageUrl);


  return (
    <div className="container" style={{ backgroundColor: 'black', color: 'white', padding: '20px'}}>
      {articleTitle && (
        <h1 style={{ fontWeight: 'bold', fontSize: '2em' }}>{articleTitle}</h1>
      )}
      <p style={{ fontSize: '18px', lineHeight: '1.5', textAlign: 'justify' }}>{articleContent}</p>
      <img src={imageUrl} alt={articleTitle} style={{ display: 'block', visibility: 'visible', margin: '0 auto' }} />
    </div>
  );

}

