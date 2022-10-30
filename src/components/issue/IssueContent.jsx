/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-children-prop */
import { useParams } from 'react-router-dom';
import {
  useIssueState,
  useIssueDispatch,
  getIssue,
} from 'modules/context/IssueContext';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';
import { TbCircleDot } from 'react-icons/tb';
import 'github-markdown-css';

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
    <Wrap>
      {loading && <div>로딩중</div>}
      {issue && (
        <div>
          <TitleWrap>
            <span className="titleText">{issue.title}</span>
            <span className="issueNumber">#{issue.number}</span>
          </TitleWrap>
          <SubTitleWrap>
            <span className="openCircle">
              <TbCircleDot />
              Open
            </span>
            <span className="userName">{issue.user.login}</span>
            <span>opend this issue on</span>
            <span>{new Date(issue.created_at).toDateString()}</span>
            <span>· {issue.comments} comments</span>
          </SubTitleWrap>
          <Line />
          <BodyWrap>
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
                <ReactMarkdown
                  className="Wrap"
                  children={issue.body}
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          style={vs}
                          language={match[1]}
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                />
              </div>
            </div>
          </BodyWrap>
        </div>
      )}
    </Wrap>
  );
};

export default IssueContent;

const Wrap = styled.div`
  padding: 50px;
`;

const TitleWrap = styled.h1`
  font-size: 32px;

  .titleText {
    margin-right: 10px;
  }

  .issueNumber {
    font-weight: lighter;
    color: #696969;
  }
`;

const SubTitleWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  span {
    margin-right: 5px;
    font-size: 14px;
    color: #696969;
  }

  .openCircle {
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: 40px;
    background-color: #058800b8;
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
`;

const Line = styled.div`
  margin: 25px 0;
  border-bottom: 1px solid #bdbdbd;
`;

const BodyWrap = styled.div`
  border: 1px solid #bdbdbd;
  border-radius: 8px;

  .title {
    display: flex;
    align-items: center;
    padding: 8px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom: 1px solid #bdbdbd;
    background-color: #f5f5f5;

    img {
      height: 35px;
      margin-right: 8px;
      border-radius: 40px;
    }
    span {
      margin-right: 5px;
      font-size: 15px;
      color: #696969;
    }
    .userName {
      font-weight: bold;
    }
  }

  .content {
    padding: 0 20px;
  }
`;
