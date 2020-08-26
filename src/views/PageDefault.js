import React, { useState, useEffect } from 'react'
import {useParams} from "react-router-dom"
import parse from 'html-react-parser'

import store from '../store'
import Page from './Page'

import api from '../services/api'


function PageDefault(props) {

  const {id} = useParams()
  const {pages} = store

  const content = pages[id] || pages[404]

  return (
    <Page title={content.title}>
      <div className="page-view default-view">
      {parse(content.fulltext.split("\n").join("<br/>"))}
      </div>
    </Page>
  );
}

export default PageDefault;
