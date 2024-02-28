const convertToMilliseconds = (time: string) => {
    const unit = time.charAt(time.length - 1);
    const value = parseInt(time.slice(0, -1), 10);

    switch (unit) {
        case 's':
            return value * 1000;
        case 'm':
            return value * 60 * 1000;
        case 'h':
            return value * 60 * 60 * 1000;
        case 'd':
            return value * 24 * 60 * 60 * 1000;
        case 'M':
            return value * 30 * 24 * 60 * 60 * 1000; 
        default:
            throw new Error(`No se reconoce valor: ${unit}`);
    }

}
const totalRequestTime= (time:number)=>{
    let minutes = Math.floor(time / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let mms = time % 1000;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${mms.toString().padStart(3, '0')}`;

}
export {convertToMilliseconds,totalRequestTime}
