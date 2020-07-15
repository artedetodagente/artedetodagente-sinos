import React from 'react'
import {useParams} from "react-router-dom"
import parse from 'html-react-parser'
import * as R from 'ramda'

import store from '../store'
import Menu from './Menu'
import Footer from './Footer'


function Temp(props) {

  const {id} = useParams()
  const {pages} = store

  const content = pages[id] || {title: "404", text: "página não encontrada", fulltext: "página não encontrada"}

  return (
    <>
      <section id={props.id} className="single-page">
        <div>
          <div className="header">
            <div className="title">{content.title}</div>
            <div className="site-menu-1 bg-r">
              <Menu home={true} />
            </div>
          </div>
        </div>
        <div className="content-viewport">
          <div className="content">
            {parse(content.fulltext.split("\n").join("<br/>"))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Temp;
