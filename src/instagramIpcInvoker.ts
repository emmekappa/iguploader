import {ipcRenderer} from "electron";
import {IgLocation} from "./IgLocation";

export class InstagramIpcInvoker {
    public async albumUpload(caption: string, filesPath: string[]): Promise<void> {
        const result = await ipcRenderer.invoke('upload-album', {caption: caption, filesPath: filesPath});
        console.log(result)
        return result
    }

    public async searchByLocation(query: string): Promise<IgLocation[]> {
        const result = await ipcRenderer.invoke('search-by-location', {query: query});
        console.log(result)
        return result
    }

    public async login(): Promise<boolean> {
        const result = await ipcRenderer.invoke('login', {});
        console.log(result)
        return result
    }
}
