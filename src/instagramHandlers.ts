import {IpcMainInvokeEvent} from "electron";
import {InstagramClient} from "./instagram/instagramClient";
import {IgLocation} from "./IgLocation";
import {IgAuthenticationStore} from "./instagram/igAuthenticationStore";

export interface SearchByLocationArgs {
    query: string;
}

function createClient(): InstagramClient {
    const username: string = IgAuthenticationStore.get("username") ?? ""
    const password: string = IgAuthenticationStore.get("password") ?? ""
    return new InstagramClient(username, password)
}

export const searchByLocationHandler = async (event: IpcMainInvokeEvent, args: SearchByLocationArgs): Promise<IgLocation[]> => {
    const client = createClient()
    await client.login()
    return await client.searchLocation(args.query)
}

export interface UploadAlbumArgs {
    caption: string;
    filesPath: string[];
}

export const uploadAlbumHandler = async (event: IpcMainInvokeEvent, args: UploadAlbumArgs): Promise<void> => {
    const client = createClient()
    await client.login()
    return await client.uploadAlbum(args.caption, args.filesPath)
}
