import styled from 'styled-components/native';
import logo from '../../assets/logoHeader.png';

export const Container = styled.SafeAreaView`
  height: 100%;
  background: #333;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})`
  height: 120px;
  width: 240px;
`;
