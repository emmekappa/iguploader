import { IpcMainInvokeEvent } from "electron";
import { CredentialsStore, InstagramClient } from "./instagram";
import { IgLocation } from "./IgLocation";
import { PhotoValidator } from "./photo/photoValidator";
import { ValidationResult } from "./photo/photoValidatorHandlers";

export interface SearchByLocationArgs {
  query: string;
}

function createClient(): InstagramClient {
  const credentials = new CredentialsStore().get();
  if (!credentials) {
    console.error("Credentials not defined");
    throw new Error("Credentials not defined");
  }
  return new InstagramClient(credentials);
}

export async function searchByLocationHandler(
  event: IpcMainInvokeEvent,
  args: SearchByLocationArgs
): Promise<IgLocation[]> {
  const client = createClient();
  await client.login();
  return client.searchLocation(args.query);
}

export interface UploadAlbumArgs {
  caption: string;
  filesPath: string[];
}

export async function uploadAlbumHandler(
  event: IpcMainInvokeEvent,
  args: UploadAlbumArgs
): Promise<void> {
  const client = createClient();
  await client.login();
  if (args.filesPath.length <= 1)
    return client.uploadPhoto(args.caption, args.filesPath[0]);
  return client.uploadAlbum(args.caption, args.filesPath);
}

export async function loginHandler(
  event: IpcMainInvokeEvent,
  args: any | undefined
): Promise<boolean> {
  const client = createClient();
  try {
    await client.login(true);
    return true;
  } catch (error) {
    console.error(`Unable to login: ${error.message}`);
    return false;
  }
}

export interface ValidatePhotoArgs {
  filePath: string;
}

export async function validatePhoto(
  event: IpcMainInvokeEvent,
  args: ValidatePhotoArgs
): Promise<ValidationResult> {
  const photoValidator = new PhotoValidator();
  const validationResult = await photoValidator.isValid(args.filePath);
  return validationResult;
}
