import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
  useIssueDispatch,
  useIssueState,
  getIssueList,
  initIssueList,
} from 'modules/context/IssueContext';
import useInfiniteScroll from 'modules/hooks/useInfiniteScroll';
import styled from 'styled-components';
import { absoluteCenter, flexBox } from 'styles/mixin';
import BannerItem from './common/BannerItem';
import IssueItem from './IssueItem';

let page = 1;

const IssueList = () => {
  const state = useIssueState();
  const dispatch = useIssueDispatch();
  const [list, setList] = useState([]);
  const { data: issueList, loading, error } = state.issueList;

  const [target, setObserverStop] = useInfiniteScroll(() =>
    getIssueList(dispatch, { sort: 'comments', per_page: 25, page })
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
                <li key={indexedDB}>
                  <BannerItem />
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
  ${flexBox()}
  ${absoluteCenter()}
 

  ul {
    width: 1200px;
    height: 700px;
    overflow: auto;
    border: 1px solid #bdbdbd;
    border-radius: 8px;

    ::-webkit-scrollbar {
      display: none;
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
