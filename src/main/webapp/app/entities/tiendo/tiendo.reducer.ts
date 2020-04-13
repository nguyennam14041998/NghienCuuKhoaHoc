import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITiendo, defaultValue } from 'app/shared/model/tiendo.model';

export const ACTION_TYPES = {
  FETCH_TIENDO_LIST: 'tiendo/FETCH_TIENDO_LIST',
  FETCH_TIENDO: 'tiendo/FETCH_TIENDO',
  CREATE_TIENDO: 'tiendo/CREATE_TIENDO',
  UPDATE_TIENDO: 'tiendo/UPDATE_TIENDO',
  DELETE_TIENDO: 'tiendo/DELETE_TIENDO',
  RESET: 'tiendo/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITiendo>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TiendoState = Readonly<typeof initialState>;

// Reducer

export default (state: TiendoState = initialState, action): TiendoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIENDO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIENDO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIENDO):
    case REQUEST(ACTION_TYPES.UPDATE_TIENDO):
    case REQUEST(ACTION_TYPES.DELETE_TIENDO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIENDO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIENDO):
    case FAILURE(ACTION_TYPES.CREATE_TIENDO):
    case FAILURE(ACTION_TYPES.UPDATE_TIENDO):
    case FAILURE(ACTION_TYPES.DELETE_TIENDO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIENDO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIENDO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIENDO):
    case SUCCESS(ACTION_TYPES.UPDATE_TIENDO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIENDO):
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

const apiUrl = 'api/tiendos';

// Actions

export const getEntities: ICrudGetAllAction<ITiendo> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TIENDO_LIST,
    payload: axios.get<ITiendo>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITiendo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIENDO,
    payload: axios.get<ITiendo>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITiendo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIENDO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITiendo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIENDO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITiendo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIENDO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
