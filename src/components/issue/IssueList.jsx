import { useState, useEffect } from 'react';
import {
  useIssueDispatch,
  useIssueState,
  getIssueList,
} from 'modules/context/IssueContext';
import useInfiniteScroll from 'modules/hooks/useInfiniteScroll';
import styled from 'styled-components';

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

let page = 1;
let check = false;

const IssueList = () => {
  const [number, setNumber] = useState(null);
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
              onClick={() => setNumber(issue.number)}
              style={{ cursor: 'pointer' }}
            >
              {index + 1}
              <div>
                <span>#{issue.number}</span> &nbsp;
                <span>제목:{issue.title}</span>
              </div>
              <div>
                <span>작성자:{issue.user.login}</span> &nbsp;
                <span>작성일:{issue.created_at}</span> &nbsp;
                <span>코멘트 수:{issue.comments}</span>
              </div>
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
  border: 1px solid black;

  ul {
    width: 500px;
    height: 300px;
    overflow: auto;
  }

  li {
    border: 1px solid black;
    margin-bottom: 20px;
  }
`;
