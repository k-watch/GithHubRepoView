import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import IssueListPage from 'pages/IssueListPage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<IssueListPage />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
