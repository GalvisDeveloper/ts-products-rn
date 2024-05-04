import { launchCamera, launchImageLibrary } from "react-native-image-picker";


export class CameraAdapter {
    static async takePicture(): Promise<string[]> {
        const response = await launchCamera({
            mediaType: 'photo',
            quality: 1,
            cameraType: 'back',
            includeBase64: false,
        });

        if (response && response.assets && response.assets[0].uri) {
            return [response.assets[0].uri];
        }
        return []
    }

    static async pickImage(): Promise<string[]> {
        const response = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
            includeBase64: false,
            selectionLimit: 10,
        });

        if (response && response.assets && response.assets.length > 0) {
            return response.assets.map((asset) => asset.uri!);
        }
        return []
    }

    // static async pickVideo(): Promise<string> {

    // }

    // static async pickFile(): Promise<string> {

    // }

    // static async pickMultipleFiles(): Promise<string[]> {

    // }

    // static async pickMultipleImages(): Promise<string[]> {

    // }

    // static async pickMultipleVideos(): Promise<string[]> {

    // }

    // static async pickMultipleMedias(): Promise<string[]> {

    // }


}