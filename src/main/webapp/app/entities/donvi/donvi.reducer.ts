import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDonvi, defaultValue } from 'app/shared/model/donvi.model';
import { AxiosPromise } from 'axios';
export interface IPayload<T> {
  type: string;
  payload: AxiosPromise<T>;
  meta?: any;
}
export declare type getDonVi<T> = (
  page?: number,
  size?: number,
  sort?: string,
  filterTen?: string,
  filterMa?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export const ACTION_TYPES = {
  FETCH_DONVI_LIST: 'donvi/FETCH_DONVI_LIST',
  FETCH_DONVI: 'donvi/FETCH_DONVI',
  CREATE_DONVI: 'donvi/CREATE_DONVI',
  UPDATE_DONVI: 'donvi/UPDATE_DONVI',
  DELETE_DONVI: 'donvi/DELETE_DONVI',
  RESET: 'donvi/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDonvi>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DonviState = Readonly<typeof initialState>;

// Reducer

export default (state: DonviState = initialState, action): DonviState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DONVI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DONVI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DONVI):
    case REQUEST(ACTION_TYPES.UPDATE_DONVI):
    case REQUEST(ACTION_TYPES.DELETE_DONVI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DONVI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DONVI):
    case FAILURE(ACTION_TYPES.CREATE_DONVI):
    case FAILURE(ACTION_TYPES.UPDATE_DONVI):
    case FAILURE(ACTION_TYPES.DELETE_DONVI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DONVI_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DONVI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DONVI):
    case SUCCESS(ACTION_TYPES.UPDATE_DONVI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DONVI):
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

const apiUrl = 'api/donvis';

// Actions

export const getEntities: getDonVi<IDonvi> = (page, size, sort, filterTen, filterMa) => {
  const requestUrl = `${apiUrl}${
    sort ? `?sudung.notEquals=0&page=${page}&size=${size}&sort=${sort}&tendv.contains=${filterTen}&madv.contains=${filterMa}` : ''
  }`;
  return {
    type: ACTION_TYPES.FETCH_DONVI_LIST,
    payload: axios.get<IDonvi>(
      `${requestUrl}${sort ? '&' : '?sudung.notEquals=0&page=0&size=10&sort=tendv,asc&'}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const getEntity: ICrudGetAction<IDonvi> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DONVI,
    payload: axios.get<IDonvi>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDonvi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DONVI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDonvi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DONVI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDonvi> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DONVI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
