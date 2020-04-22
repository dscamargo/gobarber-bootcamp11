import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import BackgroundImage from '../../assets/signup-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  display: flex;
  place-content: center;
  width: 100%;
  max-width: 700px;
  align-items: center;
`;

const appearFromRight = keyframes`
from {
  opacity: 0;
  transform: translateX(100px)
}
to {
  opacity: 1;
  transform: translateX(0px)
}
`;

export const AnimationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex;
  flex-direction: column;
  animation ${appearFromRight} 1s;
  > form {
    margin: 80px;
    width: 340px;
    text-align: center;

    > h1 {
      margin-bottom: 24px;
    }

    > a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;

      :hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #f4ede8;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    text-decoration: none;

    > svg {
      margin-right: 16px;
    }

    :hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${BackgroundImage}) no-repeat center;
  background-size: cover;
`;
