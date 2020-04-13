import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INoidungdanhgia, defaultValue } from 'app/shared/model/noidungdanhgia.model';

export const ACTION_TYPES = {
  FETCH_NOIDUNGDANHGIA_LIST: 'noidungdanhgia/FETCH_NOIDUNGDANHGIA_LIST',
  FETCH_NOIDUNGDANHGIA: 'noidungdanhgia/FETCH_NOIDUNGDANHGIA',
  CREATE_NOIDUNGDANHGIA: 'noidungdanhgia/CREATE_NOIDUNGDANHGIA',
  UPDATE_NOIDUNGDANHGIA: 'noidungdanhgia/UPDATE_NOIDUNGDANHGIA',
  DELETE_NOIDUNGDANHGIA: 'noidungdanhgia/DELETE_NOIDUNGDANHGIA',
  RESET: 'noidungdanhgia/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INoidungdanhgia>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type NoidungdanhgiaState = Readonly<typeof initialState>;

// Reducer

export default (state: NoidungdanhgiaState = initialState, action): NoidungdanhgiaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NOIDUNGDANHGIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NOIDUNGDANHGIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NOIDUNGDANHGIA):
    case REQUEST(ACTION_TYPES.UPDATE_NOIDUNGDANHGIA):
    case REQUEST(ACTION_TYPES.DELETE_NOIDUNGDANHGIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NOIDUNGDANHGIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NOIDUNGDANHGIA):
    case FAILURE(ACTION_TYPES.CREATE_NOIDUNGDANHGIA):
    case FAILURE(ACTION_TYPES.UPDATE_NOIDUNGDANHGIA):
    case FAILURE(ACTION_TYPES.DELETE_NOIDUNGDANHGIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOIDUNGDANHGIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOIDUNGDANHGIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NOIDUNGDANHGIA):
    case SUCCESS(ACTION_TYPES.UPDATE_NOIDUNGDANHGIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NOIDUNGDANHGIA):
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

const apiUrl = 'api/noidungdanhgias';

// Actions

export const getEntities: ICrudGetAllAction<INoidungdanhgia> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?sudung.notEquals=0&page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_NOIDUNGDANHGIA_LIST,
    payload: axios.get<INoidungdanhgia>(
      `${requestUrl}${sort ? '&' : '?sudung.notEquals=0&page=0&size=10&sort=noidung,asc&'}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const getEntity: ICrudGetAction<INoidungdanhgia> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NOIDUNGDANHGIA,
    payload: axios.get<INoidungdanhgia>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INoidungdanhgia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NOIDUNGDANHGIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INoidungdanhgia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NOIDUNGDANHGIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INoidungdanhgia> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NOIDUNGDANHGIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
