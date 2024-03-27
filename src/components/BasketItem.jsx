function BasketItem(props){
    const {id, name, price, quantity, removeFromBasket=Function.prototype, changeProductNumber=Function.prototype} = props;

    return <li className="collection-item">
        {/* {name} x {quantity} = {price * quantity} руб. */}
        {name} x <button onClick={()=>changeProductNumber(id, '-')}>-</button> {quantity} <button onClick={()=>changeProductNumber(id, '+')}>+</button> = {price * quantity} руб.
        <span  className="secondary-content">
            <i className="material-icons basket-delete" onClick={()=>removeFromBasket(id)}>close</i>
        </span>
        </li>
    
}

export {BasketItem};