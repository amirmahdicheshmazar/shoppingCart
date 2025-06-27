import React,{useContext} from 'react';

// context
import { CartContext } from '../../context/CartContextProvider';

// function
import { shorten } from '../../helper/functions';

// icon
import trashIcon from "../../assets/icons/trash.svg"

//styles
import styles from "./Cart.module.css";

const Cart = ({data}) => {

    const {dispatch} = useContext(CartContext);
    const {image, title, price, quantitiy} = data;

    return (
        <div className={styles.container} >
            <img className={styles.productImage} src={image} />
            <div className={styles.data}>
                <h3>{shorten(title)}</h3>
                <p>{price} $</p>
            </div>
            <div>
                <span className={styles.quantitiy}>{quantitiy}</span>
            </div>
            <div className={styles.buttonContainer}>
                {
                    quantitiy > 1 ? 
                    <button onClick={() => dispatch({type: "DECREASE", payload: data})} >-</button> :
                    <button onClick={() => dispatch({type: "REMOVE_ITEM", payload: data})} ><img src={trashIcon} alt="trash" /></button>
                }
                <button onClick={() => dispatch({type: "INCREASE", payload: data})} >+</button>
            </div>
        </div>
    );
};

export default Cart;