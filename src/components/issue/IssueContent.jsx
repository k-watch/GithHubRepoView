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
    <div>
      {loading && <div>로딩중</div>}
      {issue && (
        <div>
          <div>#{issue.number}</div>
          <div>{issue.title}</div>
          <div>
            <span>
              <img
                src={`${issue.user.avatar_url}&s=80`}
                alt={issue.user.login}
              />
            </span>
            <span>{issue.user.login}</span>
            <span>{issue.created_at}</span>
            <span>{issue.comments}</span>
          </div>
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
      )}
    </div>
  );
};

export default IssueContent;
