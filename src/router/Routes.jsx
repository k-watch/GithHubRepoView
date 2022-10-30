import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import IssueListPage from 'pages/IssueListPage';
import IssueContent from 'components/issue/IssueContent';
import IssueHeader from 'components/issue/IssueHeader';

const Routes = () => {
  return (
    <BrowserRouter>
      <IssueHeader />
      <ReactRoutes>
        <Route path="/" element={<IssueListPage />} />
        <Route path="/:issueNumber" element={<IssueContent />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
