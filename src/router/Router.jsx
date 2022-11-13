import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IssueHeader from 'components/issue/IssueHeader';
import IssueListPage from 'pages/IssueListPage';
import IssueContentPage from 'pages/IssueContentPage';
import URL from 'api/common/url';
import Error from 'components/common/Error';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<IssueHeader />}>
          <Route path={URL.ISSUE.LIST_LINK} element={<IssueListPage />} />
          <Route path={URL.ISSUE.CONTENT_LINK} element={<IssueContentPage />} />
        </Route>
        <Route path={URL.ISSUE.ERROR_LINK} element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
