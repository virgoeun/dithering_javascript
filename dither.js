window.onload = function() {
    const imgElement = document.getElementById('sourceImage');
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');

    imgElement.onload = function() {
         const scaleFactor = 500/imgElement.height;
    const scaledHeight =scaleFactor *imgElement.height;
    
    canvas.width = 500;
    canvas.height = scaledHeight;

        ctx.drawImage(imgElement, 0, 0, 500, scaledHeight)
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        function applyError(i, err, factor) {
            data[i] += err[0] * factor;
            data[i+1] += err[1] * factor;
            data[i+2] += err[2] * factor;
            for (let j = i; j < i + 3; j++) {
                if (data[j] < 0) data[j] = 0;
                if (data[j] > 255) data[j] = 255;
            }
        }

        for (let i = 0; i < data.length; i += 4) {
            let gray = (data[i] + data[i+1] + data[i+2]) / 3;
            let newColor = gray < 128 ? 0 : 255;
            let err = [data[i] - newColor, data[i+1] - newColor, data[i+2] - newColor];

            data[i] = data[i+1] = data[i+2] = newColor;

            if ((i / 4) % canvas.width !== canvas.width - 1) {
                applyError(i + 4, err, 7 / 16);
            }
            if (i / 4 < canvas.width * (canvas.height - 1)) {
                applyError(i + canvas.width * 4, err, 5 / 16);
                if ((i / 4) % canvas.width !== 0) {
                    applyError(i + (canvas.width - 1) * 4, err, 3 / 16);
                }
                if ((i / 4) % canvas.width !== canvas.width - 1) {
                    applyError(i + (canvas.width + 1) * 4, err, 1 / 16);
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);
    };

    // This line actually triggers the image loading process, which in turn triggers the onload function above.
imgElement.src = './Public/Images/flower.jpg';
};
