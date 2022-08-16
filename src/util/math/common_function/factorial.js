// https://stackoverflow.com/questions/3959211/what-is-the-fastest-factorial-function-in-javascript#:~:text=function%20sFact(num)%0A%7B%0A%20%20%20%20let%20rval%3D1%3B%0A%20%20%20%20for%20(let%20i%20%3D%202%3B%20i%20%3C%3D%20num%3B%20i%2B%2B)%0A%20%20%20%20%20%20%20%20rval%20%3D%20rval%20*%20i%3B%0A%20%20%20%20return%20rval%3B%0A%7D

// modified it so it uses a lookup table

const lut = []

function compute(num)
{
    if(typeof lut[num] === 'undefined') {
        let rval=1;
        for (let i = 2; i <= num; i++) {
            rval *= i;
        }
        lut[num] = rval;
    }
    return lut[num];
}

export default {
    compute
}