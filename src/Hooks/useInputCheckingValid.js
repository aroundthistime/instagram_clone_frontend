import {useState} from "react";

const VALID_ICON_CLASSNAME = "fa-check-circle";
const INVALID_ICON_CLASSNAME = "fa-times-circle";
const VALIDITY_LOADING_CLASSNAME = "fa-question-circle";

export default(defaultValue, checkValid) => {
    if (typeof checkValid !== "function"){
        checkValid = () => true;
    }
    const [value, setValue] = useState(defaultValue);
    const onChange = async(event) => {
        const {
            target : {value}
        } = event;
        setValue(value);
        if (!event.target.nextSibling){
            return
        }
        const inputValidIcon = event.target.nextSibling.querySelector("i");
        if (!inputValidIcon){
            return
        }
        setTimeout(async() => {
            if (value === event.target.value){
                inputValidIcon.classList.remove(VALID_ICON_CLASSNAME);
                inputValidIcon.classList.remove(INVALID_ICON_CLASSNAME);
                inputValidIcon.classList.add(VALIDITY_LOADING_CLASSNAME);
                if(event.target.value === ""){
                    inputValidIcon.classList.remove(VALID_ICON_CLASSNAME);
                    inputValidIcon.classList.remove(INVALID_ICON_CLASSNAME);
                    inputValidIcon.classList.remove(VALIDITY_LOADING_CLASSNAME);
                } else if (await checkValid(event.target.value)){
                    inputValidIcon.classList.add(VALID_ICON_CLASSNAME);
                    inputValidIcon.classList.remove(INVALID_ICON_CLASSNAME);
                    inputValidIcon.classList.remove(VALIDITY_LOADING_CLASSNAME);
                    event.target.classList.add("valid");
                } else{
                    inputValidIcon.classList.add(INVALID_ICON_CLASSNAME);
                    inputValidIcon.classList.remove(VALID_ICON_CLASSNAME);
                    inputValidIcon.classList.remove(VALIDITY_LOADING_CLASSNAME);
                }
            }
        }, 100);
    }
    return {value, onChange};
}