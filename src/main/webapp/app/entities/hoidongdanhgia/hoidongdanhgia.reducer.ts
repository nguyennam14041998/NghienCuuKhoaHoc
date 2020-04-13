import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IHoidongdanhgia, defaultValue } from 'app/shared/model/hoidongdanhgia.model';
import { AxiosPromise } from 'axios';
export interface IPayload<T> {
  type: string;
  payload: AxiosPromise<T>;
  meta?: any;
}
export declare type getHoiDong<T> = (
  page?: number,
  size?: number,
  sort?: string,
  filterTen?: string,
  filterMa?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export const ACTION_TYPES = {
  FETCH_HOIDONGDANHGIA_LIST: 'hoidongdanhgia/FETCH_HOIDONGDANHGIA_LIST',
  FETCH_HOIDONGDANHGIA: 'hoidongdanhgia/FETCH_HOIDONGDANHGIA',
  CREATE_HOIDONGDANHGIA: 'hoidongdanhgia/CREATE_HOIDONGDANHGIA',
  UPDATE_HOIDONGDANHGIA: 'hoidongdanhgia/UPDATE_HOIDONGDANHGIA',
  DELETE_HOIDONGDANHGIA: 'hoidongdanhgia/DELETE_HOIDONGDANHGIA',
  RESET: 'hoidongdanhgia/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHoidongdanhgia>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type HoidongdanhgiaState = Readonly<typeof initialState>;

// Reducer

export default (state: HoidongdanhgiaState = initialState, action): HoidongdanhgiaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_HOIDONGDANHGIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HOIDONGDANHGIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_HOIDONGDANHGIA):
    case REQUEST(ACTION_TYPES.UPDATE_HOIDONGDANHGIA):
    case REQUEST(ACTION_TYPES.DELETE_HOIDONGDANHGIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_HOIDONGDANHGIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HOIDONGDANHGIA):
    case FAILURE(ACTION_TYPES.CREATE_HOIDONGDANHGIA):
    case FAILURE(ACTION_TYPES.UPDATE_HOIDONGDANHGIA):
    case FAILURE(ACTION_TYPES.DELETE_HOIDONGDANHGIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOIDONGDANHGIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOIDONGDANHGIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_HOIDONGDANHGIA):
    case SUCCESS(ACTION_TYPES.UPDATE_HOIDONGDANHGIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_HOIDONGDANHGIA):
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

const apiUrl = 'api/hoidongdanhgias';

// Actions

export const getEntities: getHoiDong<IHoidongdanhgia> = (page, size, sort, filterMa, filterTen) => {
  const requestUrl = `${apiUrl}${
    sort ? `?sudung.notEquals=0&page=${page}&size=${size}&sort=${sort}&mahoidong.contains=${filterMa}&tenhoidong.contains=${filterTen}` : ''
  }`;
  return {
    type: ACTION_TYPES.FETCH_HOIDONGDANHGIA_LIST,
    payload: axios.get<IHoidongdanhgia>(
      `${requestUrl}${sort ? '&' : '?sudung.notEquals=0&page=0&size=10&sort=tenhoidong,asc&'}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const getEntity: ICrudGetAction<IHoidongdanhgia> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HOIDONGDANHGIA,
    payload: axios.get<IHoidongdanhgia>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IHoidongdanhgia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HOIDONGDANHGIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHoidongdanhgia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HOIDONGDANHGIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHoidongdanhgia> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HOIDONGDANHGIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
