import React from 'react'
import Menu from './Menu'
import MenuDropdown from './MenuDropdown'
import Footer from './Footer'


function PageDefault(props) {

  return (
    <>
      <section id={props.id} className="single-page">
        <div className="mobile-menu">
          <MenuDropdown home={true}/>
        </div>
        <div className="header-vireport">
          <div className="header">
            <div className="title">{props.title}</div>
            <div className="desktop-menu site-menu-1 bg-r">
              <Menu home={true} />
            </div>
          </div>
        </div>
        <div className="content-viewport">
          <div className="content">
            {props.children}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default PageDefault;
