
export interface ServerListResponse {
    data: ServerList[];
}

export interface ServerList {
    name: string;
    description: string;
    server_ip: string;
    nat_space_id: string;
    server_nat_ip: string;
    status: string;
}

export interface NatList {
    id: string;
    name: string;
}

export interface ServerListState {
    serverList: ServerList[];
}

export interface ManageServerAppState {
    manageServer: ServerListState
}

export type RemoveServer = ServerList | null;

export interface FormData {
    name: string;
    description: string;
    natSpace: string;
    ipAddress: string;
  }