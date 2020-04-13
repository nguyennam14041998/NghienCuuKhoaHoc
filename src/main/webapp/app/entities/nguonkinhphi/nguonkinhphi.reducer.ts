import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INguonkinhphi, defaultValue } from 'app/shared/model/nguonkinhphi.model';

export const ACTION_TYPES = {
  FETCH_NGUONKINHPHI_LIST: 'nguonkinhphi/FETCH_NGUONKINHPHI_LIST',
  FETCH_NGUONKINHPHI: 'nguonkinhphi/FETCH_NGUONKINHPHI',
  CREATE_NGUONKINHPHI: 'nguonkinhphi/CREATE_NGUONKINHPHI',
  UPDATE_NGUONKINHPHI: 'nguonkinhphi/UPDATE_NGUONKINHPHI',
  DELETE_NGUONKINHPHI: 'nguonkinhphi/DELETE_NGUONKINHPHI',
  RESET: 'nguonkinhphi/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INguonkinhphi>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type NguonkinhphiState = Readonly<typeof initialState>;

// Reducer

export default (state: NguonkinhphiState = initialState, action): NguonkinhphiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NGUONKINHPHI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NGUONKINHPHI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NGUONKINHPHI):
    case REQUEST(ACTION_TYPES.UPDATE_NGUONKINHPHI):
    case REQUEST(ACTION_TYPES.DELETE_NGUONKINHPHI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NGUONKINHPHI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NGUONKINHPHI):
    case FAILURE(ACTION_TYPES.CREATE_NGUONKINHPHI):
    case FAILURE(ACTION_TYPES.UPDATE_NGUONKINHPHI):
    case FAILURE(ACTION_TYPES.DELETE_NGUONKINHPHI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NGUONKINHPHI_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_NGUONKINHPHI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NGUONKINHPHI):
    case SUCCESS(ACTION_TYPES.UPDATE_NGUONKINHPHI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NGUONKINHPHI):
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

const apiUrl = 'api/nguonkinhphis';

// Actions

export const getEntities: ICrudGetAllAction<INguonkinhphi> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_NGUONKINHPHI_LIST,
    payload: axios.get<INguonkinhphi>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<INguonkinhphi> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NGUONKINHPHI,
    payload: axios.get<INguonkinhphi>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INguonkinhphi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NGUONKINHPHI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INguonkinhphi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NGUONKINHPHI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INguonkinhphi> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NGUONKINHPHI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
