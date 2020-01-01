import styled from 'styled-components';
import { lighten } from 'polished';
import colors from '../../../styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  min-width: 1200px;
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;

  div {
    header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      div {
        button {
          border: 0;
          padding: 5px 30px;
          font-size: 16px;
          background-color: #999;
          color: #fff;
          margin-right: 10px;
          border-radius: 4px;
        }

        button:hover {
          background-color: ${lighten(0.1, colors.second)};
        }

        button:not(#back) {
          background: ${colors.second};
        }

        button:not(#back):hover {
          background-color: ${lighten(0.1, colors.second)};
        }
      }
    }
  }
`;
