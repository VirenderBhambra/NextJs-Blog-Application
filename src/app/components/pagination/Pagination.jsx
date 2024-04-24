"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./pagination.module.css";
import { Link } from "@mui/material";

export const Pagination = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState(null);
  async function fetchBlog() {
    setLoading(true);
    const response = await axios.get("http://localhost:4000/blog/all");
    setBlogs(response.data);
    console.log(response);
  }
  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className={styles.blogs}>
      {blogs ? (
        blogs.length > 0 ? (
          blogs.map((val, ind) => (
            <div className={styles.blog} key={ind}>
              <div dangerouslySetInnerHTML={{ __html: val.title }} />
              <div style={{ display: "flex", fontWeight: "bold" }}>
                {`Author: ${val.author}`}
              </div>
              {`${val.description}....`}
              <Link href={`/blog/${val.slug}`}>Read more</Link>
            </div>
          ))
        ) : (
          <div className={styles.noBlogs}>No blogs in database</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
