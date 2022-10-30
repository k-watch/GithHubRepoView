import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import IssueListPage from 'pages/IssueListPage';
import IssueContent from 'components/issue/IssueContent';

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<IssueListPage />} />
        <Route path="/:issueNumber" element={<IssueContent />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
