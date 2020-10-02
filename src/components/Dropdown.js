import React, {useState} from 'react'
import {Container, Label, Select, Option} from './DropdownStyles'

const Mock = {
  options: [
    {title: `option 1`},
    {title: `option 2`, color: `#fff`, background: `#f00`}
  ],
  placeholder: `Selecione`
}

export const DropDown = (props) => {

  const options = props.options || Mock.options
  const placeholder = props.placeholder || Mock.placeholder

  const [dropIsDown,setDrop] = useState(false)
  const [selected,setSelected] = useState(0)

  const dropToggle = () => setDrop(!dropIsDown)
  const dropSelect = (i) => () => {
    if(dropIsDown){
      setDrop(false)
    }
    setSelected(i)
    if(props.onSelect) props.onSelect(i)
  }

  return (
    <Container>
      <Label
        title={options[selected].title}
        placeholder={placeholder}
        isDown={dropIsDown}
        onClick={dropToggle}
        color={options[selected].color}
        background={options[selected].background}
      />
      <Select numChildren={options.length} isDown={dropIsDown}>
        {options.map((item,index)=>
          <Option key={index} onClick={dropSelect(index)}>
            {item.title}
          </Option>
        )}
      </Select>
    </Container>
  )
}