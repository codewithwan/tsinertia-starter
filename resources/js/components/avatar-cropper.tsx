import { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';

interface AvatarCropperProps {
    imageSrc: string;
    open: boolean;
    onClose: () => void;
    onCropComplete: (croppedImageFile: File) => void;
}

export function AvatarCropper({ imageSrc, open, onClose, onCropComplete }: AvatarCropperProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [processing, setProcessing] = useState(false);

    const onCropChange = useCallback((crop: { x: number; y: number }) => {
        setCrop(crop);
    }, []);

    const onZoomChange = useCallback((zoom: number) => {
        setZoom(zoom);
    }, []);

    const onCropCompleteCallback = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous');
            image.src = url;
        });

    const getCroppedImg = async (
        imageSrc: string,
        pixelCrop: Area
    ): Promise<File> => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('No 2d context');
        }

        const outputSize = 512;
        canvas.width = outputSize;
        canvas.height = outputSize;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            outputSize,
            outputSize
        );

        return new Promise<File>((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
                const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
                resolve(file);
            }, 'image/jpeg', 0.95);
        });
    };

    const handleCrop = async () => {
        if (!croppedAreaPixels) {
            return;
        }

        setProcessing(true);
        try {
            const croppedImageFile = await getCroppedImg(imageSrc, croppedAreaPixels);
            onCropComplete(croppedImageFile);
            onClose();
        } catch (error) {
            console.error('Error cropping image:', error);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Crop Profile Photo</DialogTitle>
                    <DialogDescription>
                        Adjust the position and zoom of your profile photo. Drag to move, use slider to zoom.
                    </DialogDescription>
                </DialogHeader>
                <div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={onCropCompleteCallback}
                        cropShape="round"
                        showGrid={false}
                        style={{
                            containerStyle: {
                                width: '100%',
                                height: '100%',
                                position: 'relative',
                            },
                        }}
                    />
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Zoom</label>
                        <Slider
                            value={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            onValueChange={(value) => setZoom(value[0])}
                            className="w-full"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={processing}>
                        Cancel
                    </Button>
                    <Button onClick={handleCrop} disabled={processing || !croppedAreaPixels}>
                        {processing ? 'Processing...' : 'Crop & Save'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

