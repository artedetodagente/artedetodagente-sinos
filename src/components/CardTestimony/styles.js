import styled from 'styled-components';

export const Card = styled.article`
  padding: 15px;
  background-color: #ebebeb;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: 50px;
  
  figure {
    margin: 0;

    img {
      border-radius: 100%;
      height: 43px;
      width: 43px;
      background-color: #555;
    }
  }

  h1 {
    flex: 1;
    margin: 0;
    margin-left: 10px;
    text-align: left;
    font-size: 1.3em;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

export const Body = styled.main`
  flex: 1;
  margin-top: 15px;

  p {
    text-align: left;
    font-size: 1.7em;
  }
`;