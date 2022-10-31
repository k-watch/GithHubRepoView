import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TbCircleDot } from 'react-icons/tb';
import { SlBubble } from 'react-icons/sl';

const IssueItem = ({ issue }) => {
  const navigate = useNavigate();

  return (
    <S.Wrap role="presentation" onClick={() => navigate(`/${issue.number}`)}>
      <S.TitleWrap>
        <TbCircleDot className="circleDot" />
        <h4>{issue.title}</h4>
        <div>
          <SlBubble />
          <span>{issue.comments}</span>
        </div>
      </S.TitleWrap>
      <S.InfoWrap>
        <span>#{issue.number}</span>
        <span>opend on {new Date(issue.created_at).toDateString()}</span>
        <span>by {issue.user.login}</span>
      </S.InfoWrap>
    </S.Wrap>
  );
};

export default IssueItem;

const S = {
  Wrap: styled.div`
    padding: 15px;
  `,

  TitleWrap: styled.div`
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
  `,

  InfoWrap: styled.div`
    margin-top: 10px;

    span {
      margin-right: 5px;
      font-size: 12px;
      color: ${({ theme }) => theme.gray};
    }
  `,
};
