import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICapdetai, defaultValue } from 'app/shared/model/capdetai.model';
import { AxiosPromise } from 'axios';
export interface IPayload<T> {
  type: string;
  payload: AxiosPromise<T>;
  meta?: any;
}
export declare type getCapDeTai<T> = (
  page?: number,
  size?: number,
  sort?: string,
  filterTen?: string,
  filterMa?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export const ACTION_TYPES = {
  FETCH_CAPDETAI_LIST: 'capdetai/FETCH_CAPDETAI_LIST',
  FETCH_CAPDETAI: 'capdetai/FETCH_CAPDETAI',
  CREATE_CAPDETAI: 'capdetai/CREATE_CAPDETAI',
  UPDATE_CAPDETAI: 'capdetai/UPDATE_CAPDETAI',
  DELETE_CAPDETAI: 'capdetai/DELETE_CAPDETAI',
  RESET: 'capdetai/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICapdetai>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CapdetaiState = Readonly<typeof initialState>;

// Reducer

export default (state: CapdetaiState = initialState, action): CapdetaiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CAPDETAI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CAPDETAI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CAPDETAI):
    case REQUEST(ACTION_TYPES.UPDATE_CAPDETAI):
    case REQUEST(ACTION_TYPES.DELETE_CAPDETAI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CAPDETAI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CAPDETAI):
    case FAILURE(ACTION_TYPES.CREATE_CAPDETAI):
    case FAILURE(ACTION_TYPES.UPDATE_CAPDETAI):
    case FAILURE(ACTION_TYPES.DELETE_CAPDETAI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CAPDETAI_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CAPDETAI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CAPDETAI):
    case SUCCESS(ACTION_TYPES.UPDATE_CAPDETAI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CAPDETAI):
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

const apiUrl = 'api/capdetais';

// Actions

export const getEntities: getCapDeTai<ICapdetai> = (page, size, sort, filterMa, filterTen) => {
  const requestUrl = `${apiUrl}${
    sort
      ? `?sudung.notEquals=0&page=${page}&size=${size}&sort=${sort}&macapdetai.contains=${filterMa}&tencapdetai.contains=${filterTen}`
      : ''
  }`;
  return {
    type: ACTION_TYPES.FETCH_CAPDETAI_LIST,
    payload: axios.get<ICapdetai>(
      `${requestUrl}${sort ? '&' : '?sudung.notEquals=0&page=0&size=10&&sort=tencapdetai,asc&'}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const getEntity: ICrudGetAction<ICapdetai> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CAPDETAI,
    payload: axios.get<ICapdetai>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICapdetai> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CAPDETAI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICapdetai> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CAPDETAI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICapdetai> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CAPDETAI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
