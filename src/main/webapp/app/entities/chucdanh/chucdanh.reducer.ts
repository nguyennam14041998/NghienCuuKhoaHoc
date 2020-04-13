import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IChucdanh, defaultValue } from 'app/shared/model/chucdanh.model';
import { AxiosPromise } from 'axios';
export interface IPayload<T> {
  type: string;
  payload: AxiosPromise<T>;
  meta?: any;
}
export declare type getChucDanh<T> = (
  page?: number,
  size?: number,
  sort?: string,
  filterTen?: string,
  filterMa?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export const ACTION_TYPES = {
  FETCH_CHUCDANH_LIST: 'chucdanh/FETCH_CHUCDANH_LIST',
  FETCH_CHUCDANH: 'chucdanh/FETCH_CHUCDANH',
  CREATE_CHUCDANH: 'chucdanh/CREATE_CHUCDANH',
  UPDATE_CHUCDANH: 'chucdanh/UPDATE_CHUCDANH',
  DELETE_CHUCDANH: 'chucdanh/DELETE_CHUCDANH',
  RESET: 'chucdanh/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChucdanh>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ChucdanhState = Readonly<typeof initialState>;

// Reducer

export default (state: ChucdanhState = initialState, action): ChucdanhState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHUCDANH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHUCDANH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHUCDANH):
    case REQUEST(ACTION_TYPES.UPDATE_CHUCDANH):
    case REQUEST(ACTION_TYPES.DELETE_CHUCDANH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CHUCDANH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHUCDANH):
    case FAILURE(ACTION_TYPES.CREATE_CHUCDANH):
    case FAILURE(ACTION_TYPES.UPDATE_CHUCDANH):
    case FAILURE(ACTION_TYPES.DELETE_CHUCDANH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHUCDANH_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHUCDANH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHUCDANH):
    case SUCCESS(ACTION_TYPES.UPDATE_CHUCDANH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHUCDANH):
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

const apiUrl = 'api/chucdanhs';

// Actions

export const getEntities: getChucDanh<IChucdanh> = (page, size, sort, filterMa, filterTen) => {
  const requestUrl = `${apiUrl}${
    sort
      ? `?sudung.notEquals=0&page=${page}&size=${size}&sort=${sort}&machucdanh.contains=${filterMa}&tenchucdanh.contains=${filterTen}`
      : ''
  }`;
  return {
    type: ACTION_TYPES.FETCH_CHUCDANH_LIST,
    payload: axios.get<IChucdanh>(
      `${requestUrl}${sort ? '&' : '?sudung.notEquals=0&page=0&size=10&&sort=tenchucdanh,asc&'}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const getEntity: ICrudGetAction<IChucdanh> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHUCDANH,
    payload: axios.get<IChucdanh>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IChucdanh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHUCDANH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChucdanh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHUCDANH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChucdanh> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHUCDANH,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
