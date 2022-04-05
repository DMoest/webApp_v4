import {Dimensions} from "react-native";
import {theme} from "./theme";
import {Color, Typography} from "./index";

export const content = {
    flex: 1,
    paddingHorizontal: Typography.whiteSpace.X075,
    backgroundColor: Color.background.light,
}

export const padding = {
    baseH: (Dimensions.get('screen').width / 100) * 3, // 3% of screen size
    baseV: (Dimensions.get('screen').width / 100) * 3,
}

export const margin = {
    baseH: (Dimensions.get('screen').width / 100) * 3, // 3% of screen size,
    baseV: (Dimensions.get('screen').width / 100) * 3,

    subHeaderTop: Typography.whiteSpace.X050,
    subHeaderBottom: Typography.whiteSpace.X1,
}

export const flexBox = {
    row: {
        width: '100%',
        height: undefined,
        paddingVertical: Typography.whiteSpace.X025,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

}

export const container = {
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
}
