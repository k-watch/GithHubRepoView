import styled from 'styled-components';
import { absoluteCenter, flexBox } from 'styles/mixin';

const Loading = () => {
  return <S.Loading />;
};

export default Loading;

const S = {
  Loading: styled.div`
    position: relative;
    left: 50%;
    width: 40px;
    height: 40px;
    margin: 20px;
    border: 5px solid ${({ theme }) => theme.lightGray};
    border-top-color: ${({ theme }) => theme.deepGray};
    border-radius: 50%;
    animation: spin 0.7s infinite ease-in-out;

    @keyframes spin {
      to {
        transform: rotate(1turn);
      }
    }
  `,
};
