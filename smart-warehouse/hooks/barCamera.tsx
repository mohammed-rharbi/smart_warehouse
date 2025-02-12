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
            // Prevent multiple scans
            if (scanned) return;
            setScanned(true);

            const product = await getProductByBarcode(data);
            
            if (product) {
                // Existing product found - navigate to details
                router.push(`/ProductDetails?id=${product.id}`);
            } else {
                // New product - navigate to create page with scanned barcode
                router.push(`/createProduct?Bcode=${data}`);
            }
            
            // Optional: Reset scanning after timeout if you stay on same page
            // setTimeout(() => setScanned(false), 2000);

        } catch (err) {
            console.log(err);
            // Reset scan on error
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