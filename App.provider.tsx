import React, {useEffect, useState} from "react";
import {createContext} from "react";
import {Stock} from 'Interfaces/Stock';
import * as ProductModel from '../models/Products';

const [products, setProducts] = useState([]);

useEffect(async () => {
    setProducts(await ProductModel.getProducts());
}, []);

const AppContext = createContext<Stock[]>({
    products: products<Stock>
});


export const AppProvider: React.FC = ({children}) => {
    return (
        <AppContext.Provider value={}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => React.useContext(AppContext);
