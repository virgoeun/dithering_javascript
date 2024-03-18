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

        const COLORS = [[0, 0, 0], [255, 255, 255]]; // Black and White

        for (let i = 0; i < data.length; i += 4) {
            let target = [data[i], data[i+1], data[i+2]]; // RGB of current pixel
            console.log("target:", target)
            let diffList = COLORS.map(col => {
                return Math.sqrt((col[0] - target[0]) ** 2 + (col[1] - target[1]) ** 2 + (col[2] - target[2]) ** 2);
            });
            console.log("diffList:", diffList)

            let minDiffIndex = diffList[0] < diffList[1] ? 0 : 1;

            data[i] = COLORS[minDiffIndex][0];     // Red
            data[i + 1] = COLORS[minDiffIndex][1]; // Green
            data[i + 2] = COLORS[minDiffIndex][2]; // Blue
        }

        ctx.putImageData(imageData, 0, 0);
    };

    // This line actually triggers the image loading process, which in turn triggers the onload function above.
imgElement.src = './Public/Images/flower.jpg';
};
