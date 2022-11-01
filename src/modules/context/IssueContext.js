import { useReducer, createContext, useContext } from 'react';
import createAsyncDispatcher, {
  initAsyncState,
  createAsyncHandler,
  initStateDispatcher,
} from 'modules/asyncActionUtils';
import * as api from 'api/issue/issue';

const initState = {
  issueMain: initAsyncState,
  issueList: initAsyncState,
  issue: initAsyncState,
};

const issueMainHandler = createAsyncHandler('GET_ISSUE_MAIN', 'issueMain');
const issueListHandler = createAsyncHandler('GET_ISSUE_LIST', 'issueList');
const issueHandler = createAsyncHandler('GET_ISSUE', 'issue');

const issueReducer = (state, action) => {
  const actionType = action.type;
  const commonActionType = actionType.substring(0, actionType.lastIndexOf('_'));

  switch (commonActionType) {
    case 'GET_ISSUE_MAIN':
      return issueMainHandler(state, action);
    case 'GET_ISSUE_LIST':
      return issueListHandler(state, action);
    case 'GET_ISSUE':
      return issueHandler(state, action);
    default:
      throw new Error(`Unhanded action type: ${actionType}`);
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

export const getIssueMain = createAsyncDispatcher(
  'GET_ISSUE_MAIN',
  api.getIssueMain
);
export const initIssueList = initStateDispatcher('GET_ISSUE_LIST');
export const getIssueList = createAsyncDispatcher(
  'GET_ISSUE_LIST',
  api.getIssueList
);
export const getIssue = createAsyncDispatcher('GET_ISSUE', api.getIssue);
