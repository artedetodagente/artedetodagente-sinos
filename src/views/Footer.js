import React from 'react'
import store from '../store'

function Footer(props) {

  return (
    <footer className="footer">
      <div className="footer-1">
        <div className="footer-col social">
          <h3>Social</h3>
          <a href="https://instagram.com/sinos" target="_blank" title="Instagram">
            <img width="20" src="/img/icons/instagram.svg" alt="Instagram" />
          </a>
          <a href="https://facebook.com/sinos" target="_blank" title="Facebook">
            <img width="20" src="/img/icons/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://youtube.com/sinos" target="_blank" title="Youtube">
            <img width="20" src="/img/icons/youtube.svg" alt="Youtube" />
          </a>
        </div>
        <div className="spacer md:flex-grow"></div>
        <div className="footer-col">
          <h3>Institucional</h3>
        </div>
        <div className="footer-col">
          <h3>Acesso</h3>
        </div>
        <div className="footer-col">
          <h3>Contatos</h3>
        </div>
      </div>
      <div className="footer-2">
        second footer
      </div>
    </footer>
  );
}

export default Footer;
