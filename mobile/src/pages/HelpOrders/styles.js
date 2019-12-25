import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  background: #f5f5f5;
`;

export const Content = styled.View`
  height: 100%;
  width: 90%;
  align-self: center;
`;

export const SubmitButton = styled.TouchableOpacity`
  margin: 10px 0;
  height: 54px;
  background: #ee4e62;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

export const ButtonQuestion = styled.TouchableOpacity`
  padding: 10px 20px;
  border-radius: 7px;
  border: 1px solid #eee;
  background: #fff;
  margin-bottom: 20px;
`;

export const HeaderQuestion = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Answer = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin-left: 5px;
  color: ${props => (props.answer ? '#66dd66' : '#999')};
`;

export const Check = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DateText = styled.Text`
  color: #999;
  font-size: 14px;
`;

export const Question = styled.Text`
  font-size: 16px;
`;
