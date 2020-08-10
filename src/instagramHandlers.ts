import {IpcMainInvokeEvent} from "electron";
import {client} from "./index";

export interface SearchByLocationArgs {
    query: string;
}

export const searchByLocationHandler = async (event: IpcMainInvokeEvent, args: SearchByLocationArgs) => {
    await client.login()
    return await client.searchLocation(args.query)
}

export interface UploadAlbumArgs {
    caption: string;
    filesPath: string[];
}

export const uploadAlbumHandler = async (event: IpcMainInvokeEvent, args: UploadAlbumArgs) => {
    await client.login()
    return await client.uploadAlbum(args.caption, args.filesPath)
}
