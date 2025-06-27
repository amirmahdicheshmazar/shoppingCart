import React,{useReducer,createContext} from 'react';
import Product from '../components/shared/Product';

const initialState = {
    selectedItems : [],
    itemsCounter : 0,
    total : 0,
    checkout : false
}

const sumItems = (items) => {
    const itemsCounter = items.reduce((total, product) => total + product.quantitiy,0);
    const total = items.reduce((total,product) => total + product.price * product.quantitiy,0).toFixed(2);
    return {itemsCounter,total}
}

const cartReducer = (state,action) => {
    switch(action.type){
        case "ADD_ITEM" :
            if(!state.selectedItems.find(item => item.id === action.payload.id)){
                state.selectedItems.push({
                    ...action.payload,quantitiy: 1
                })
            }
            return { 
                ...state,
                selectedItems : [...state.selectedItems],
                ...sumItems(state.selectedItems),
                checkout : false
            }

        case "REMOVE_ITEM" :
            const newSelectedItems = state.selectedItems.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                selectedItems: [...newSelectedItems],
                ...sumItems(newSelectedItems)
            }
        
        case "INCREASE" : 
            const indexI = state.selectedItems.findIndex(item => item.id === action.payload.id);
            state.selectedItems[indexI].quantitiy++;
            return {...state,
                ...sumItems(state.selectedItems)
            }

        case "DECREASE" : 
        const indexd = state.selectedItems.findIndex(item => item.id === action.payload.id);
        state.selectedItems[indexd].quantitiy--;
        return {...state,
            ...sumItems(state.selectedItems)
        }    

        case "CHECKOUT" :
            return {    
                selectedItems : [],
                itemsCounter : 0,
                total : 0,
                checkout : true
            }

        case "CLEAR" :
            return {
                selectedItems : [],
                itemsCounter : 0,
                total : 0,
                checkout : false
            }    
        
        default : 
            return state;

    }
}

export const CartContext = createContext()

const CartContextProvider = ({children}) => {

    const [state,dispatch] = useReducer(cartReducer,initialState)

    return (
        <CartContext.Provider value={{state,dispatch}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;