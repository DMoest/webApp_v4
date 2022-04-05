import * as Color from "./colors";
import {theme} from "./theme";
import * as Container from "./container";


/**
 * Line Height.
 */
export const lineHeight = {
    l1: -1.6,
}

/**
 * White Space.
 */
export const whiteSpace = {
    X025: 4.55,
    X050: 9.1,
    X075: 13.65,
    X1: 18.2,
    X2: 36.4,
}

/**
 * Modular scale font sizes.
 */
export const fontSize = {
    h1: 54.71,
    h2: 41.05,
    h3: 30.79,
    h4: 23.1,
    h5: 17.33,
    text: 13,
    smallText: 7.5,
    miniText: 5.63,
}

/**
 * Font Weights
 */
export const fontWeight = {
    h1: "400",
    h2: "400",
    h3: "400",
    h4: "400",
    h5: "400",
    text: "400",
    btn: "600",
}

export const fontFamily = {
    header: "OleoScriptSwashCaps_400Regular",
    subHeader: "JosefinSans_600SemiBold",
    text: "Merriweather_400Regular",
    quotes: "Merriweather_400Regular_Italic",
    btn: "JosefinSans_600SemiBold",
    btn2: "Merriweather_700Bold",
}

export const header = {
    width: '100%',
    height: undefined,
    paddingVertical: whiteSpace.X2,
    paddingHorizontal: whiteSpace.X1,

    textAlign: 'center',
    lineHeight: lineHeight.l1,
    fontSize: fontSize.h1,
    fontWeight: fontWeight.h1,
    fontFamily: fontFamily.header,

    color: Color.text.light,
}

export const subHeader = {
    alignSelf: 'center',
    marginTop: Container.margin.subHeaderTop,
    marginBottom: Container.margin.subHeaderBottom,
    fontSize: fontSize.h4,
    fontFamily: fontFamily.subHeader,
    lineHeight: lineHeight.l1,
    color: Color.text.dark,
}

export const paragraph = {
    width: '100%',
    height: undefined,
    paddingHorizontal: whiteSpace.X050,
    paddingVertical: whiteSpace.X050,

    textAlign: 'left',
    lineHeight: lineHeight.l1,
    fontSize: fontSize.text,
    fontWeight: fontWeight.text,
    fontFamily: fontFamily.text,
}

export const dataLeft = {
    width: '100%',
    height: undefined,
    paddingHorizontal: whiteSpace.X025,
    paddingVertical: whiteSpace.X025,

    textAlign: 'left',
    lineHeight: lineHeight.l1,
    fontSize: fontSize.text,
    fontWeight: fontWeight.text,
    fontFamily: fontFamily.text,
}

export const dataCenter = {
    width: '100%',
    height: undefined,
    paddingHorizontal: whiteSpace.X025,
    paddingVertical: whiteSpace.X025,

    textAlign: 'center',
    lineHeight: lineHeight.l1,
    fontSize: fontSize.text,
    fontWeight: fontWeight.text,
    fontFamily: fontFamily.text,
}

export const dataRight = {
    width: '100%',
    height: undefined,
    paddingHorizontal: whiteSpace.X025,
    paddingVertical: whiteSpace.X025,

    textAlign: 'right',
    lineHeight: lineHeight.l1,
    fontSize: fontSize.text,
    fontWeight: fontWeight.text,
    fontFamily: fontFamily.text,
}

export const endMarginText = {
    marginBottom: whiteSpace.X1,
}

export const endMarginHeader = {
    marginBottom: whiteSpace.X2,
}

export const typography = {
    // Fonts
    headerFont: "OleoScriptSwashCaps_400Regular",
    subHeaderFont: "JosefinSans_600SemiBold",
    textFont: "Merriweather_400Regular",
    quotesFont: "Merriweather_400Regular_Italic",
    btnFont: "JosefinSans_600SemiBold",
    btnFont2: "Merriweather_700Bold",

    // Typography
    btnBigFontSize: 16,
    btnSmallFontSize: 14,

    // Modular scale
    h1Size: 54.71,
    h2Size: 41.05,
    h3Size: 30.79,
    h4Size: 23.1,
    h5Size: 17.33,
    textSize: 13,
    textSmallSize: 7.5,
    textMiniSize: 5.63,

    lineHeight: -1.6,

    // Whitespace
    whiteSpace25: 4.55,
    whiteSpace50: 9.1,
    whiteSpace75: 13.65,
    whiteSpace: 18.2,
    whiteSpace200: 36.4,

    // Weight
    h1Weight: "400",
    h2Weight: "400",
    h3Weight: "400",
    h4Weight: "400",
    h5Weight: "400",
    textWeight: "400",
    btnWeight: "600",

    headerWeight: "400",
    subHeaderWeight: "400",
    paragraphWeight: "400",
    btnWeight: "600",
}
