import { CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { getProductByBarcode } from "@/services/products";
import { router } from "expo-router";

export default function useScanner() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [scannedCode, setScannedCode] = useState<string | null>(null);

    const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
        try {

            if (scanned) return;
            setScanned(true);

            const product = await getProductByBarcode(data);
            
            if (product) {

                router.push(`/ProductDetails?id=${product.id}`);
            } else {

                router.push(`/createProduct?Bcode=${data}`);
            }
            

        } catch (err) {
            console.log(err);

            setScanned(false);
        }
    };

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return {
        facing,
        permission,
        scanned,
        scannedCode,
        requestPermission,
        handleBarCodeScanned,
        toggleCameraFacing,
        setScanned,
    };
}