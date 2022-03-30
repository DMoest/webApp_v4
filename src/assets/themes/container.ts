import {Dimensions} from "react-native";

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

    // Header
    headerPaddingH: 12,
    headerPaddingV: 10,
    headerMarginT: 12,
    headerMarginB: 24,
    headerMarginH: 12,
    headerMarginV: 10,

    subHeaderPaddingH: 12,
    subHeaderPaddingV: 10,
    subHeaderMarginH: 12,
    subHeaderMarginV: 10,
    subHeaderMarginT: 12,
    subHeaderMarginB: 24,

    // Paragraph
    textPaddingH: 12,
    textPaddingV: 10,
    textPaddingT: 10,
    textPaddingB: 10,
    textMarginH: 12,
    textMarginV: 10,

    // Buttons
    btnPaddingH: 15,
    btnPaddingV: 5,
    btnMarginH: 10,
    btnMarginV: 10,
    btnBigMarginB: 1,
    btnSmallMarginB: 10,

    // BorderRadius
    bthRadius: 5,
}
