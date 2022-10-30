import { useNavigate } from 'react-router-dom';

const IssueItem = ({ issue }) => {
  const navigate = useNavigate();
  return (
    <div role="presentation" onClick={() => navigate(`/${issue.number}`)}>
      <div>
        <span>#{issue.number}</span> &nbsp;
        <span>제목:{issue.title}</span>
      </div>
      <div>
        <span>작성자:{issue.user.login}</span> &nbsp;
        <span>작성일:{issue.created_at}</span> &nbsp;
        <span>코멘트 수:{issue.comments}</span>
      </div>
    </div>
  );
};

export default IssueItem;
