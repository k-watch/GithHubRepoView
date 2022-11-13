import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { absoluteCenter, flexBox } from 'styles/mixin';

const Error = ({ error }) => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (error) {
      setResponse(error.response);
    }
  }, [error]);

  return (
    <S.Wrap>
      {response && (
        <>
          <div className="title">Oops!</div>
          <div className="content">
            <p>{response.status}</p>
            <p>{response.data.message}</p>
          </div>
          <button type="button" onClick={() => navigate('/')}>
            메인으로
          </button>
        </>
      )}
    </S.Wrap>
  );
};

export default Error;

const S = {
  Wrap: styled.div`
    ${absoluteCenter()}
    width: 400px;
    text-align: center;

    .title {
      font-size: 100px;
      font-weight: bold;
    }

    .content {
      margin: 30px;
      font-size: 40px;
      font-weight: bold;
    }

    button {
      padding: 20px;
      border-radius: 40px;
      background-color: ${({ theme }) => theme.green};
      font-size: 20px;
      font-weight: bold;
      color: white;
    }
  `,
};
