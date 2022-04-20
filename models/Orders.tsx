import React from "react";
import config from '../config/config.json';
import Order from '../Interfaces/Order';


export async function getOrders(): Promise<Order[]> {
    let response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
    let result = await response.json();

    return result.data;
}
