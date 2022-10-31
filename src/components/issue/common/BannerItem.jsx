import URL from 'api/common/url';
import styled from 'styled-components';
import { flexBox } from 'styles/mixin';

const BannerItem = () => {
  return (
    <S.Wrap>
      <a href={URL.WANTED.LINK}>
        <img src={URL.WANTED.IMG_SRC} alt="원티드" />
        <p>AI가 추천하는 합격 포지션</p>
      </a>
    </S.Wrap>
  );
};

export default BannerItem;

const S = {
  Wrap: styled.div`
    ${flexBox()}

    padding: 5px 0 15px 0;
    font-weight: bold;
    text-align: center;
  `,
};
