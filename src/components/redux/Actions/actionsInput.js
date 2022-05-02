import {
  GET_DATA_SUCCESS,
  ADD_DATA_SUCCESS,
  CHECKED_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  POST_USER_STARTED,
  CLEAR_DATA_SUCCESS,
  EDIT_DATA_SUCCESS,
} from '../Constants/constantsInput';

export const getData = (payload) => ({
  type: GET_DATA_SUCCESS,
  payload,
});
export const editData = (payload) => ({
  type: EDIT_DATA_SUCCESS,
  payload,
});
export const clearData = (payload) => ({
  type: CLEAR_DATA_SUCCESS,
  payload,
});
export const addData = (payload) => ({
  type: ADD_DATA_SUCCESS,
  payload,
});
export const deleteData = () => ({ type: DELETE_TODO_SUCCESS, payload: null });
export const checkedTodoSuccess = (ids) => {
  const action = {
    type: CHECKED_TODO_SUCCESS,
    payload: {
      ids,
    },
  };
  return action;
};
export const logIn = (payload) => ({
  type: POST_USER_STARTED,
  login: payload,
  userToken: payload,
});
