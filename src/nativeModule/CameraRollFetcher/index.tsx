import { NativeModules } from "react-native";
var cameraRollFetcher = NativeModules.CameraRollFetcher;

const getImagePath = (uri: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await cameraRollFetcher.saveToDocumentsFolder(uri);
            resolve(result)
        } catch (error) {
            reject(error)
        }

    })
}
export { getImagePath }