import React from 'react'
import store from '../store'
import { HashLink as Link } from 'react-router-hash-link'

function HomeNews() {


  const {posts} = store

  return (
    <section id="noticias" className="home-news full-section">
      <div className="section-header">
        <div className="title">Nossa Programação</div>
      </div>
      <div className="cols">
        <div className="col agenda center-out">
          <div className="center-in">
            agenda
          </div>
        </div>
        <div className="col noticias center-out">
          <div className="center-in">
            <article class="noticia">
              <div className="content">
                <h3>{posts[0].title}</h3>
                <p>{posts[0].text}</p>
              </div>
              <Link className="leiamais" to="/#noticias">Leia mais</Link>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeNews;
