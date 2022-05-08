/**
 * Module imports.
 */
import * as Color from './colors';
import * as Typography from './typography';
// eslint-disable-next-line import/namespace
// import { Dimensions } from 'react-native';

/**
 * Main Container attributes.
 */
export const mainContainer = {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Color.background.light,
};

/**
 * Base Content Attributes.
 */
export const content = {
    flex: 1,
    paddingHorizontal: Typography.whiteSpace.X075,
    backgroundColor: Color.background.light,
};

/**
 * Base Padding Attributes.
 */
// export const padding = {
//     baseH: (Dimensions.get('screen').width / 100) * 3, // 3% of screen size
//     baseV: (Dimensions.get('screen').width / 100) * 3,
// };

/**
 * Base Margins Attributes.
 */
// export const margin = {
//     baseH: (Dimensions.get('screen').width / 100) * 3, // 3% of screen size,
//     baseV: (Dimensions.get('screen').width / 100) * 3,
// };
