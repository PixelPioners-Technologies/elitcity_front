
import axios from "axios";
import { BaseURLs } from "../App";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import './EachBlog.css'



const normalizeBlogData = (blog, lang) => {
  return {
    id: blog.id,
    internalBlogName: blog.internal_blog_name.internal_blog_name,
    createdAt: blog.internal_blog_name.created_at,
    blogName: blog[`blog_name_${lang}`],
    description: blog[`description_${lang}`],
    second_description: blog[`second_description_${lang}`],
    blogImages: blog.blog_images
  };
};





export default function EachBlog({ selectedLanguage }) {
  const [eachBlog, setEachBlog] = useState({});
  const [blogImages, setBlogImages] = useState([]);

  const location = useLocation();
  const { blogId } = location.state || {};

  useEffect(() => {
    const fetchEachBlog = async () => {
      // Assuming BaseURLs.blog and selectedLanguage are defined and valid
      const request = await axios.get(`${BaseURLs.blog}${selectedLanguage}/${blogId}`);
      const response = request.data;
      const normalData = normalizeBlogData(response, selectedLanguage);
      setEachBlog(normalData);
      setBlogImages(response.blog_images);
    };
    fetchEachBlog();
  }, [selectedLanguage, blogId]);

  return (
    <div>
      <div className="blog_container">
        <h1 className="blog_header" >{eachBlog?.blogName}</h1>
        <div>
          {blogImages.length > 0 && (
            <img src={blogImages[0]} alt="Blog" className="blog_image" />
          )}
          <p className="blog_text">{eachBlog.description}</p>
        </div>
      </div>

      <div className="blog_container_second">
        <h1 className="blog_header" >{eachBlog?.blogName}</h1>
        <div>
          {blogImages.length > 0 && (
            <img src={blogImages[1]} alt="Blog" className="blog_image_second" />
          )}
          <p className="blog_text_second">{eachBlog.description}</p>
        </div>
      </div>


    </div>
  );
}


