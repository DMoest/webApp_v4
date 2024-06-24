/**
 * Module imports.
 */
import * as Color from './colors';
// import * as Typography from './typography';
// import { Dimensions } from 'react-native';

/**
 * Main Container attributes.
 */
export const mainContainer = {
    width: '100%',
    height: 'auto',
    padding: 0,
    margin: 0,

    // FlexBox
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    gap: 0,

    // Colors
    backgroundColor: Color.background.light,
};

/**
 * Base Content Attributes.
 */
export const content = {
    flex: 1,
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
