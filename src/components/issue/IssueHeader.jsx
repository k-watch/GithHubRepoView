import { useEffect } from 'react';
import {
  useIssueState,
  useIssueDispatch,
  getIssueMain,
} from 'modules/context/IssueContext';
import { BiBookBookmark } from 'react-icons/bi';
import { TbCircleDot } from 'react-icons/tb';
import styled from 'styled-components';

const IssueHeader = () => {
  const state = useIssueState();
  const dispatch = useIssueDispatch();

  const { data: issue, loading, error } = state.issueMain;

  useEffect(() => {
    getIssueMain(dispatch);
  }, []);

  return (
    <div>
      {issue && (
        <Wrap>
          <TitleWrap>
            <BiBookBookmark />
            {issue.owner.login} / <span>{issue.name}</span>
          </TitleWrap>
          <NavWrap>
            <li>
              <TbCircleDot />
              <span>Issues</span>
              <span className="issueCount">{issue.open_issues_count}</span>
            </li>
          </NavWrap>
        </Wrap>
      )}
    </div>
  );
};

export default IssueHeader;

const Wrap = styled.div`
  padding: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d8d8d8;
  background-color: #f5f5f5;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;

  font-size: 22px;

  svg {
    margin-right: 8px;
  }

  span {
    margin-left: 8px;
    font-weight: bold;
  }
`;

const NavWrap = styled.nav`
  margin-top: 30px;
  margin-left: 10px;

  li {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
      font-size: 13px;
      font-weight: bold;
    }

    .issueCount {
      padding: 2px 5px;
      background-color: #d8d8d8;
      border-radius: 40px;
    }
  }
`;
