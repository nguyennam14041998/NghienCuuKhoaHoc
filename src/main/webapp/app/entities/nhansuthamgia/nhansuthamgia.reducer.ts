import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INhansuthamgia, defaultValue } from 'app/shared/model/nhansuthamgia.model';

export const ACTION_TYPES = {
  FETCH_NHANSUTHAMGIA_LIST: 'nhansuthamgia/FETCH_NHANSUTHAMGIA_LIST',
  FETCH_NHANSUTHAMGIA: 'nhansuthamgia/FETCH_NHANSUTHAMGIA',
  CREATE_NHANSUTHAMGIA: 'nhansuthamgia/CREATE_NHANSUTHAMGIA',
  UPDATE_NHANSUTHAMGIA: 'nhansuthamgia/UPDATE_NHANSUTHAMGIA',
  DELETE_NHANSUTHAMGIA: 'nhansuthamgia/DELETE_NHANSUTHAMGIA',
  RESET: 'nhansuthamgia/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INhansuthamgia>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type NhansuthamgiaState = Readonly<typeof initialState>;

// Reducer

export default (state: NhansuthamgiaState = initialState, action): NhansuthamgiaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NHANSUTHAMGIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NHANSUTHAMGIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NHANSUTHAMGIA):
    case REQUEST(ACTION_TYPES.UPDATE_NHANSUTHAMGIA):
    case REQUEST(ACTION_TYPES.DELETE_NHANSUTHAMGIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NHANSUTHAMGIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NHANSUTHAMGIA):
    case FAILURE(ACTION_TYPES.CREATE_NHANSUTHAMGIA):
    case FAILURE(ACTION_TYPES.UPDATE_NHANSUTHAMGIA):
    case FAILURE(ACTION_TYPES.DELETE_NHANSUTHAMGIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NHANSUTHAMGIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_NHANSUTHAMGIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NHANSUTHAMGIA):
    case SUCCESS(ACTION_TYPES.UPDATE_NHANSUTHAMGIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NHANSUTHAMGIA):
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

const apiUrl = 'api/nhansuthamgias';

// Actions

export const getEntities: ICrudGetAllAction<INhansuthamgia> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_NHANSUTHAMGIA_LIST,
    payload: axios.get<INhansuthamgia>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<INhansuthamgia> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NHANSUTHAMGIA,
    payload: axios.get<INhansuthamgia>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INhansuthamgia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NHANSUTHAMGIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INhansuthamgia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NHANSUTHAMGIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INhansuthamgia> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NHANSUTHAMGIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
