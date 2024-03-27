import { useState, useEffect } from "react";
import {API_KEY, API_URL} from '../config';

import {Preloader} from "./Preloader";
import { GoodsList } from "./GoodsList";
import {Cart} from './Cart'; 
import {BasketList} from './BasketList';
import { Alert } from "./Alert";

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    const addToBasket = (item) => {
        console.log(order, item);
        const itemIndex = order.findIndex((orderItem)=>{
            return orderItem.id === item.id;
        });
        console.log('itemIndex: '+itemIndex);
        if(itemIndex<0){
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem]);
        }else{
            const newOrder = order.map((orderItem, index)=>{
                if(index===itemIndex){
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    }
                }else{
                    return orderItem;
                }
            })

            setOrder(newOrder);
        }
        setAlertName(item.name);
        
        // setOrder(order => [...order, item]);
        // setOrder([...order, item]);
       // setOrder([...order, newItem]);
    };

    const removeFromBasket = (itemId)=>{
        const newOrder = order.filter(el=>el.id!==itemId);
        setOrder(newOrder);
    }

    const handleBasketShow = ()=>{
        setBasketShow(!isBasketShow);
    }

    const changeProductNumber = (id, sign)=>{

        const itemIndex = order.findIndex(orderItem=>{
            return id === orderItem.id;
        });

        if(itemIndex>-1){  
            const newOrder = order.map((orderItem, index)=>{
                if(index===itemIndex){
                    if(sign==='+'){
                        const newItem = {
                            ...orderItem,
                            quantity: orderItem.quantity+1,
                        }
                        return newItem;
                    }else{
                            const newItem = {
                                ...orderItem,
                                quantity: orderItem.quantity>0 ? orderItem.quantity-1 : 0,
                            }
                            return newItem;                   
                    }   
                }else{
                    return orderItem;
                }
            });
            setOrder(newOrder);
        }
    }

    const closeAlert = () =>{
        setAlertName('');
    }

    useEffect(function getGoods(){
        fetch(API_URL, {
            headers:{
                "Authorization": API_KEY,
            }
        }).then(response=>response.json()).then(data=>{
            data.featured && setGoods(data.featured);
            setLoading(false);
        })
    }, []);

  

    return <main className="container content">
        <Cart quantity = {order.length} handleBasketShow={handleBasketShow}/>
       {
        loading ? <Preloader/> : <GoodsList goods={goods} addToBasket={addToBasket} />
       }
       {
        isBasketShow && (<BasketList 
                            order = {order} 
                            handleBasketShow={handleBasketShow} 
                            removeFromBasket={removeFromBasket} 
                            changeProductNumber={changeProductNumber}
                            />)
       }
       {
            alertName && <Alert name={alertName} closeAlert={closeAlert} />
       }
    </main>
}

export { Shop }