import styled from 'styled-components';

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  background-color: #ddd;
  margin-top: 30px;
`;

export const Body = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;

  div:last-of-type {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p {
    text-align: left;
    font-size: .8em;
    margin: 0;
    padding-left: 10px;
  }
`;