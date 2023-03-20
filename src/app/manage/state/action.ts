import { createAction, props } from '@ngrx/store';
import { ServerList, ServerListResponse } from '../type';

export const serverListAction = createAction(
  '[Manage Server] ServerList',
  props<{ serverList: ServerList[] }>()
);

export const createServerAction = createAction(
  '[Manage Server] CreateServer',
  props<{ serverList: ServerList }>()
);