import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDanhsachbaibao, defaultValue } from 'app/shared/model/danhsachbaibao.model';

export const ACTION_TYPES = {
  FETCH_DANHSACHBAIBAO_LIST: 'danhsachbaibao/FETCH_DANHSACHBAIBAO_LIST',
  FETCH_DANHSACHBAIBAO: 'danhsachbaibao/FETCH_DANHSACHBAIBAO',
  CREATE_DANHSACHBAIBAO: 'danhsachbaibao/CREATE_DANHSACHBAIBAO',
  UPDATE_DANHSACHBAIBAO: 'danhsachbaibao/UPDATE_DANHSACHBAIBAO',
  DELETE_DANHSACHBAIBAO: 'danhsachbaibao/DELETE_DANHSACHBAIBAO',
  RESET: 'danhsachbaibao/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDanhsachbaibao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DanhsachbaibaoState = Readonly<typeof initialState>;

// Reducer

export default (state: DanhsachbaibaoState = initialState, action): DanhsachbaibaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DANHSACHBAIBAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DANHSACHBAIBAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DANHSACHBAIBAO):
    case REQUEST(ACTION_TYPES.UPDATE_DANHSACHBAIBAO):
    case REQUEST(ACTION_TYPES.DELETE_DANHSACHBAIBAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DANHSACHBAIBAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DANHSACHBAIBAO):
    case FAILURE(ACTION_TYPES.CREATE_DANHSACHBAIBAO):
    case FAILURE(ACTION_TYPES.UPDATE_DANHSACHBAIBAO):
    case FAILURE(ACTION_TYPES.DELETE_DANHSACHBAIBAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DANHSACHBAIBAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DANHSACHBAIBAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DANHSACHBAIBAO):
    case SUCCESS(ACTION_TYPES.UPDATE_DANHSACHBAIBAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DANHSACHBAIBAO):
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

const apiUrl = 'api/danhsachbaibaos';

// Actions

export const getEntities: ICrudGetAllAction<IDanhsachbaibao> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DANHSACHBAIBAO_LIST,
    payload: axios.get<IDanhsachbaibao>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDanhsachbaibao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DANHSACHBAIBAO,
    payload: axios.get<IDanhsachbaibao>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDanhsachbaibao> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DANHSACHBAIBAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDanhsachbaibao> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DANHSACHBAIBAO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDanhsachbaibao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DANHSACHBAIBAO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
