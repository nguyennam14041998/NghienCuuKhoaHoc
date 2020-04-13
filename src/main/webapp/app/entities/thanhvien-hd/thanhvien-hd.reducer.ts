import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IThanhvienHD, defaultValue } from 'app/shared/model/thanhvien-hd.model';
import { AxiosPromise } from 'axios';
export interface IPayload<T> {
  type: string;
  payload: AxiosPromise<T>;
  meta?: any;
}
export declare type getThanhVien<T> = (
  page?: number,
  size?: number,
  sort?: string,
  filterTen?: string,
  filterDonvi?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type getThanhVienHD<T> = (sapxep?: string, filterHoidong?: string) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export const ACTION_TYPES = {
  FETCH_THANHVIENHD_LIST: 'thanhvienHD/FETCH_THANHVIENHD_LIST',
  FETCH_THANHVIENHD: 'thanhvienHD/FETCH_THANHVIENHD',
  CREATE_THANHVIENHD: 'thanhvienHD/CREATE_THANHVIENHD',
  UPDATE_THANHVIENHD: 'thanhvienHD/UPDATE_THANHVIENHD',
  DELETE_THANHVIENHD: 'thanhvienHD/DELETE_THANHVIENHD',
  RESET: 'thanhvienHD/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IThanhvienHD>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ThanhvienHDState = Readonly<typeof initialState>;

// Reducer

export default (state: ThanhvienHDState = initialState, action): ThanhvienHDState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_THANHVIENHD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_THANHVIENHD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_THANHVIENHD):
    case REQUEST(ACTION_TYPES.UPDATE_THANHVIENHD):
    case REQUEST(ACTION_TYPES.DELETE_THANHVIENHD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_THANHVIENHD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_THANHVIENHD):
    case FAILURE(ACTION_TYPES.CREATE_THANHVIENHD):
    case FAILURE(ACTION_TYPES.UPDATE_THANHVIENHD):
    case FAILURE(ACTION_TYPES.DELETE_THANHVIENHD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_THANHVIENHD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_THANHVIENHD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_THANHVIENHD):
    case SUCCESS(ACTION_TYPES.UPDATE_THANHVIENHD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_THANHVIENHD):
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

const apiUrl = 'api/thanhvien-hds';

// Actions

export const getEntities: getThanhVien<IThanhvienHD> = (page, size, sort, filterTen, filterDonvi) => {
  const requestUrl = `${apiUrl}${
    sort ? `?sudung.notEquals=0&page=${page}&size=${size}&sort=${sort}&ten.contains=${filterTen}&donvi.contains=${filterDonvi}` : ''
  }`;
  return {
    type: ACTION_TYPES.FETCH_THANHVIENHD_LIST,
    payload: axios.get<IThanhvienHD>(
      `${requestUrl}${sort ? '&' : '?sudung.notEquals=0&page=0&size=10&sort=ten,asc&'}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getThanhVienHoiDong: getThanhVienHD<IThanhvienHD> = (sapxep, filterHoidong) => {
  const requestUrl = `${apiUrl}${sapxep ? `?sudung.notEquals=0&sort=${sapxep}&hoidongdanhgiaId.equals=${filterHoidong}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_THANHVIENHD_LIST,
    payload: axios.get<IThanhvienHD>(
      `${requestUrl}${sapxep ? '&' : '?sudung.notEquals=0&sort=trachnhiem,asc&'}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IThanhvienHD> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_THANHVIENHD,
    payload: axios.get<IThanhvienHD>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IThanhvienHD> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_THANHVIENHD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};
export const addTV: ICrudPutAction<IThanhvienHD> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_THANHVIENHD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });

  return result;
};
export const updateEntity: ICrudPutAction<IThanhvienHD> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_THANHVIENHD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};
export const xoaTV: ICrudPutAction<IThanhvienHD> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_THANHVIENHD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });

  return result;
};

export const deleteEntity: ICrudDeleteAction<IThanhvienHD> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_THANHVIENHD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
