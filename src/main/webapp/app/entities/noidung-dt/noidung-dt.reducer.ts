import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INoidungDT, defaultValue } from 'app/shared/model/noidung-dt.model';

export const ACTION_TYPES = {
  FETCH_NOIDUNGDT_LIST: 'noidungDT/FETCH_NOIDUNGDT_LIST',
  FETCH_NOIDUNGDT: 'noidungDT/FETCH_NOIDUNGDT',
  CREATE_NOIDUNGDT: 'noidungDT/CREATE_NOIDUNGDT',
  UPDATE_NOIDUNGDT: 'noidungDT/UPDATE_NOIDUNGDT',
  DELETE_NOIDUNGDT: 'noidungDT/DELETE_NOIDUNGDT',
  RESET: 'noidungDT/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INoidungDT>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type NoidungDTState = Readonly<typeof initialState>;

// Reducer

export default (state: NoidungDTState = initialState, action): NoidungDTState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NOIDUNGDT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NOIDUNGDT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NOIDUNGDT):
    case REQUEST(ACTION_TYPES.UPDATE_NOIDUNGDT):
    case REQUEST(ACTION_TYPES.DELETE_NOIDUNGDT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NOIDUNGDT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NOIDUNGDT):
    case FAILURE(ACTION_TYPES.CREATE_NOIDUNGDT):
    case FAILURE(ACTION_TYPES.UPDATE_NOIDUNGDT):
    case FAILURE(ACTION_TYPES.DELETE_NOIDUNGDT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOIDUNGDT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOIDUNGDT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NOIDUNGDT):
    case SUCCESS(ACTION_TYPES.UPDATE_NOIDUNGDT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NOIDUNGDT):
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

const apiUrl = 'api/noidung-dts';

// Actions

export const getEntities: ICrudGetAllAction<INoidungDT> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?sudung.notEquals=0&page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_NOIDUNGDT_LIST,
    payload: axios.get<INoidungDT>(
      `${requestUrl}${sort ? '&' : '?sudung.notEquals=0&page=0&size=10&sort=tennoidung,asc&'}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const getEntity: ICrudGetAction<INoidungDT> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NOIDUNGDT,
    payload: axios.get<INoidungDT>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INoidungDT> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NOIDUNGDT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INoidungDT> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NOIDUNGDT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INoidungDT> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NOIDUNGDT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
