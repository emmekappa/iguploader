import {IpcMainInvokeEvent} from "electron";
import {CredentialsStore, InstagramClient} from "./instagram";
import {IgLocation} from "./IgLocation";

export interface SearchByLocationArgs {
    query: string;
}

function createClient(): InstagramClient {
    const credentials = new CredentialsStore().get();
    if (credentials == undefined) {
        console.error("Credentials not defined")
        throw new Error("Credentials not defined")
    }
    return new InstagramClient(credentials)
}

export async function searchByLocationHandler(event: IpcMainInvokeEvent, args: SearchByLocationArgs): Promise<IgLocation[]> {
    const client = createClient()
    await client.login()
    return await client.searchLocation(args.query)
}

export interface UploadAlbumArgs {
    caption: string;
    filesPath: string[];
}

export async function uploadAlbumHandler(event: IpcMainInvokeEvent, args: UploadAlbumArgs): Promise<void> {
    const client = createClient()
    await client.login()
    return await client.uploadAlbum(args.caption, args.filesPath)
}

export async function loginHandler(event: IpcMainInvokeEvent, args: {}): Promise<boolean> {
    const client = createClient()
    try {
        await client.login(true)
        return true
    } catch (error) {
        console.error(`Unable to login: ${error.message}`)
        return false
    }
}
