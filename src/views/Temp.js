import React from 'react'
import store from '../store'
import Menu from './Menu'

function Temp() {
  return (
    <div className="page-temp">
      <h1>Em breve</h1>
      <Menu home={true} />
    </div>
  );
}

export default Temp;
