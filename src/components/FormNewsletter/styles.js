import styled from "styled-components";

export const Container = styled.section`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(360px - 10%);
  width: 100%;
  padding: 5% 0;

  @media (max-width: 768px) {
    height: calc(260px - 10%);
    box-sizing: initial;
  }
`;

export const Title = styled.h1`
  font-size: 2.3em;
  font-weight: 300;
  margin: 0;
  text-align: center;
`;

export const Form = styled.form`
  flex: 1;
  display: flex;
  margin-top: 35px;
  width: calc(100% - 28%);
  padding: 0 14%;
  
  input {
    flex: 1;
    border: 3px solid #d2d2d2;
    border-radius: 7px;
    padding: 5px;
  }

  button {
    flex: .3;
    background-color: #000;
    color: #fff;
    padding: 5px 15px;
    outline: none;
    margin-left: 20px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    width: calc(100% - 8%);
    padding: 0 4%;
  }
`;
