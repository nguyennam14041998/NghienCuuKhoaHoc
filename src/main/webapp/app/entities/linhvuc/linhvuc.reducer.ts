import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILinhvuc, defaultValue } from 'app/shared/model/linhvuc.model';
import { AxiosPromise } from 'axios';
export interface IPayload<T> {
  type: string;
  payload: AxiosPromise<T>;
  meta?: any;
}
export declare type getLinhVuc<T> = (
  page?: number,
  size?: number,
  sort?: string,
  filterTen?: string,
  filterMa?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export const ACTION_TYPES = {
  FETCH_LINHVUC_LIST: 'linhvuc/FETCH_LINHVUC_LIST',
  FETCH_LINHVUC: 'linhvuc/FETCH_LINHVUC',
  CREATE_LINHVUC: 'linhvuc/CREATE_LINHVUC',
  UPDATE_LINHVUC: 'linhvuc/UPDATE_LINHVUC',
  DELETE_LINHVUC: 'linhvuc/DELETE_LINHVUC',
  RESET: 'linhvuc/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILinhvuc>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LinhvucState = Readonly<typeof initialState>;

// Reducer

export default (state: LinhvucState = initialState, action): LinhvucState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LINHVUC_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LINHVUC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LINHVUC):
    case REQUEST(ACTION_TYPES.UPDATE_LINHVUC):
    case REQUEST(ACTION_TYPES.DELETE_LINHVUC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LINHVUC_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LINHVUC):
    case FAILURE(ACTION_TYPES.CREATE_LINHVUC):
    case FAILURE(ACTION_TYPES.UPDATE_LINHVUC):
    case FAILURE(ACTION_TYPES.DELETE_LINHVUC):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LINHVUC_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_LINHVUC):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LINHVUC):
    case SUCCESS(ACTION_TYPES.UPDATE_LINHVUC):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LINHVUC):
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

const apiUrl = 'api/linhvucs';

// Actions

export const getEntities: getLinhVuc<ILinhvuc> = (page, size, sort, filterMa, filterTen) => {
  const requestUrl = `${apiUrl}${
    sort ? `?sudung.notEquals=0&page=${page}&size=${size}&sort=${sort}&malv.contains=${filterMa}&tenlv.contains=${filterTen}` : ''
  }`;
  return {
    type: ACTION_TYPES.FETCH_LINHVUC_LIST,
    payload: axios.get<ILinhvuc>(
      `${requestUrl}${sort ? '&' : '?sudung.notEquals=0&page=0&size=10&sort=tenlv,asc&'}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const getEntity: ICrudGetAction<ILinhvuc> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LINHVUC,
    payload: axios.get<ILinhvuc>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILinhvuc> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LINHVUC,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILinhvuc> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LINHVUC,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILinhvuc> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LINHVUC,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
