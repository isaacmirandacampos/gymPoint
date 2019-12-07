import styled from 'styled-components';

import { lighten, darken } from 'polished';
import colors from '../../styles/colors';

export const Container = styled.div`
  padding: 30px;
  border-radius: 4px;
  max-width: 80%;
  width: 1200px;
  position: relative;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    div {
      button {
        border: 0;
        background-color: ${lighten(0.1, colors.second)};
        padding: 5px 30px;
        font-size: 16px;
        color: #fff;
        margin-right: 10px;
        border-radius: 4px;

        &:hover {
          background: linear-gradient(
            -90deg,
            ${darken(0.1, colors.primary)},
            ${lighten(0.1, colors.second)}
          );
        }
      }

      input {
        border-radius: 4px;
        border: 0;
        padding: 5px 30px;
        font-size: 16px;
      }
    }
  }
`;

export const ScrollTable = styled.div`
  overflow: auto;
  max-height: 700px;
  margin-top: 20px;

  table {
    background-color: #fff;
    width: 100%;
    padding: 20px;
    border-radius: 15px;

    tbody {
      tr {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        width: 100%;
        border-bottom: 1px solid #eee;
        padding: 7px 0;

        th {
          text-transform: uppercase;
          font-size: 16px;
          color: #444;
          padding: 5px;
          justify-self: center;
        }

        td {
          font-size: 15px;
          padding: 5px;
          justify-self: center;

          button {
            color: #00ff;
            background: none;
            border: 0;
            opacity: 0.8;
            font-size: 14px;
          }

          button:last-child {
            color: #ff0000;
            margin-left: 20px;
          }
        }
      }

      tr:last-child {
        border-bottom: 0;
      }
    }
  }
`;
