import styled from 'styled-components';
import { darken } from 'polished';
import colors from '../../../styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, ${colors.primary}, ${colors.second});
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;

  img {
    margin: 30px auto;
    max-width: 200px;
    max-height: 150px;
    display: block;
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      margin: 10px 0;
      padding: 15px 15px;
      border-radius: 4px;
      border: 0;
      border-bottom: 2px solid #ccc;
      font-size: 20px;
    }
    span {
      color: ${colors.error};
      margin: 0 0 10px;
      opacity: 0.8;
      font-size: 14px;
    }
    button {
      background: linear-gradient(-90deg, ${colors.second}, ${colors.primary});
      padding: 10px;
      height: 55px;
      width: 100%;
      color: #fff;
      font-weight: bold;
      font-size: 25px;
      transition: background 0.2s;
      margin-top: 10px;

      &:hover {
        background: linear-gradient(
          -90deg,
          ${darken(0.02, colors.second)},
          ${darken(0.02, colors.primary)}
        );
      }
    }
    a {
      color: #444;
      text-align: center;
      margin-top: 20px;

      &:hover {
        color: #666;
      }
    }
  }
`;
