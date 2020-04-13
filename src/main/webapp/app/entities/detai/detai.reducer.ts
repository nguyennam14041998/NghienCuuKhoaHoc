import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDetai, defaultValue } from 'app/shared/model/detai.model';

export const ACTION_TYPES = {
  FETCH_DETAI_LIST: 'detai/FETCH_DETAI_LIST',
  FETCH_DETAI: 'detai/FETCH_DETAI',
  CREATE_DETAI: 'detai/CREATE_DETAI',
  UPDATE_DETAI: 'detai/UPDATE_DETAI',
  DELETE_DETAI: 'detai/DELETE_DETAI',
  RESET: 'detai/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDetai>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DetaiState = Readonly<typeof initialState>;

// Reducer

export default (state: DetaiState = initialState, action): DetaiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DETAI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DETAI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DETAI):
    case REQUEST(ACTION_TYPES.UPDATE_DETAI):
    case REQUEST(ACTION_TYPES.DELETE_DETAI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DETAI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DETAI):
    case FAILURE(ACTION_TYPES.CREATE_DETAI):
    case FAILURE(ACTION_TYPES.UPDATE_DETAI):
    case FAILURE(ACTION_TYPES.DELETE_DETAI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DETAI_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DETAI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DETAI):
    case SUCCESS(ACTION_TYPES.UPDATE_DETAI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DETAI):
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

const apiUrl = 'api/detais';

// Actions

export const getEntities: ICrudGetAllAction<IDetai> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DETAI_LIST,
    payload: axios.get<IDetai>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDetai> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DETAI,
    payload: axios.get<IDetai>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDetai> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DETAI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDetai> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DETAI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDetai> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DETAI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
