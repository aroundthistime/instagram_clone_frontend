export const formatDate = (time) => {
    const from = new Date(time);
    const current = new Date();
    let dateDiff = Math.ceil((current.getTime() - from.getTime()) / 1000); //sec
    if (dateDiff < 60){
        return `${dateDiff}s`
    }
    dateDiff = Math.ceil(dateDiff / 60);//min
    if (dateDiff < 60){
        return `${dateDiff}m`
    }
    dateDiff = Math.ceil(dateDiff / 60);//hours
    if (dateDiff < 24){
        return `${dateDiff}h`
    }
    dateDiff = Math.ceil(dateDiff / 24);//days
    if (dateDiff < 7){
        return `${dateDiff}d`;
    }
    dateDiff = Math.ceil(dateDiff / 7);//weeks
    if (dateDiff < 4){
        return `${dateDiff}w`;
    }
    dateDiff = Math.ceil(dateDiff / 4); //months
    if (dateDiff < 12){
        return `${dateDiff} months`;
    }
    return time.substring(0, 10);
}