import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICoquanphoihopthamgia, defaultValue } from 'app/shared/model/coquanphoihopthamgia.model';

export const ACTION_TYPES = {
  FETCH_COQUANPHOIHOPTHAMGIA_LIST: 'coquanphoihopthamgia/FETCH_COQUANPHOIHOPTHAMGIA_LIST',
  FETCH_COQUANPHOIHOPTHAMGIA: 'coquanphoihopthamgia/FETCH_COQUANPHOIHOPTHAMGIA',
  CREATE_COQUANPHOIHOPTHAMGIA: 'coquanphoihopthamgia/CREATE_COQUANPHOIHOPTHAMGIA',
  UPDATE_COQUANPHOIHOPTHAMGIA: 'coquanphoihopthamgia/UPDATE_COQUANPHOIHOPTHAMGIA',
  DELETE_COQUANPHOIHOPTHAMGIA: 'coquanphoihopthamgia/DELETE_COQUANPHOIHOPTHAMGIA',
  RESET: 'coquanphoihopthamgia/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICoquanphoihopthamgia>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CoquanphoihopthamgiaState = Readonly<typeof initialState>;

// Reducer

export default (state: CoquanphoihopthamgiaState = initialState, action): CoquanphoihopthamgiaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COQUANPHOIHOPTHAMGIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COQUANPHOIHOPTHAMGIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COQUANPHOIHOPTHAMGIA):
    case REQUEST(ACTION_TYPES.UPDATE_COQUANPHOIHOPTHAMGIA):
    case REQUEST(ACTION_TYPES.DELETE_COQUANPHOIHOPTHAMGIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COQUANPHOIHOPTHAMGIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COQUANPHOIHOPTHAMGIA):
    case FAILURE(ACTION_TYPES.CREATE_COQUANPHOIHOPTHAMGIA):
    case FAILURE(ACTION_TYPES.UPDATE_COQUANPHOIHOPTHAMGIA):
    case FAILURE(ACTION_TYPES.DELETE_COQUANPHOIHOPTHAMGIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COQUANPHOIHOPTHAMGIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_COQUANPHOIHOPTHAMGIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COQUANPHOIHOPTHAMGIA):
    case SUCCESS(ACTION_TYPES.UPDATE_COQUANPHOIHOPTHAMGIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COQUANPHOIHOPTHAMGIA):
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

const apiUrl = 'api/coquanphoihopthamgias';

// Actions

export const getEntities: ICrudGetAllAction<ICoquanphoihopthamgia> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COQUANPHOIHOPTHAMGIA_LIST,
    payload: axios.get<ICoquanphoihopthamgia>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICoquanphoihopthamgia> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COQUANPHOIHOPTHAMGIA,
    payload: axios.get<ICoquanphoihopthamgia>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICoquanphoihopthamgia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COQUANPHOIHOPTHAMGIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICoquanphoihopthamgia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COQUANPHOIHOPTHAMGIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICoquanphoihopthamgia> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COQUANPHOIHOPTHAMGIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
