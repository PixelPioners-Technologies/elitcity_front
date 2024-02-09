
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

  const [descriptionFirstPart, setDescriptionFirstPart] = useState('');
  const [descriptionSecondPart, setDescriptionSecondPart] = useState('');
  const [secondDescriptiomFirstPart, setSecondDescriptiomFirstPart] = useState('');
  const [secondDescriptiomSecondPart, setSecondDescriptiomSecondPart] = useState('');





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


      // Split the description into two parts
      if (response[`description_${selectedLanguage}`]) {
        const description = response[`description_${selectedLanguage}`];
        setDescriptionFirstPart(description.substring(0, 3000));
        setDescriptionSecondPart(description.substring(3000));

      }

      if (response[`second_description_${selectedLanguage}`]) {
        const second_description = response[`second_description_${selectedLanguage}`];
        setSecondDescriptiomFirstPart(second_description.substring(0, 3000));
        setSecondDescriptiomSecondPart(second_description.substring(3000));

      }
    };
    fetchEachBlog();
  }, [selectedLanguage, blogId]);






  return (
    <div className="main_blog" >
      <div className="header_container" >
        <h1 className="blog_header" >{eachBlog?.blogName}</h1>
      </div>


      <div className="blog_container">
        <div className="imagecont" >
          {blogImages.length > 0 && (
            <img src={blogImages[0]} alt="Blog" className="blog_image" />
          )}

        </div>
        <p className="blog_text">{descriptionFirstPart}</p>
      </div>

      <div className="continue" >
        <p>{descriptionSecondPart}</p>
      </div>

      <div className="blog_container">
        <p className="blog_text">{secondDescriptiomFirstPart}</p>
        <div className="imagecont" >
          {blogImages.length > 0 && (
            <img src={blogImages[1]} alt="Blog" className="blog_image" />
          )}
        </div>
      </div>
      <div>
        <p className="continue">{secondDescriptiomSecondPart}</p>
      </div>
    </div>
  );
}


