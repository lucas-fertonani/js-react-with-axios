import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import createBlog from "../axios/config";

import "./Home.css";

const Home = () => {
  const [posts, Setposts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await createBlog.get("/posts"); // Esperar alguma resposta

      const data = res.data;
      console.log(data); // Pegar somente a data

      console.log(res); // Printar o erro
      Setposts(data); // As informações que vai receber da API
    } catch (error) {
      // Caso aconteça um erro
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="home">
      <h1>Ultimos posts!</h1>
      {posts.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        posts.map((post) => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={`/posts/${post.id}`} className="btn">
              Ler Mais
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
