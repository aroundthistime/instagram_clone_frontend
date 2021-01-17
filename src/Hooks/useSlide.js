import { useEffect, useRef, useState } from "react";

const RIGHT = "right";
const LEFT = "left";

export const useSlide = (lastIndex) => {
    const [slideObj, setSlideObj] = useState({
        currentItem : 0,
        direction : null
    });
    const left = useRef();
    const right = useRef();
    const slideLeft = (event) => {
        event.preventDefault();
        const {currentItem} = slideObj;
        if (currentItem === 1){
            setSlideObj({
                currentItem : 0,
                direction : LEFT
            })
            right.current.classList.remove("disabled");
            left.current.classList.add("disabled");
        } else if (currentItem > 1){
            setSlideObj({
                currentItem : currentItem - 1,
                direction : LEFT
            })
            right.current.classList.remove("disabled");
            left.current.classList.remove("disabled");
        }
    }
    const slideRight = (event) => {
        event.preventDefault();
        const {currentItem} = slideObj;
        if (currentItem === lastIndex - 1){
            setSlideObj({
                currentItem : lastIndex,
                direction : RIGHT
            })
            left.current.classList.remove("disabled");
            right.current.classList.add("disabled");
        } else if (currentItem < lastIndex - 1){
            setSlideObj({
                currentItem : currentItem + 1,
                direction : RIGHT
            })
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
    }, [slideObj]);
    return {slideObj, left, right}
}