import { useParams } from 'react-router-dom';
import {
  useIssueState,
  useIssueDispatch,
  getIssue,
} from 'modules/context/IssueContext';
import { useEffect } from 'react';
import { TbCircleDot } from 'react-icons/tb';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css';
import styled from 'styled-components';

const IssueContent = () => {
  const { issueNumber } = useParams();

  const state = useIssueState();
  const dispatch = useIssueDispatch();

  const { data: issue, loading, error } = state.issue;

  useEffect(() => {
    if (issueNumber) {
      getIssue(dispatch, issueNumber);
    }
  }, [issueNumber]);

  return (
    <S.Wrap>
      {issue && (
        <div>
          <S.TitleWrap>
            <span className="titleText">{issue.title}</span>
            <span className="issueNumber">#{issue.number}</span>
          </S.TitleWrap>
          <S.SubTitleWrap>
            <span className="openCircle">
              <TbCircleDot />
              Open
            </span>
            <span className="userName">{issue.user.login}</span>
            <span>opend this issue on</span>
            <span>{new Date(issue.created_at).toDateString()}</span>
            <span>· {issue.comments} comments</span>
          </S.SubTitleWrap>
          <S.Line />
          <S.BodyWrap>
            <div className="title">
              <img
                src={`${issue.user.avatar_url}&s=80`}
                alt={issue.user.login}
              />
              <span className="userName">{issue.user.login}</span>
              <span>commented on</span>
              <span>{new Date(issue.created_at).toDateString()}</span>
            </div>
            <div className="content">
              <div className="markdown-body">
                <ReactMarkdown className="Wrap" remarkPlugins={[remarkGfm]}>
                  {issue.body}
                </ReactMarkdown>
              </div>
            </div>
          </S.BodyWrap>
        </div>
      )}
    </S.Wrap>
  );
};

export default IssueContent;

const S = {
  Wrap: styled.div`
    padding: 50px;
  `,

  TitleWrap: styled.h1`
    margin-bottom: 10px;
    font-size: 32px;

    .titleText {
      margin-right: 10px;
    }

    .issueNumber {
      font-weight: lighter;
      color: ${({ theme }) => theme.gray};
    }
  `,

  SubTitleWrap: styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;

    span {
      margin-right: 5px;
      font-size: 14px;
      color: ${({ theme }) => theme.gray};
    }

    .openCircle {
      display: flex;
      align-items: center;
      padding: 8px;
      border-radius: 40px;
      background-color: ${({ theme }) => theme.green};
      font-weight: bold;
      color: white;
      line-height: 0.1;

      svg {
        margin-right: 3px;
      }
    }

    .userName {
      font-weight: bold;
    }
  `,

  Line: styled.div`
    margin: 25px 0;
    border-bottom: 1px solid ${({ theme }) => theme.deepGray};
  `,

  BodyWrap: styled.div`
    border: 1px solid ${({ theme }) => theme.deepGray};
    border-radius: 8px;

    .title {
      display: flex;
      align-items: center;
      padding: 8px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      border-bottom: 1px solid ${({ theme }) => theme.deepGray};
      background-color: ${({ theme }) => theme.lightGray};

      img {
        height: 35px;
        margin-right: 8px;
        border-radius: 40px;
      }
      span {
        margin-right: 5px;
        font-size: 15px;
        color: ${({ theme }) => theme.gray};
      }
      .userName {
        font-weight: bold;
      }
    }

    .content {
      padding: 15px 20px 0px 20px;
    }
  `,
};
