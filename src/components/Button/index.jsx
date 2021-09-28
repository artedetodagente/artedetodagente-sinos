import React from 'react'
import PropTypes from 'prop-types'
import { BtnDefault } from './styles'

export default function Button({ text, click, color, bg }) {
  return (
    <BtnDefault 
      color={color}
      bg={bg}
      onClick={click}
    >
      {text}
    </BtnDefault>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  click: PropTypes.func,
  color: PropTypes.string,
  bg: PropTypes.string,
};

Button.defaultProps = {
  text: '',
  click: null,
  color: '#fff',
  bg: '#000'
}