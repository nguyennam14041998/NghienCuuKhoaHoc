import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDanhgia, defaultValue } from 'app/shared/model/danhgia.model';

export const ACTION_TYPES = {
  FETCH_DANHGIA_LIST: 'danhgia/FETCH_DANHGIA_LIST',
  FETCH_DANHGIA: 'danhgia/FETCH_DANHGIA',
  CREATE_DANHGIA: 'danhgia/CREATE_DANHGIA',
  UPDATE_DANHGIA: 'danhgia/UPDATE_DANHGIA',
  DELETE_DANHGIA: 'danhgia/DELETE_DANHGIA',
  RESET: 'danhgia/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDanhgia>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DanhgiaState = Readonly<typeof initialState>;

// Reducer

export default (state: DanhgiaState = initialState, action): DanhgiaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DANHGIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DANHGIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DANHGIA):
    case REQUEST(ACTION_TYPES.UPDATE_DANHGIA):
    case REQUEST(ACTION_TYPES.DELETE_DANHGIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DANHGIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DANHGIA):
    case FAILURE(ACTION_TYPES.CREATE_DANHGIA):
    case FAILURE(ACTION_TYPES.UPDATE_DANHGIA):
    case FAILURE(ACTION_TYPES.DELETE_DANHGIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DANHGIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DANHGIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DANHGIA):
    case SUCCESS(ACTION_TYPES.UPDATE_DANHGIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DANHGIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/danhgias';

// Actions

export const getEntities: ICrudGetAllAction<IDanhgia> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DANHGIA_LIST,
    payload: axios.get<IDanhgia>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDanhgia> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DANHGIA,
    payload: axios.get<IDanhgia>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDanhgia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DANHGIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDanhgia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DANHGIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDanhgia> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DANHGIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
