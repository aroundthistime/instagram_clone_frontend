import { useEffect, useRef, useState } from "react";

export const useSlide = (lastIndex) => {
    const [currentItem, setCurrentItem] = useState(0);
    const left = useRef();
    const right = useRef();
    const slideLeft = (event) => {
        event.preventDefault();
        if (currentItem === 1){
            setCurrentItem(0);
            right.current.classList.remove("disabled");
            left.current.classList.add("disabled");
        } else if (currentItem > 1){
            setCurrentItem(currentItem-1);
            right.current.classList.remove("disabled");
            left.current.classList.remove("disabled");
        }
    }
    const slideRight = (event) => {
        event.preventDefault();
        if (currentItem === lastIndex - 1){
            setCurrentItem(lastIndex);
            left.current.classList.remove("disabled");
            right.current.classList.add("disabled");
        } else if (currentItem < lastIndex - 1){
            setCurrentItem(currentItem+1);
            left.current.classList.remove("disabled");
            right.current.classList.remove("disabled");
        }
    }
    useEffect(() => {
        if (left.current){
            left.current.addEventListener("click", slideLeft)
        }
        if (right.current){
            right.current.addEventListener("click", slideRight)
        }
        return () => {
            if (left.current){
                left.current.removeEventListener("click", slideLeft)
            }
            if (right.current){
                right.current.removeEventListener("click", slideRight)
            }
        }
    }, [currentItem]);
    return {currentItem, left, right}
}