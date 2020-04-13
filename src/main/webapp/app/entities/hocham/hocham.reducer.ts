import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IHocham, defaultValue } from 'app/shared/model/hocham.model';
import { AxiosPromise } from 'axios';
export interface IPayload<T> {
  type: string;
  payload: AxiosPromise<T>;
  meta?: any;
}
export declare type getHocHam<T> = (
  page?: number,
  size?: number,
  sort?: string,
  filterTen?: string,
  filterMa?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export const ACTION_TYPES = {
  FETCH_HOCHAM_LIST: 'hocham/FETCH_HOCHAM_LIST',
  FETCH_HOCHAM: 'hocham/FETCH_HOCHAM',
  CREATE_HOCHAM: 'hocham/CREATE_HOCHAM',
  UPDATE_HOCHAM: 'hocham/UPDATE_HOCHAM',
  DELETE_HOCHAM: 'hocham/DELETE_HOCHAM',
  RESET: 'hocham/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHocham>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type HochamState = Readonly<typeof initialState>;

// Reducer

export default (state: HochamState = initialState, action): HochamState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_HOCHAM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HOCHAM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_HOCHAM):
    case REQUEST(ACTION_TYPES.UPDATE_HOCHAM):
    case REQUEST(ACTION_TYPES.DELETE_HOCHAM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_HOCHAM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HOCHAM):
    case FAILURE(ACTION_TYPES.CREATE_HOCHAM):
    case FAILURE(ACTION_TYPES.UPDATE_HOCHAM):
    case FAILURE(ACTION_TYPES.DELETE_HOCHAM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOCHAM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOCHAM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_HOCHAM):
    case SUCCESS(ACTION_TYPES.UPDATE_HOCHAM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_HOCHAM):
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

const apiUrl = 'api/hochams';

// Actions

export const getEntities: getHocHam<IHocham> = (page, size, sort, filterMa, filterTen) => {
  const requestUrl = `${apiUrl}${
    sort ? `?sudung.notEquals=0&page=${page}&size=${size}&sort=${sort}&mahocham.contains=${filterMa}&tenhocham.contains=${filterTen}` : ''
  }`;
  return {
    type: ACTION_TYPES.FETCH_HOCHAM_LIST,
    payload: axios.get<IHocham>(
      `${requestUrl}${sort ? '&' : '?sudung.notEquals=0&page=0&size=10&&sort=tenhocham,asc&'}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const getEntity: ICrudGetAction<IHocham> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HOCHAM,
    payload: axios.get<IHocham>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IHocham> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HOCHAM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHocham> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HOCHAM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHocham> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HOCHAM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
