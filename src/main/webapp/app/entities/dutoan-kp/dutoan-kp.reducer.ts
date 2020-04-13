import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDutoanKP, defaultValue } from 'app/shared/model/dutoan-kp.model';

export const ACTION_TYPES = {
  FETCH_DUTOANKP_LIST: 'dutoanKP/FETCH_DUTOANKP_LIST',
  FETCH_DUTOANKP: 'dutoanKP/FETCH_DUTOANKP',
  CREATE_DUTOANKP: 'dutoanKP/CREATE_DUTOANKP',
  UPDATE_DUTOANKP: 'dutoanKP/UPDATE_DUTOANKP',
  DELETE_DUTOANKP: 'dutoanKP/DELETE_DUTOANKP',
  RESET: 'dutoanKP/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDutoanKP>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DutoanKPState = Readonly<typeof initialState>;

// Reducer

export default (state: DutoanKPState = initialState, action): DutoanKPState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DUTOANKP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DUTOANKP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DUTOANKP):
    case REQUEST(ACTION_TYPES.UPDATE_DUTOANKP):
    case REQUEST(ACTION_TYPES.DELETE_DUTOANKP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DUTOANKP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DUTOANKP):
    case FAILURE(ACTION_TYPES.CREATE_DUTOANKP):
    case FAILURE(ACTION_TYPES.UPDATE_DUTOANKP):
    case FAILURE(ACTION_TYPES.DELETE_DUTOANKP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DUTOANKP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DUTOANKP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DUTOANKP):
    case SUCCESS(ACTION_TYPES.UPDATE_DUTOANKP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DUTOANKP):
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

const apiUrl = 'api/dutoan-kps';

// Actions

export const getEntities: ICrudGetAllAction<IDutoanKP> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DUTOANKP_LIST,
    payload: axios.get<IDutoanKP>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDutoanKP> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DUTOANKP,
    payload: axios.get<IDutoanKP>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDutoanKP> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DUTOANKP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDutoanKP> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DUTOANKP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDutoanKP> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DUTOANKP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
