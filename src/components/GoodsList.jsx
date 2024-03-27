import {GoodsItem} from "./GoodsItem";

function GoodsList(props){
    const {goods = [], addToBasket = Function.prototype} = props;  // на всякий случай, чтобы не сломать

    if(!goods.length){
        return <h3>Nothing here</h3>
    }

    return <div className="goods">
        {goods.map((item,index)=>(
           
                <GoodsItem key={item.id} {...item}  addToBasket={addToBasket}/>
    
        ))}
    </div>
}

export {GoodsList};