import styled from 'styled-components';
import { lighten } from 'polished';
import colors from './colors';

export const Container = styled.div`
  width: 1200px;
  max-width: 90%;

  form {
    width: 100%;
    margin: 20px auto;
    background-color: #fff;
    padding: 40px;
    border-radius: 8px;
    div.big {
      display: flex;
      flex-direction: column;
      width: 100%;

      p {
        text-transform: uppercase;
        font-weight: bold;
        color: #333;
      }
      input,
      select {
        height: 50px;
        padding: 10px;
        font-size: 16px;
        margin: 10px 0;
        border-radius: 4px;
        border: 0;
        border: 1px solid #eee;
      }
    }

    div {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      margin-bottom: auto;
      width: 100%;

      div {
        display: flex;
        flex-direction: column;
        max-width: 28%;

        p {
          text-transform: uppercase;
          font-weight: bold;
          color: #333;
        }

        input,
        select {
          padding: 10px 0 10px 5px;
          height: 50px;
          font-size: 16px;
          border-radius: 4px;
          border: 0;
          border: 1px solid #eee;
        }
      }

      div.read-only {
        width: 20%;

        input:read-only {
          background-color: #eee;
        }
      }
    }

    button {
      width: 100%;
      background: ${lighten(0.1, colors.second)};
      border: 0;
      padding: 10px;
      font-size: 20px;
      color: #fff;
      border-radius: 4px;
      font-weight: bold;
      margin-top: 20px;
      text-transform: uppercase;
    }
    button:hover {
      background: ${colors.second};
    }
  }
`;
