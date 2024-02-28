// import React from 'react'
import DataOfArticles from "../ArticleDATA.json";
import "./Articles.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BaseURLs } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const normalizeArticleData = (blogs, lang) => {
  return blogs.map((blog) => ({
    id: blog.id,
    blogName: blog[`blog_name_${lang}`] || blog.blog_name_en,
    description: blog[`description_${lang}`] || blog.description_en,
    createdAt: blog.internal_blog_name.created_at,
    internalBlogName: blog.internal_blog_name.internal_blog_name,
    images: blog.blog_images,
  }));
};

export default function Articles({ selectedLanguage }) {
  const [articles, setArticles] = useState([]);

  const navigate = useNavigate();

  // Assuming `complex` is an object representing each house
  const handleAppartmentClick = (blogId) => {
    navigate(`/eachblog/${blogId}`, { state: { blogId } });
  };

  useEffect(() => {
    const fetch_articles = async () => {
      const response = await axios.get(`${BaseURLs.blog}${selectedLanguage}/`);
      const result = response.data;
      const normaldata = normalizeArticleData(result, selectedLanguage);
      setArticles(normaldata);
    };
    fetch_articles();
  }, [selectedLanguage]);

  const truncateText = (text, limit) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  return (
    <div className="ArticlesPageBox" >
      {/* habflsdfndbfd */}
      {articles.map((article, index) => (
        <div
          // key={article.id}
          // initial={
          //   index % 2 === 0 ? { x: -50, opacity: 0 } : { x: 50, opacity: 0 }
          // }
          // transition={{ duration: 1 }}
          // whileInView={
          //   index % 2 === 0 ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }
          // }
          // viewport={{ once: true }}
          className={`BoxOfEachArticle ${index % 2 === 0 ? "Left" : "Right"}`}
          onClick={() => handleAppartmentClick(article.id)}
        >
          <div className="ArticleImgBox">
            <img
              src={article.images[0]}
              className="img"
              alt={`Article ${article.id}`}
            />
          </div>
          <div className="ArticleTextBox">
            <h2>{truncateText(article.blogName, 100)}</h2>
            <p>{truncateText(article.description, 350)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
