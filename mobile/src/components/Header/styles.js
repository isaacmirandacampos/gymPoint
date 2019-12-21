import styled from 'styled-components/native';
import logo from '../../assets/logoHeader.png';

export const Container = styled.SafeAreaView`
  height: 46px;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})`
  margin-top: 5px;
  height: 20px;
  width: 150px;
  align-self: center;
`;
