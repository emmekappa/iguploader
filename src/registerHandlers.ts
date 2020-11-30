import {
  loginHandler,
  searchByLocationHandler,
  uploadAlbumHandler,
  validatePhoto,
} from "./instagramHandlers";

export function registerHandlers(ipcMain: Electron.IpcMain): void {
  ipcMain.handle("search-by-location", searchByLocationHandler);
  ipcMain.handle("upload-album", uploadAlbumHandler);
  ipcMain.handle("login", loginHandler);
  ipcMain.handle("validate-photo", validatePhoto);
}

export default registerHandlers;
