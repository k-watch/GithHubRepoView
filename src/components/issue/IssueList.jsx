/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
  useIssueDispatch,
  useIssueState,
  getIssueList,
  initIssueList,
} from 'modules/context/IssueContext';
import useInfiniteScroll from 'modules/hooks/useInfiniteScroll';
import styled from 'styled-components';
import IssueItem from './IssueItem';

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const imgSrc =
  'https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100';
let page = 1;

const IssueList = () => {
  const state = useIssueState();
  const dispatch = useIssueDispatch();
  const [list, setList] = useState([]);
  const { data: issueList, loading, error } = state.issueList;

  const [target, setObserverStop] = useInfiniteScroll(() =>
    getIssueList(dispatch, page)
  );

  useEffect(() => {
    return () => {
      page = 1;
      initIssueList(dispatch);
    };
  }, []);

  useEffect(() => {
    if (issueList) {
      if (issueList.length !== 25) {
        setObserverStop(true);
      }
      const strArr = Object.values(issueList);

      setList([...list, ...strArr]);
      page += 1;
    }
  }, [issueList]);

  return (
    <Wrap>
      <ul>
        {list &&
          list.map((issue, index) => {
            if (index === 4) {
              return (
                <li key={imgSrc} className="bannerItem">
                  <a href="https://www.wanted.co.kr/ ">
                    <img src={imgSrc} />
                    <p>AI가 추천하는 합격 포지션</p>
                  </a>
                </li>
              );
            }
            return (
              <li role="presentation" key={issue.id}>
                <IssueItem issue={issue} />
              </li>
            );
          })}
        <div ref={target} />
        {loading && <LodingWrap>로딩중...</LodingWrap>}
      </ul>
    </Wrap>
  );
};

export default IssueList;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ul {
    width: 1200px;
    height: 700px;
    overflow: auto;
    border: 1px solid #bdbdbd;
    border-radius: 8px;

    ::-webkit-scrollbar {
      display: none;
    }

    .bannerItem {
      padding: 5px 0 15px 0;
      font-weight: bold;
      text-align: center;
    }

    li {
      border-bottom: 1px solid #bdbdbd;

      cursor: pointer;

      :hover {
        background-color: #d0d7de2b;
      }
    }
  }
`;

const LodingWrap = styled.div`
  padding: 20px 0;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
`;
