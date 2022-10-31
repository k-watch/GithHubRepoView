import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TbCircleDot } from 'react-icons/tb';
import { HiOutlineChatBubbleLeft } from 'react-icons/hi2';

const IssueItem = ({ issue }) => {
  const navigate = useNavigate();

  return (
    <Wrap role="presentation" onClick={() => navigate(`/${issue.number}`)}>
      <TitleWrap>
        <TbCircleDot className="circleDot" />
        <h4>{issue.title}</h4>
        <div>
          <HiOutlineChatBubbleLeft />
          <span>{issue.comments}</span>
        </div>
      </TitleWrap>
      <InfoWrap>
        <span>#{issue.number}</span>
        <span>opend on {new Date(issue.created_at).toDateString()}</span>
        <span>by {issue.user.login}</span>
      </InfoWrap>
    </Wrap>
  );
};

export default IssueItem;

const Wrap = styled.div`
  padding: 15px;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;

  .circleDot {
    margin-right: 5px;
    font-size: 17px;
    color: ${({ theme }) => theme.green};
  }

  h4 {
    margin-bottom: 3px;
    font-weight: bold;
    font-size: 17px;
  }

  div {
    display: flex;
    align-items: center;
    margin-left: auto;
    font-weight: bold;
    font-size: 14px;

    span {
      margin-bottom: 3px;
    }

    svg {
      margin-right: 5px;
      font-size: 15px;
    }
  }
`;

const InfoWrap = styled.div`
  margin-top: 10px;

  span {
    margin-right: 5px;
    font-size: 12px;
    color: ${({ theme }) => theme.gray};
  }
`;
