import styled from 'styled-components';
import colors from '../../styles/colors';
import { lighten } from 'polished';

export const Container = styled.div`
  padding: 30px;
  width: 60%;
  height: 90%;
`;

export const ScrollTable = styled.div`
  overflow: auto;
  max-height: 600px;
  margin-top: 20px;
  padding: 25px;
  background-color: #fff;
  border-radius: 15px;

  table {
    width: 100%;
    padding: 20px;

    tbody {
      tr {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
        border-bottom: 1px solid #eee;
        padding: 7px 0;

        th {
          text-transform: uppercase;
          font-size: 20px;
          color: #444;
          padding: 5px;
          justify-self: left;
        }

        td {
          font-size: 18px;
          padding: 5px;
          justify-self: left;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        td:last-child {
          justify-self: right;
        }
      }

      tr:last-child {
        border-bottom: 0;
      }
    }
  }
`;

export const Response = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  h2 {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    padding: 10px;
  }

  p {
    color: #666;
    font-size: 15px;
    margin: 10px 0;
    text-align: justify;
    padding: 5px 10px;
  }
  form {
    display: flex;
    flex-direction: column;

    textarea {
      height: 100px;
      max-height: 400px;
      min-width: 300px;
      margin: 10px 0;
      padding: 10px 0;
      overflow: auto;
      font-size: 15px;
      color: #666;
    }

    button {
      height: 50px;
      margin: 10px 0;
      background-color: ${lighten(0.2, colors.second)};
      transition: background 0.5s;
    }

    button:hover {
      background-color: ${lighten(0.3, colors.primary)};
    }
  }
`;
