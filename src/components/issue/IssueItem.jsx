import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TbCircleDot } from 'react-icons/tb';
import { HiOutlineChatBubbleLeft } from 'react-icons/hi2';

const today = new Date();

const IssueItem = ({ issue }) => {
  const navigate = useNavigate();

  return (
    <Wrap role="presentation" onClick={() => navigate(`/${issue.number}`)}>
      <Title>
        <TbCircleDot className="circleDot" />
        <h4>{issue.title}</h4>
        <span>
          <HiOutlineChatBubbleLeft /> {issue.comments}
        </span>
      </Title>
      <InfoWrap>
        <span>#{issue.number}</span>
        <span>opend on {today.toDateString(issue.created_at)}</span>
        <span>by {issue.user.login}</span>
      </InfoWrap>
    </Wrap>
  );
};

export default IssueItem;

const Wrap = styled.div`
  padding: 15px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  .circleDot {
    margin-right: 5px;
    font-size: 17px;
    color: #024400bc;
  }

  h4 {
    font-weight: bold;
    font-size: 17px;
    line-height: 0.2;
  }

  span {
    display: flex;
    align-items: center;
    margin-left: auto;
    font-weight: bold;
    font-size: 14px;

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
    color: #696969;
  }
`;
