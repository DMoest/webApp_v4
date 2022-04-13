import React from "react";
import config from '../config/config.json';
import Deliveries from '../Interfaces/Deliveries';


async function getDeliveries(): Promise<Deliveries[]> {
    let response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`)
    let result = await response.json();

    return result.data;
}

export {getDeliveries}
