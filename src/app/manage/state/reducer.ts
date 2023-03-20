
import { createReducer, on } from "@ngrx/store";
import { ServerList, ServerListState } from "../type";
import * as ManageServerActions from 'src/app/manage/state/action'

export const initialState: ServerListState = {
    serverList: []
};

export const manageServerReducer = createReducer(
    initialState,
    on(ManageServerActions.serverListAction, (state, props) => ({ ...state, serverList: props.serverList })),
    on(ManageServerActions.createServerAction, (state, props) => ({ ...state, serverList: [...state.serverList, props.serverList] })),
  );