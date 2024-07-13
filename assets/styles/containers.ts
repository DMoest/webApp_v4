/**
 * Module imports.
 */
// eslint-disable-next-line import/namespace
import { Dimensions } from 'react-native';
import * as Color from './colors';
import * as Typography from './typography';

/**
 * Content container
 */
export const content = {
    width: '100%',
    height: 'auto',
    flex: 1,
    overflowX: 'hidden',
    overflowY: 'scroll',
    paddingTop: Typography.whiteSpace[25],
    paddingHorizontal: Typography.whiteSpace[50],
    paddingBottom: Typography.whiteSpace[100],
    margin: 0,

    // Colors
    color: Color.text.dark,
    backgroundColor: Color.background.light,
};

export const screenIntroductory = {
    width: '100%',
    height: 'auto',
    paddingHorizontal: Typography.whiteSpace[25],
    backgroundColor: Color.background.light,
};

export const scrollView = {
    flex: 1,
    padding: Typography.whiteSpace[75],
    paddingVertical: Typography.whiteSpace[10],
    backgroundColor: Color.background.light,
};

/**
 * Margin options.
 */
// export const margin = {
//     baseH: (Dimensions.get('screen').width / 100) * 3, // 3% of screen size,
//     baseV: (Dimensions.get('screen').width / 100) * 3,
// };

/**
 * FlexBox options.
 */
export const flexBox = {
    rowNoPadding: {
        width: '100%',
        height: undefined,
        paddingVertical: 0,
        paddingHorizontal: 0,
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    row: {
        width: '100%',
        height: undefined,
        alignSelf: 'center',
        paddingVertical: Typography.whiteSpace[25],
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

export const grid = {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginHorizontal: Typography.whiteSpace[10],
    marginVertical: Typography.whiteSpace[25],

    // FlexBox options
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Typography.whiteSpace[25],
    justifyContent: 'space-between',

    row: {
        width: '100%',
        paddingVertical: Typography.whiteSpace[10],
        paddingHorizontal: Typography.whiteSpace[10],
        margin: 0,

        // FlexBox options
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Typography.whiteSpace[25],
        justifyContent: 'space-between',
    },
    rowNoPadding: {
        width: '100%',
        padding: 0,
        margin: 0,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    column: {
        width: '100%',
        height: 'auto',

        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: 0,
    },
    col: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',

        1: { flex: 1 },
        2: { flex: 2 },
        3: { flex: 3 },
        4: { flex: 4 },
        5: { flex: 5 },
        6: { flex: 6 },
        7: { flex: 7 },
        8: { flex: 8 },
        9: { flex: 9 },
        10: { flex: 10 },
        11: { flex: 11 },
        12: { flex: 12 },
    },
};

/**
 * Bottom separator line.
 */
export const bottomSeparator = {
    paddingVertical: Typography.whiteSpace[50],
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
};

/**
 * Border radius options.
 */
export const borderRadius = {
    msgContainer: 3,
    button: 5,
    input: 5,
    container: 5,
    card: 5,
    modal: 5,
};

/**
 * Flatlist background color.
 */
export const flatList = {
    width: '100%',
    height: '100%',
    margin: 0,
    paddingHorizontal: Typography.whiteSpace[100],
    backgroundColor: Color.background.light,
};

/**
 * Flash message base container styles.
 */
const baseMsgContainer = {
    width: '100%',
    height: 'auto',
    flex: 1,
    paddingHorizontal: Typography.whiteSpace[50],
    paddingVertical: Typography.whiteSpace[50],
    marginVertical: Typography.whiteSpace[25],
    marginHorizontal: Typography.whiteSpace[50],
    alignSelf: 'center',
    borderRadius: borderRadius.msgContainer,
    backgroundColor: Color.background.light,
};

/**
 * Info flash message container styles.
 */
export const infoMsgContainer = {
    ...baseMsgContainer,
    backgroundColor: Color.indicator.info[400],
};

/**
 * Success flash message container styles.
 */
export const successMsgContainer = {
    ...baseMsgContainer,
    backgroundColor: Color.indicator.positive[300],
};

/**
 * Warning flash message container styles.
 */
export const warningMsgContainer = {
    ...baseMsgContainer,
    backgroundColor: Color.indicator.warning[300],
};

/**
 * Caution flash message container styles.
 */
export const cautionMsgContainer = {
    ...baseMsgContainer,
    backgroundColor: Color.indicator.caution[300],
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
