import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'

function Footer(props) {

  return (
    <footer className="footer">
      <div className="footer-1">
        <div className="footer-col social">
          <h3>Social</h3>
          <a href="https://instagram.com/sinos.art" rel="noopener noreferrer" target="_blank" title="Instagram">
            <img width="20" src="/img/icons/instagram.svg" alt="Instagram" />
          </a>
          <a href="https://facebook.com/SNOS.art" rel="noopener noreferrer" target="_blank" title="Facebook">
            <img width="20" src="/img/icons/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://www.youtube.com/artedetodagente" rel="noopener noreferrer" target="_blank" title="Youtube">
            <img width="20" src="/img/icons/youtube.svg" alt="Youtube" />
          </a>
        </div>
        <div className="spacer md:flex-grow"></div>
        <div className="footer-col">
          <h3>Institucional</h3>
          <nav>
            <li><Link to="/projeto">Projeto</Link></li>
            <li><Link to="/noticias">Notícias</Link></li>
            <li><Link to="/programacao">Programação</Link></li>
            <li><Link to="/parceiros">Parceiros</Link></li>
            <li><Link to="/imprensa">Imprensa</Link></li>
          </nav>
        </div>
        <div className="footer-col">
          <h3>Linhas de Ação</h3>
          <nav>
            <li><Link smooth to="/#1">Pedagogia das Cordas</Link></li>
            <li><Link smooth to="/#2">Projeto Espiral</Link></li>
            <li><Link smooth to="/#3">Academia de Regência</Link></li>
            {/* <li><Link smooth to="/#eorquestras">E-Orquestras</Link></li> */}
          </nav>
        </div>
      </div>
      <div className="footer-2">
        <div className="col copyright">
          © 2020 Copyright Sinos - todos os direitos reservados
        </div>
        <div className="col marcas">
          <img src="/img/sinos-marcas.png" alt="" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
