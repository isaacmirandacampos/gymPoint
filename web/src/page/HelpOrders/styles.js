import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  width: 60%;
  height: 80%;
`;

export const ScrollTable = styled.div`
  overflow: auto;
  max-height: 600px;
  margin-top: 20px;

  table {
    background-color: #fff;
    width: 100%;
    padding: 20px;
    border-radius: 15px;

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

          button {
            color: #00ff;
            background: none;
            border: 0;
            opacity: 0.8;
            font-size: 14px;
          }
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
