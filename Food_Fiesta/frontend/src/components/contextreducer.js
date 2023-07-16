import React, { useContext, useReducer, createContext } from 'react'

const cartstatecontext = createContext();
const cartdispatchcontext = createContext();

const reducer = (state,action) => {
    switch(action.type)
    {
        case "Add" : return[...state,{id:action.id , name:action.name , qty:action.qty , size:action.size , price:action.price , img:action.img}]
        case "Remove" : let newArr = [...state] 
                        newArr.splice(action.index, 1)
                        return newArr;
        default : console.log("error")
    }
}

export const CartProvider = ({ children })=> {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <cartdispatchcontext.Provider value={dispatch}>
            <cartstatecontext.Provider value={state}>
                {children}
            </cartstatecontext.Provider>
        </cartdispatchcontext.Provider>
    )
}

export const useCart = ()=> useContext(cartstatecontext);
export const useDispatchcart = ()=> useContext(cartdispatchcontext);