
// import React from 'react'
import DataOfArticles from '../ArticleDATA.json';
import './Articles.css';
import { motion } from "framer-motion";

export default function Articles() {
  // Function to truncate text
  const truncateText = (text, limit) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  return (
    <div className='ArticlesPageBox'>

      {DataOfArticles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={index % 2 === 0 ? { x: -50, opacity: 0 } : { x: 50, opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={index % 2 === 0 ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className={`BoxOfEachArticle ${index % 2 === 0 ? 'Left' : 'Right'}`}
        >
          <div className='ArticleImgBox'>
            <img src={article.img} className='img' alt={`Article ${article.id}`} />
          </div>
          <div className='ArticleTextBox'>
            <h2>{truncateText(article.title, 100)}</h2>
            <p>{truncateText(article.content, 250)}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
