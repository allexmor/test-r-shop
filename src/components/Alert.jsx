import { useEffect } from "react";

function Alert(props){
    const {name = '', closeAlert = Function.prototype} = props;

    useEffect(()=>{
        const timerId = setTimeout(closeAlert, 3000);

        return ()=>{
            clearTimeout(timerId);
        }
        // eslint-disable-next-line
    }, [name]);

    return <div id="toast-contaiener">{name} добавлен в корпзину</div>
}

export {Alert};