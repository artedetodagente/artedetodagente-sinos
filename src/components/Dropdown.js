import React, {useEffect, useState} from 'react'
import {Container, Label, Select, Option} from './DropdownStyles'

const Mock = {
  options: [
    {title: 'option 1 red  ', color: '#fff', background: '#f00'},
    {title: 'option 2 green', color: '#000', background: '#0f0'},
    {title: 'option 3 blue ', color: '#fff', background: '#00f'},
    {title: 'option 4 default '}
  ],
  placeholder: `Selecione`
}

export const DropDown = (props) => {

  const options = props.options || Mock.options
  const placeholder = props.placeholder || Mock.placeholder

  const [dropIsDown,setDrop] = useState(false)
  const [selected,setSelected] = useState(props.selected)

  // if prop.selected is redefined
  // (after loading data)
  useEffect(()=>{
    setSelected(props.selected)
  },[props.selected])

  const dropToggle = () => setDrop(!dropIsDown)
  const dropSelect = (i) => () => {
    if(dropIsDown){
      setDrop(false)
    }
    setSelected(i)
    if(props.onSelect) props.onSelect(i)
  }

  return (
    <Container width={props.width}>
      <Label
        title={options[selected]?.title || options[selected]?.nome || options[selected]}
        placeholder={placeholder}
        isDown={dropIsDown}
        onClick={dropToggle}
        color={options[selected]?.color}
        background={options[selected]?.background}
        black={props.black}
      />
      <Select numChildren={options.length} isDown={dropIsDown}>
        {options.map((item,index)=>
          <Option
            key={index}
            onClick={dropSelect(index)}
            black={props.black}
          >
            {item.title || item.nome || item}
          </Option>
        )}
      </Select>
    </Container>
  )
}


export default DropDown