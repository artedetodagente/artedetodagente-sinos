import React, { useState, useEffect } from "react";

// import { useRouteMatch } from "react-router-dom";

import { HashLink as Link } from "react-router-hash-link";

import Page from "./Page";
import { RedLink } from "../components/CommonStyles";

import ReactMarkdown from "react-markdown";

import ReactHtmlParser from 'react-html-parser';

import api from "../services/api";

function PageRepertorio({ id }) {
  // const {path} = useRouteMatch()

  const [repertorio, setRepertorio] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/repertorio-sinos");
      setRepertorio(response.data);
    }
    fetchData();
  }, []);

  return (
    <Page title="Concertos Sinos">
      <div className="breadcrumbs">
        <span>
          <Link to={`/`}>Home</Link> &raquo;&nbsp;
        </span>
        <span>Repertório Sinos</span>
      </div>
      <div style={{ marginTop: "4vh" }}>
        {ReactHtmlParser(repertorio.description)}
      </div>
      <RedLink to={`/repertorio-sinos/obras`} style={{ marginTop: "2vh" }}>
        Conheça o Repertório Sinos
      </RedLink>
    </Page>
  );
}

export default PageRepertorio;
