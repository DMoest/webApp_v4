import React from "react";
import config from '../config/config.json';
import Stock from '../Interfaces/Stock';


async function getProducts(): Promise<Stock[]> {
        let response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        let result = await response.json();

        return result.data;
}

// updateProduct: async function updateProduct(product: Partial<Stock[]>) {
//     await fetch(`${config.base_url}/products?api_key=${config.api_key}`, {
//         method: 'PUT',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             id: product.id,
//             name: product.name,
//             api_key: `${config.api_key}`
//         })
//     });
// }
// }

export {getProducts}
