/**
 * Module imports.
 */
// eslint-disable-next-line import/namespace
import { Dimensions } from 'react-native';
import * as Color from './colors';

/**
 * White Space.
 */
export const whiteSpace = {
    X025: 4.55,
    X050: 9.1,
    X075: 13.65,
    X1: 18.2,
    X2: 36.4,
};

/**
 * Content container
 */
export const content = {
    flex: 1,
    paddingHorizontal: whiteSpace.X075,
    backgroundColor: Color.background.light,
};

/**
 * Margin options.
 */
export const margin = {
    baseH: (Dimensions.get('screen').width / 100) * 3, // 3% of screen size,
    baseV: (Dimensions.get('screen').width / 100) * 3,
};

/**
 * FlexBox options.
 */
export const flexBox = {
    rowNoPadding: {
        width: '100%',
        height: undefined,
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    row: {
        width: '100%',
        height: undefined,
        alignSelf: 'center',
        paddingVertical: whiteSpace.X025,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    column: {
        alignSelf: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
};

/**
 * Bottom separator line.
 */
export const bottomSeparator = {
    paddingVertical: whiteSpace.X025,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
};

/**
 * Border radius options.
 */
export const borderRadius = {
    button: 5,
};

/**
 * Flatlist background color.
 */
export const flatList = {
    backgroundColor: Color.background.light,
};

/**
 * Containers.
 */
export const containers = {
    // Paddings & Margins

    // Markers explained:
    // H = Horizontal, V = Vertical,
    // T = Top, B = Bottom, L = Left, R = Right,

    //Base
    basePaddingH: (Dimensions.get('screen').width / 100) * 3, // 3% of screen size
    basePaddingV: 10,
    baseMarginH: (Dimensions.get('screen').width / 100) * 3, // 3% of screen size,
    baseMarginV: 10,

    // Container
    containerPaddingH: 12,
    containerPaddingV: 12,
    containerMarginH: 10,
    containerMarginV: 10,
    containerMarginB: 10,

    // Header
    headerPaddingH: 12,
    headerPaddingV: 40,
    headerMarginT: 12,
    headerMarginB: 24,
    headerMarginH: 12,
    headerMarginV: 10,

    // subHeader
    subHeaderPaddingH: 12,
    subHeaderPaddingV: 10,
    subHeaderMarginH: 12,
    subHeaderMarginV: 10,
    subHeaderMarginT: 12,
    subHeaderMarginB: 22,

    // Paragraph
    textPaddingH: 12,
    textPaddingV: 10,
    textPaddingT: 10,
    textPaddingB: 10,
    textMarginH: 12,
    textMarginV: 10,

    // Buttons
    btnPaddingH: 15,
    btnPaddingV: 8,
    btnMarginH: 10,
    btnMarginV: 10,
    btnBigMarginB: 1,
    btnSmallMarginB: 10,

    // BorderRadius
    bthRadius: 5,
};
