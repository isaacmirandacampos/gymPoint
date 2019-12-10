import styled from 'styled-components';
import { darken, lighten } from 'polished';
import colors from '../../../styles/colors';

export const Container = styled.div`
  width: 1200px;
  max-width: 50%;

  form {
    width: 100%;
    margin: 20px auto;
    background-color: #fff;
    padding: 40px;
    border-radius: 8px;

    input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      margin: 10px 0;
      border-radius: 4px;
      border: 0;
      border-bottom: 1px solid #ddd;
    }

    div {
      display: flex;
      justify-content: space-between;

      input {
        width: 30%;
        padding: 10px;
        font-size: 16px;
        border-radius: 4px;
        border: 0;
        border-bottom: 1px solid #ddd;
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
    }
    button:hover {
      background: ${colors.second};
    }
  }
`;
