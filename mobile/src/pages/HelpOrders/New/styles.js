import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  background: #f5f5f5;
  height: 100%;
`;

export const QuestionText = styled.TextInput.attrs({
  multiline: true,
  placeholder: 'Inclua seu pedido de auxílio',
})`
  margin: 20px 0;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 20px;
  height: 350px;
  background: #fff;
  font-size: 20px;
  color: #666;

  width: 90%;
  align-self: center;
`;

export const SubmitButton = styled.TouchableOpacity`
  margin: 10px 0;
  height: 54px;
  width: 90%;
  align-self: center;
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
