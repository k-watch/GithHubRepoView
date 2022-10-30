import { useReducer, createContext, useContext } from 'react';
import createAsyncDispatcher, {
  createAsyncHandler,
  initAsyncState,
} from 'lib/asyncActionUtils';
import * as api from 'api/issue/issue';

const initState = {
  issueList: initAsyncState,
  issue: initAsyncState,
};

const issueListHandler = createAsyncHandler('GET_ISSUE_LIST', 'issueList');
const issueHandler = createAsyncHandler('GET_ISSUE', 'issue');

const issueReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ISSUE_LIST':
    case 'GET_ISSUE_LIST_SUCCESS':
    case 'GET_ISSUE_LIST_ERROR':
      return issueListHandler(state, action);
    case 'GET_ISSUE':
    case 'GET_ISSUE_SUCCESS':
    case 'GET_ISSUE_ERROR':
      return issueHandler(state, action);
    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
};

const issueStateContext = createContext(null);
const issueDispatchContext = createContext(null);

export const IssueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(issueReducer, initState);
  return (
    <issueStateContext.Provider value={state}>
      <issueDispatchContext.Provider value={dispatch}>
        {children}
      </issueDispatchContext.Provider>
    </issueStateContext.Provider>
  );
};

export const useIssueState = () => {
  const state = useContext(issueStateContext);

  if (!state) {
    throw new Error('Cannot find IssueProvider');
  }
  return state;
};

export const useIssueDispatch = () => {
  const dispatch = useContext(issueDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find IssueProvider');
  }
  return dispatch;
};

export const getIssueList = createAsyncDispatcher(
  'GET_ISSUE_LIST',
  api.getIssueList
);
export const getIssue = createAsyncDispatcher('GET_ISSUE', api.getIssue);
