import styled from 'styled-components/native';

export const Container = styled.View`
  background: #f5f5f5;
  padding: 20px;
  height: 100%;
  width: 100%;
`;

export const Content = styled.View`
  width: 90%;
  align-self: center;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
`;

export const HeaderQuestion = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: #333;
  margin: 15px 0;
`;
export const DateText = styled.Text`
  color: #999;
  font-size: 12px;
`;
export const Text = styled.Text`
  color: #666;
  font-size: 16px;
`;
