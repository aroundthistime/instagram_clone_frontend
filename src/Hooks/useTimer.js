import { useEffect, useRef} from "react"

const formatTime = (seconds) => {
    if (seconds < 0){
        return "0:00";
    }
    let hours;
    let minutes = 0;
    if (seconds >= 3600){
        hours = parseInt(seconds / 3600);
        seconds %= 3600;
    }
    if (seconds >= 60){
        minutes = parseInt(seconds / 60);
        seconds %= 60;
    }
    if (hours){
        if (minutes < 10){
            minutes = `0${minutes}`;
        }
        if (seconds < 10){
            seconds = `0${seconds}`
        }
        return `${hours}:${minutes}:${seconds}`
    } else{
        if (seconds < 10){
            return `${minutes}:0${seconds}`
        } else{
            return `${minutes}:${seconds}`
        }
    } 
}

const unformatTime = (timeStr) => {
    let time = 0;
    const timeTokens = timeStr.split(":");
    timeTokens.forEach((timeToken, index) => {
        const timeUnit = timeTokens.length - index 
        if (timeUnit === 3){//hours
            time += parseInt(timeToken) * 60 * 60
        } else if(timeUnit === 2){//minutes
            time += parseInt(timeToken) * 60
        } else{
            time += parseInt(timeToken)
        }
    })
    return time;
}

export default (defaultValue) => {
    const element = useRef();
    const resetTime = (event) => {
        if (element.current){
            element.current.innerText = formatTime(defaultValue);
        }
    }
    useEffect(() => {
        let timeInterval;
        if (element.current){
            element.current.innerText = formatTime(defaultValue);
            timeInterval = setInterval(() => {
                const currentTime = unformatTime(element.current.innerText);
                if (currentTime <= 1){
                    clearInterval(timeInterval);
                }
                element.current.innerText = formatTime(currentTime - 1);
            }, 1000);
        }
        return () => {
            if (timeInterval){
                clearInterval(timeInterval)
            }
        }
    }, [element.current])
    return {element, resetTime};
}