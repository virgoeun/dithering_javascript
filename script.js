window.onload = function (){
const imgElement = document.getElementById("sourceImage")
const canvas = document.getElementById("imageCanvas")
const ctx = canvas.getContext("2d");


imgElement.onload = function () {

    const scaleFactor = 500/imgElement.height;
    const scaledHeight =scaleFactor *imgElement.height;
    
    canvas.width = 500;
    canvas.height = scaledHeight;


    ctx.drawImage(imgElement, 0, 0, 500, scaledHeight)

let imageData = ctx.getImageData(0,0, canvas.width, canvas.height)
console.log("ImageData:", imageData);
let data = imageData.data;
console.log("data:", data);


for (let i=0; i<data.length; i +=4) {
    let maxVal = Math.max(data[i], data[i+1], data[i+2]);
data[i] = maxVal;
data[i+1] = maxVal;
data[i+2] = maxVal;
}

ctx.putImageData(imageData, 0, 0)

}

imgElement.src = './Public/Images/flower.jpg';

}