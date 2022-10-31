import React from 'react';
import styled from 'styled-components';
import { flexBox } from 'styles/mixin';

const URL = {
  WANTED: {
    LINK: 'https://www.wanted.co.kr/',
    IMG_SRC:
      'https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100',
  },
};

const BannerItem = () => {
  return (
    <Wrap>
      <a href={URL.WANTED.LINK}>
        <img src={URL.WANTED.IMG_SRC} alt="원티드" />
        <p>AI가 추천하는 합격 포지션</p>
      </a>
    </Wrap>
  );
};

export default BannerItem;

const Wrap = styled.div`
  ${flexBox()}

  padding: 5px 0 15px 0;
  font-weight: bold;
  text-align: center;
`;
