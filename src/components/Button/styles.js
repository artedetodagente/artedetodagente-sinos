import styled from "styled-components";

export const BtnDefault = styled.button`
  border-radius: 7px;
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color};
  padding: 5px 15px;
  outline: none;
`;