const getAsyncActionType = (actionName) => {
  const asyncTypeAction = ['_INIT', '_REQUEST', '_SUCCESS', '_ERROR'];

  return {
    INIT: actionName + asyncTypeAction[0],
    REQUEST: actionName + asyncTypeAction[1],
    SUCCESS: actionName + asyncTypeAction[2],
    FAILURE: actionName + asyncTypeAction[3],
  };
};

const createAsyncDispatcher = (type, callback) => {
  const ACTION_TYPE = getAsyncActionType(type);

  const actionHandler = async (dispatch, init, ...rest) => {
    // init 이 true 일 경우 state 값 초기화라서
    // 다른 action 은 호출하지 않는다.
    if (init) {
      dispatch({ type: ACTION_TYPE.INIT });
      return;
    }

    dispatch({ type: ACTION_TYPE.REQUEST });

    try {
      const data = await callback(...rest);
      dispatch({
        type: ACTION_TYPE.SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        error,
      });
    }
  };

  return actionHandler;
};

export const initAsyncState = {
  loading: false,
  data: null,
  error: null,
};

const loadingState = {
  loading: true,
  data: null,
  error: null,
};

const success = (data) => ({
  loading: false,
  data,
  error: null,
});

const error = (error) => ({
  loading: false,
  data: null,
  error,
});

export const createAsyncHandler = (type, key) => {
  const ACTION_TYPE = getAsyncActionType(type);

  function handler(state, action) {
    switch (action.type) {
      case ACTION_TYPE.INIT:
        return {
          ...state,
          [key]: initAsyncState,
        };
      case ACTION_TYPE.REQUEST:
        return {
          ...state,
          [key]: loadingState,
        };
      case ACTION_TYPE.SUCCESS:
        return {
          ...state,
          [key]: success(action.data),
        };
      case ACTION_TYPE.ERROR:
        return {
          ...state,
          [key]: error(action.error),
        };
      default:
        return state;
    }
  }
  return handler;
};

export default createAsyncDispatcher;
