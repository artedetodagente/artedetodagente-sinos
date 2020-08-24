import React, {useState} from 'react'
import Menu from './Menu'

function MenuDropdown(props) {

  const {home} = props

  const [open,setOpen] = useState(false)

  return (
    <div className="menu-dropdown">
      <div className="menu-toggle" onClick={() => setOpen(!open)}>
        <img src="/img/icons/menu.svg" style={{width:"48px", height: "46px"}} alt="menu" />
      </div>
      <div className={`menu-content ${open ? 'is-open' : '' }`}>
        <div onClick={() => setOpen(false)}  className="site-menu-1 bg-r">
          <Menu home={home}/>
        </div>
      </div>
    </div>
  );
}

export default MenuDropdown;
