import styled from 'styled-components';
import colors from '../../../styles/colors';

export const Wrapper = styled.div`
  height: 100%;
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;

  div {
    padding: 30px;
    border-radius: 4px;
    max-width: 80%;
    width: 1200px;

    header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      aside {
        button {
          border: 0;
          background-color: ${colors.second};
          padding: 5px 30px;
          font-size: 16px;
          color: #fff;
          margin-right: 10px;
          border-radius: 4px;
        }

        input {
          border-radius: 4px;
          border: 0;
          padding: 5px 30px;
          font-size: 16px;
        }
      }
    }
    table {
      margin-top: 20px;
      background-color: #fff;
      width: 100%;
      padding: 20px;
      border-radius: 8px;

      thead {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;

        h3 {
          text-transform: uppercase;
          font-size: 18px;
          color: #333;
        }
      }
    }
  }
`;
