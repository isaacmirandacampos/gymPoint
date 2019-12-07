import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  border-bottom: 1px solid #999;
  padding: 20px 20px 20px;
  width: 100%;
  height: 70px;
  box-shadow: 2px 3px 1px #eee;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      height: 40px;
      width: 250px;
      margin-right: 20px;
    }

    nav {
      border-left: 1px solid #eee;
      padding: 16px;

      a {
        color: #333;
        margin: 0 8px;
        font-size: 18px;
        font-weight: bold;
        text-transform: uppercase;
        opacity: 0.6;

        &:hover {
          opacity: 1;
        }
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      font-weight: bold;
      font-size: 15px;
    }

    button {
      background-color: none;
      border: 0;
      color: #ff5555;
      margin-top: 4px;
    }
  }
`;
