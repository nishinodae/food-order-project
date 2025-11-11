const compressImage = async (file, maxWidth = 500, maxHeight = 500, quality = 0.8) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
        reader.onerror = reject;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            //maintain aspect ratio
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round(height * (maxWidth / width));
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round(width * (maxHeight / height));
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            // Fill the background with white before drawing
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                async (blob) => {
                    if (!blob) return reject;
                    if (blob.size > 10 * 1024 * 1024 && quality > 0.4) {
                        const smaller = compressImage(file, maxWidth, maxHeight, quality - 0.1);
                        return resolve(smaller);
                    }
                    const newfile = new File(
                        [blob],
                        `${file.name.replace(/\.[^/.]+$/, '')}-compressed.webp`,
                        { type: 'image/webp', lastModified: Date.now() }
                    );
                    resolve(newfile);
                },
                'image/webp', quality
            );
        };
        img.onerror = reject;
    });
};

export default compressImage;