import {IpcMainInvokeEvent} from "electron";
import {InstagramClient} from "./instagram";

const Store = require('electron-store');

export interface SearchByLocationArgs {
    query: string;
}

function createClient() {
    const store = new Store()
    return new InstagramClient(store.get("ig.username"), store.get("ig.password"))
}

export const searchByLocationHandler = async (event: IpcMainInvokeEvent, args: SearchByLocationArgs) => {
    let client = createClient()
    await client.login()
    return await client.searchLocation(args.query)
}

export interface UploadAlbumArgs {
    caption: string;
    filesPath: string[];
}

export const uploadAlbumHandler = async (event: IpcMainInvokeEvent, args: UploadAlbumArgs) => {
    let client = createClient()
    await client.login()
    return await client.uploadAlbum(args.caption, args.filesPath)
}
