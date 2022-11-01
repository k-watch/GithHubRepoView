import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
  useIssueDispatch,
  useIssueState,
  getIssueList,
  initIssueList,
} from 'modules/context/IssueContext';
import useInfiniteScroll from 'modules/hooks/useInfiniteScroll';
import styled from 'styled-components';
import { flexBox } from 'styles/mixin';
import Loading from 'components/common/Loading';
import BannerItem from '../common/BannerItem';
import IssueItem from './IssueItem';

const PER_PAGE = 25;

const IssueList = () => {
  const [list, setList] = useState([]);
  const page = useRef(1);

  const state = useIssueState();
  const dispatch = useIssueDispatch();

  const { data: issueList, loading, error } = state.issueList;

  const [target, setObserverStop] = useInfiniteScroll(() =>
    getIssueList(dispatch, false, {
      sort: 'comments',
      per_page: PER_PAGE,
      page: page.current,
    })
  );

  useEffect(() => {
    return () => {
      getIssueList(dispatch, true);
    };
  }, []);

  useEffect(() => {
    if (issueList) {
      // 페이지당 개수와 받아온 데이터의 개수가
      // 다르다면 마지막 페이지
      if (issueList.length !== PER_PAGE) {
        setObserverStop(true);
      }

      setList([...list, ...issueList]);
      page.current += 1;
    }
  }, [issueList]);

  return (
    <S.Wrap>
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
        {loading && <Loading />}
      </ul>
    </S.Wrap>
  );
};

export default IssueList;

const S = {
  Wrap: styled.div`
    ${flexBox()}
    margin-top: 40px;

    ul {
      width: 1200px;
      overflow: auto;
      border: 1px solid ${({ theme }) => theme.deepGray};
      border-radius: 8px;

      li {
        border-bottom: 1px solid ${({ theme }) => theme.deepGray};

        cursor: pointer;

        :hover {
          background-color: ${({ theme }) => theme.lightGray};
        }
      }
    }
  `,
};
