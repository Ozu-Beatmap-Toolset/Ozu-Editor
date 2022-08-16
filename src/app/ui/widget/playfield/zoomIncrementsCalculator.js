const ZOOM_FACTOR_ON_SCROLL = 1 + 1/20;

export const calculateNewZoomValue = (previous, scrollAmount) => {
    let newZoom;
    if(scrollAmount < 0) {
        newZoom = previous * ZOOM_FACTOR_ON_SCROLL;
    }
    else {
        newZoom = previous / ZOOM_FACTOR_ON_SCROLL;
    }
    if(newZoom > 1.9799315994393984) {
        newZoom = 1.9799315994393984;
    }
    if(newZoom < 0.5050679529955184) {
        newZoom = 0.5050679529955184;
    }
    if(Math.abs(newZoom-1) < 0.0001) {
        newZoom = 1;
    }
    return newZoom;
}