/**
 * Defines the properties for the ScreenCover component.
 *
 * @interface ScreenCoverArguments
 * @property {string} image - The source URI of the image to be displayed as the cover. Can be a local or
 * remote URL.
 * @property {string} headerText - The text to be displayed over the image as a header.
 */
export interface ScreenCoverArguments {
    image: string;
    headerText: string;
}


/**
 * Describes the properties for specifying an image source in components.
 *
 * This interface is used to define the source of an image, supporting both local and remote images.
 * - `image`: A string specifying the path to a local image when using a local source.
 * - `headerText`: A string intended for accompanying text or description, not directly related to the
 * image source itself.
 * - `uri`: An optional string for specifying the URL of a remote image.
 */
export interface ImageSourcePropType {
    headerText: string;
    image: string;
    uri?: string;
}
