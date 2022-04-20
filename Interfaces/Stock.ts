/**
 * Stock interface.
 */
export interface Stock {
    id: number,
    article_number: string,
    name: string,
    description: string,
    specifiers: number,
    stock: number,
    location: string,
    price: string,
    api_key: string,
};
