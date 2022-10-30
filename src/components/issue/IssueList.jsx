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

let page = 8;
const check = false;

const IssueList = () => {
  const state = useIssueState();
  const dispatch = useIssueDispatch();
  const [list, setList] = useState([]);
  const { data: issueList, loading, error } = state.issueList;

  const [target, setObserverStop] = useInfiniteScroll(() =>
    getIssueList(dispatch, page)
  );

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
    max-width: 1200px;
    min-width: 380px;
    height: 700px;
    overflow: auto;
    border: 1px solid #bdbdbd;
    border-radius: 8px;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  li {
    border-bottom: 1px solid #bdbdbd;

    :hover {
      background-color: #d0d7de2b;
    }
  }
`;
