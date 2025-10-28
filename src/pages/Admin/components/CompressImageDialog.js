import { Button, CircularProgress, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useFoodContext } from "../../../context/FoodMngrContext";

const CompressImageDialog = ({ onClose }) => {
    const { currentImage, setCurrentImage } = useFoodContext();
    const [loading, setLoading] = useState(false);

    const compress = async (file, maxWidth = 643, maxHeight = 360, quality = 0.7) => {
        // setLoading(true);
        // const img = new Image();
        // const reader = new FileReader();

        // reader.onload = (e) => {
        //     img.src = e.target.result
        // };

        // reader.readAsDataURL(file);

        // img.onload = () => {
        //     // img.src = URL.createObjectURL(file);
        //     const canvas = document.createElement('canvas');
        //     const ctx = canvas.getContext('2d');

        //     const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
        //     canvas.width = img.width * ratio;
        //     canvas.height = img.height * ratio;

        //     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        //     canvas.toBlob((blob) => {
        //         let newfile = new File([blob], `${file.name}-compressed.jpg`, {
        //             type: "image/jpeg",
        //             lastModified: new Date().getTime()
        //         });
        //         setCurrentImage(newfile);
        //     },
        //         'image/jpeg', quality
        //     )

        // }
        // setLoading(false);

        setLoading(true);
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target.result
        };

        reader.readAsDataURL(file);
        // img.src = URL.createObjectURL(file);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
            // canvas.width = img.width * ratio;
            // canvas.height = img.height * ratio;

            canvas.width = img.width;
            canvas.height = img.height;

            // Fill the background with white before drawing the PNG
            ctx.fillStyle = '#FFFFFF'; // White background
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                // const index = file.name.indexOf('.');
                // let fileName;
                // if (index !== -1) {
                //     fileName = file.name.slice(0, index);
                // } else {
                //     fileName = file.name;
                // }

                let newfile = new File([blob], `${file.name.replace(/\.[^/.]+$/, "")}-compressed.jpg`, {
                    type: "image/jpeg",
                    lastModified: new Date().getTime()
                });

                if (newfile.size > 10 * 1024 * 1024) {
                    compress(newfile);
                } else {
                    setCurrentImage(newfile);
                }
            },
                'image/jpeg', quality
            )

        }

        setLoading(false);
    }

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle variant="body1" sx={{ pl: '16px' }}>File size exceeds 10MB. Compress image file?</DialogTitle>
            <DialogActions>
                <Button onClick={async () => {
                    await compress(currentImage);
                    onClose();
                }}>yes{loading && <CircularProgress />}</Button>
                <Button onClick={onClose}>no</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CompressImageDialog;