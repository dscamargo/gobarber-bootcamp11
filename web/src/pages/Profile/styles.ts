import styled from 'styled-components';
import { shade } from 'polished';

import BackgroundImage from '../../assets/signup-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;

  flex-direction: column;

  > header {
    width: 100%;
    height: 144px;
    background: #28262e;
    display: flex;
    align-items: center;

    > div {
      max-width: 1120px;
      margin: 0 auto;
      width: 100%;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
        position: relative;
        z-index: 1;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  place-content: center;
  width: 100%;
  align-items: center;
  flex-direction: column;
  margin: -176px auto 0;

  > form {
    margin: 80px;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    > input[name='old_password'] {
      margin-top: 24px;
    }

    > h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
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

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  width: 186px;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    right: 0px;
    bottom: 0;
    background: #ff9000;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    cursor: pointer;

    > input {
      display: none;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }

    svg {
      width: 20px;
      height: 20px;
      color: #321e38;
    }
  }
`;
