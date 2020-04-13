import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDutoanKPCT, defaultValue } from 'app/shared/model/dutoan-kpct.model';

export const ACTION_TYPES = {
  FETCH_DUTOANKPCT_LIST: 'dutoanKPCT/FETCH_DUTOANKPCT_LIST',
  FETCH_DUTOANKPCT: 'dutoanKPCT/FETCH_DUTOANKPCT',
  CREATE_DUTOANKPCT: 'dutoanKPCT/CREATE_DUTOANKPCT',
  UPDATE_DUTOANKPCT: 'dutoanKPCT/UPDATE_DUTOANKPCT',
  DELETE_DUTOANKPCT: 'dutoanKPCT/DELETE_DUTOANKPCT',
  RESET: 'dutoanKPCT/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDutoanKPCT>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DutoanKPCTState = Readonly<typeof initialState>;

// Reducer

export default (state: DutoanKPCTState = initialState, action): DutoanKPCTState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DUTOANKPCT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DUTOANKPCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DUTOANKPCT):
    case REQUEST(ACTION_TYPES.UPDATE_DUTOANKPCT):
    case REQUEST(ACTION_TYPES.DELETE_DUTOANKPCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DUTOANKPCT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DUTOANKPCT):
    case FAILURE(ACTION_TYPES.CREATE_DUTOANKPCT):
    case FAILURE(ACTION_TYPES.UPDATE_DUTOANKPCT):
    case FAILURE(ACTION_TYPES.DELETE_DUTOANKPCT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DUTOANKPCT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DUTOANKPCT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DUTOANKPCT):
    case SUCCESS(ACTION_TYPES.UPDATE_DUTOANKPCT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DUTOANKPCT):
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

const apiUrl = 'api/dutoan-kpcts';

// Actions

export const getEntities: ICrudGetAllAction<IDutoanKPCT> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DUTOANKPCT_LIST,
    payload: axios.get<IDutoanKPCT>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDutoanKPCT> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DUTOANKPCT,
    payload: axios.get<IDutoanKPCT>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDutoanKPCT> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DUTOANKPCT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDutoanKPCT> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DUTOANKPCT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDutoanKPCT> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DUTOANKPCT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
