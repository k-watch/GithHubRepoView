import { useState, useEffect } from 'react';
import {
  useIssueDispatch,
  useIssueState,
  getIssueList,
} from 'modules/context/IssueContext';
import useInfiniteScroll from 'modules/hooks/useInfiniteScroll';
import styled from 'styled-components';
import IssueItem from './IssueItem';

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

let page = 1;
let check = false;

const IssueList = () => {
  const state = useIssueState();
  const dispatch = useIssueDispatch();
  const [list, setList] = useState([]);
  const { data: issueList, loading, error } = state.issueList;

  useEffect(() => {
    if (issueList) {
      if (issueList.length !== 25) {
        check = true;
      }
      const strArr = Object.values(issueList);

      setList([...list, ...strArr]);
      page += 1;
    }
  }, [issueList]);

  // TODO:
  // 더이상 불러올 데이터 없을 때
  // callback 함수 호출 하지 않게 만들어야 함.
  const target = useInfiniteScroll(() => getIssueList(dispatch, page));

  return (
    <Wrap>
      <ul>
        {list &&
          list.map((issue, index) => (
            <li
              role="presentation"
              key={issue.id}
              style={{ cursor: 'pointer' }}
            >
              <IssueItem issue={issue} />
            </li>
          ))}
        <div ref={target} />
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
  }

  li {
    border-bottom: 1px solid #bdbdbd;

    :hover {
      background-color: #d0d7de2b;
    }
  }
`;
