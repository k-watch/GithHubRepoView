import { Outlet, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const state = useIssueState();
  const dispatch = useIssueDispatch();

  const { data: issue, loading, error } = state.issueMain;

  useEffect(() => {
    getIssueMain(dispatch, false);
  }, []);

  const onClickMain = () => {
    navigate('/');
  };

  return (
    <div>
      {issue && (
        <S.Wrap>
          <S.TitleWrap>
            <BiBookBookmark />
            {issue.owner.login} / <span>{issue.name}</span>
          </S.TitleWrap>
          <S.NavWrap>
            <li key={issue.id} role="presentation" onClick={onClickMain}>
              <TbCircleDot />
              <span>Issues</span>
              <span className="issueCount">{issue.open_issues_count}</span>
            </li>
          </S.NavWrap>
        </S.Wrap>
      )}
      <Outlet />
    </div>
  );
};

export default IssueHeader;

const S = {
  Wrap: styled.div`
    padding: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.deepGray};
    background-color: ${({ theme }) => theme.lightGray};
  `,

  TitleWrap: styled.div`
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
  `,

  NavWrap: styled.nav`
    margin-top: 30px;
    margin-left: 10px;

    li {
      display: flex;
      align-items: center;

      cursor: pointer;

      span {
        margin-left: 5px;
        font-size: 13px;
        font-weight: bold;
      }

      .issueCount {
        padding: 2px 5px;
        background-color: ${({ theme }) => theme.deepGray};
        border-radius: 40px;
      }
    }
  `,
};
