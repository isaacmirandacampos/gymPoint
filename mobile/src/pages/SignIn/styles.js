import styled from 'styled-components/native';
import logo from '../../assets/logo.png';

export const Container = styled.KeyboardAvoidingView`
  height: 100%;
  justify-content: center;
`;

export const Content = styled.View`
  padding: 0 30px;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})`
  align-self: center;
  height: 150px;
  width: 240px;
`;

export const InputLogin = styled.TextInput`
  height: 54px;
  border-radius: 6px;
  border: 1px solid #999;
  margin: 20px 0;
  padding: 10px 20px;
`;
