import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDanhgiaCT, defaultValue } from 'app/shared/model/danhgia-ct.model';

export const ACTION_TYPES = {
  FETCH_DANHGIACT_LIST: 'danhgiaCT/FETCH_DANHGIACT_LIST',
  FETCH_DANHGIACT: 'danhgiaCT/FETCH_DANHGIACT',
  CREATE_DANHGIACT: 'danhgiaCT/CREATE_DANHGIACT',
  UPDATE_DANHGIACT: 'danhgiaCT/UPDATE_DANHGIACT',
  DELETE_DANHGIACT: 'danhgiaCT/DELETE_DANHGIACT',
  RESET: 'danhgiaCT/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDanhgiaCT>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DanhgiaCTState = Readonly<typeof initialState>;

// Reducer

export default (state: DanhgiaCTState = initialState, action): DanhgiaCTState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DANHGIACT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DANHGIACT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DANHGIACT):
    case REQUEST(ACTION_TYPES.UPDATE_DANHGIACT):
    case REQUEST(ACTION_TYPES.DELETE_DANHGIACT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DANHGIACT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DANHGIACT):
    case FAILURE(ACTION_TYPES.CREATE_DANHGIACT):
    case FAILURE(ACTION_TYPES.UPDATE_DANHGIACT):
    case FAILURE(ACTION_TYPES.DELETE_DANHGIACT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DANHGIACT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DANHGIACT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DANHGIACT):
    case SUCCESS(ACTION_TYPES.UPDATE_DANHGIACT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DANHGIACT):
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

const apiUrl = 'api/danhgia-cts';

// Actions

export const getEntities: ICrudGetAllAction<IDanhgiaCT> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DANHGIACT_LIST,
    payload: axios.get<IDanhgiaCT>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDanhgiaCT> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DANHGIACT,
    payload: axios.get<IDanhgiaCT>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDanhgiaCT> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DANHGIACT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDanhgiaCT> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DANHGIACT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDanhgiaCT> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DANHGIACT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
