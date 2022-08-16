export const generateBackgroundImageStyle = (imgRatio, boxWidth, boxHeight, boxRatio, imageBrightness) => {
    if(require('@/../user-prefs.json')['playfieldEditor']['useStaticAspectRatioForBGImage']) {
        const virtualBoxRatio = require('@/../user-prefs.json')['playfieldEditor']['aspectRatio'];
        const virtualBoxHeight = boxHeight;
        const virtualBoxWidth = virtualBoxHeight*virtualBoxRatio;
        if(virtualBoxRatio > imgRatio) {
            return {
                position: 'absolute', 
                top: `${boxHeight/2 - virtualBoxWidth/imgRatio/2}px`, 
                left: `${(boxWidth - virtualBoxWidth)/2}px`,
                width: `${virtualBoxWidth}px`, 
                height: `${virtualBoxWidth/imgRatio}px`, 
                filter: `brightness(${imageBrightness})`, 
            };
        }
        else {
            return {
                position: 'absolute',
                left: `${boxWidth/2 - virtualBoxHeight*imgRatio/2}px`, 
                width: `${virtualBoxHeight*imgRatio}px`, 
                height: `${virtualBoxHeight}px`,
                filter: `brightness(${imageBrightness})`,
            };
        }
    }
    else {
        if(boxRatio > imgRatio) {
            return {
                position: 'absolute', 
                top: `${boxHeight/2 - boxWidth/imgRatio/2}px`, 
                width: `${boxWidth}px`, 
                height: `${boxWidth/imgRatio}px`, 
                filter: `brightness(${imageBrightness})`, 
            };
        }
        else {
            return {
                position: 'absolute',
                left: `${boxWidth/2 - boxHeight*imgRatio/2}px`, 
                width: `${boxHeight*imgRatio}px`, 
                height: `${boxHeight}px`,
                filter: `brightness(${imageBrightness})`,
            };
        }
    }
}