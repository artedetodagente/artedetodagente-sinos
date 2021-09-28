import React from 'react';
import YouThumb from './YouThumb';

export default function AulaBox(props){

    const {onClick,video,title} = props
    return(
      <div className="aula" onClick={onClick} >
        <div className="box" style={{textAlign: 'left'}}>
          <YouThumb url={video} />
          <p style={{backgroundColor: 'gainsboro', padding: '2px'}}>{title}</p>
        </div>
      </div>
    )
  }