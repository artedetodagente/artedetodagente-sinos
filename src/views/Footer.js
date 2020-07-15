import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'

function Footer(props) {

  return (
    <footer className="footer">
      <div className="footer-1">
        <div className="footer-col social">
          <h3>Social</h3>
          <a href="https://instagram.com/sinos" rel="noopener noreferrer" target="_blank" title="Instagram">
            <img width="20" src="/img/icons/instagram.svg" alt="Instagram" />
          </a>
          <a href="https://facebook.com/sinos" rel="noopener noreferrer" target="_blank" title="Facebook">
            <img width="20" src="/img/icons/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://youtube.com/sinos" rel="noopener noreferrer" target="_blank" title="Youtube">
            <img width="20" src="/img/icons/youtube.svg" alt="Youtube" />
          </a>
        </div>
        <div className="spacer md:flex-grow"></div>
        <div className="footer-col">
          <h3>Institucional</h3>
          <nav>
            <li><Link to="/">Link 1</Link></li>
            <li><Link to="/">Link 2</Link></li>
            <li><Link to="/">Link 3</Link></li>
          </nav>
        </div>
        <div className="footer-col">
          <h3>Acesso</h3>
          <nav>
            <li><Link to="/">Link 1</Link></li>
            <li><Link to="/">Link 2</Link></li>
            <li><Link to="/">Link 3</Link></li>
          </nav>
        </div>
        <div className="footer-col">
          <h3>Contatos</h3>
          <nav>
            <li><Link to="/">Link 1</Link></li>
            <li><Link to="/">Link 2</Link></li>
            <li><Link to="/">Link 3</Link></li>
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
