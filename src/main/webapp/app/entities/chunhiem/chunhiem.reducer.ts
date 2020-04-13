import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IChunhiem, defaultValue } from 'app/shared/model/chunhiem.model';

export const ACTION_TYPES = {
  FETCH_CHUNHIEM_LIST: 'chunhiem/FETCH_CHUNHIEM_LIST',
  FETCH_CHUNHIEM: 'chunhiem/FETCH_CHUNHIEM',
  CREATE_CHUNHIEM: 'chunhiem/CREATE_CHUNHIEM',
  UPDATE_CHUNHIEM: 'chunhiem/UPDATE_CHUNHIEM',
  DELETE_CHUNHIEM: 'chunhiem/DELETE_CHUNHIEM',
  RESET: 'chunhiem/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChunhiem>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ChunhiemState = Readonly<typeof initialState>;

// Reducer

export default (state: ChunhiemState = initialState, action): ChunhiemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHUNHIEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHUNHIEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHUNHIEM):
    case REQUEST(ACTION_TYPES.UPDATE_CHUNHIEM):
    case REQUEST(ACTION_TYPES.DELETE_CHUNHIEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CHUNHIEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHUNHIEM):
    case FAILURE(ACTION_TYPES.CREATE_CHUNHIEM):
    case FAILURE(ACTION_TYPES.UPDATE_CHUNHIEM):
    case FAILURE(ACTION_TYPES.DELETE_CHUNHIEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHUNHIEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHUNHIEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHUNHIEM):
    case SUCCESS(ACTION_TYPES.UPDATE_CHUNHIEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHUNHIEM):
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

const apiUrl = 'api/chunhiems';

// Actions

export const getEntities: ICrudGetAllAction<IChunhiem> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?sudung.notEquals=0&page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CHUNHIEM_LIST,
    payload: axios.get<IChunhiem>(`${requestUrl}${sort ? '&' : '?sudung.notEquals=0&page=0&size=10&'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IChunhiem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHUNHIEM,
    payload: axios.get<IChunhiem>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IChunhiem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHUNHIEM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChunhiem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHUNHIEM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChunhiem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHUNHIEM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
