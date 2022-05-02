import {
  ADD_DATA_SUCCESS,
  CHECKED_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  POST_USER_STARTED,
  CLEAR_DATA_SUCCESS,
  EDIT_DATA_SUCCESS,
} from '../Constants/constantsInput';

export const initialState = {
  rows: [],
  login: false,
  userToken: null,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA_SUCCESS: {
      return {
        ...state,
        rows: [...state.rows, action.payload],
      };
    }
    case EDIT_DATA_SUCCESS: {
      const copyRows = Array.from(state.rows);
      const { id, value, field } = action.payload;
      const indexRow = copyRows.findIndex((row) => row.id === id);
      if (indexRow === -1) return;
      copyRows[indexRow][field] = value;
      return {
        ...state,
        rows: [...copyRows],
      };
    }
    case CLEAR_DATA_SUCCESS: {
      return {
        ...state,
        rows: [],
      };
    }
    case DELETE_TODO_SUCCESS: {
      const copyRows = Array.from(state.rows);
      const removeIds = copyRows
        .filter((row) => row.checked)
        .map((row) => row.id);
      removeIds.forEach((element) => {
        const indexRow = copyRows.findIndex((row) => row.id === element);
        if (indexRow === -1) return;
        copyRows.splice(indexRow, 1);
      });
      return {
        ...state,
        rows: copyRows,
      };
    }
    case CHECKED_TODO_SUCCESS: {
      action.payload.ids.forEach((element) => {
        const indexRow = state.rows.findIndex((row) => row.id === element);
        if (indexRow === -1) return;
        state.rows[indexRow].checked = !state.rows[indexRow].checked;
      });
      return {
        ...state,
      };
    }
    case POST_USER_STARTED: {
      return {
        ...state,
        login: action.login,
        userToken: action.userToken,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
