import React from 'react'
import MenuDropdown from './MenuDropdown'
import Footer from './Footer'


function Page(props) {

  return (
    <>
      <section id={props.id} className="single-page">
        <div className="header">
          <MenuDropdown home={true}/>
          <div className="title">{props.title}</div>
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

export default Page;
