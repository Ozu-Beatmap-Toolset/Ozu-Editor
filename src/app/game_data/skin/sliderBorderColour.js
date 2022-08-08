import { skin } from './skinData.js'

export const getSliderBorderColour = () => {
    const strArr = skin.ini['Colours']['SliderBorder'].split(',');
    return '#' + 
        parseInt(strArr[0]).toString('16') + 
        parseInt(strArr[1]).toString('16') + 
        parseInt(strArr[2]).toString('16');
}