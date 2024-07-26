/**
 * Fetches the geographical coordinates for a given address using the Nominatim API.
 *
 * This function takes an address as input, encodes it for use in a URL, and sends a request to the
 * Nominatim API to retrieve the corresponding geographical coordinates in JSON format.
 *
 * @param {string} address - The address for which to fetch coordinates.
 * @returns {Promise<any>} A promise that resolves to the JSON response containing the coordinates.
 * @throws Will log an error message to the console if the fetch operation fails.
 */
export async function getCoordinates(address: string): Promise<any> {
    try {
        const urlEncodedAddress: string = encodeURIComponent(address);
        const url: string = "https://nominatim.openstreetmap.org/search.php?format=jsonv2&q=";
        const response: Response = await fetch(`${url}${urlEncodedAddress}`);

        return await response.json();
    } catch (error) {
        console.error('<?>    ERROR: ', error);
    }
}
