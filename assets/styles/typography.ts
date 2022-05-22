/**
 * Module imports.
 */
import * as Color from './colors';
import * as Container from './containers';

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
};

/**
 * Font Weights
 */
export const fontWeight = {
    h1: '400',
    h2: '400',
    h3: '400',
    h4: '400',
    h5: '400',
    text: '400',
    btn: '600',
};

/**
 * Font Family attributes.
 */
export const fontFamily = {
    header: 'OleoScriptSwashCaps_400Regular',
    subHeader: 'JosefinSans_600SemiBold',
    text: 'Merriweather_400Regular',
    quotes: 'Merriweather_400Regular_Italic',
    btn: 'JosefinSans_600SemiBold',
    btn2: 'Merriweather_700Bold',
};

/**
 * Header attributes.
 */
export const header = {
    width: '100%',
    height: undefined,
    paddingVertical: whiteSpace.X2,
    paddingHorizontal: whiteSpace.X1,

    textAlign: 'center',
    fontSize: fontSize.h1,
    fontWeight: fontWeight.h1,
    fontFamily: fontFamily.header,

    color: Color.text.light,
};

/**
 * Sub Header attributes.
 */
export const subHeader = {
    alignSelf: 'center',
    paddingVertical: whiteSpace.X050,
    marginBottom: whiteSpace.X1,
    fontSize: fontSize.h4,
    fontFamily: fontFamily.subHeader,
    color: Color.text.dark,
    textTransform: 'uppercase',
};

/**
 * Paragraph attributes.
 */
export const paragraph = {
    width: '100%',
    height: undefined,
    paddingHorizontal: whiteSpace.X050,
    paddingVertical: whiteSpace.X050,
    flexWrap: 'wrap',
    textAlign: 'left',
    fontSize: fontSize.text,
    fontWeight: fontWeight.text,
    fontFamily: fontFamily.text,
};

/**
 * Data to the left attributes.
 */
export const dataLeft = {
    paddingHorizontal: whiteSpace.X025,
    paddingBottom: whiteSpace.X025,
    flexWrap: 'wrap',
    textAlign: 'left',
    fontSize: fontSize.text,
    fontWeight: fontWeight.text,
    fontFamily: fontFamily.text,
};

/**
 * Data placed centered attributes.
 */
export const dataCenter = {
    paddingHorizontal: whiteSpace.X025,
    paddingBottom: whiteSpace.X025,
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: fontSize.text,
    fontWeight: fontWeight.text,
    fontFamily: fontFamily.text,
};

/**
 * Data to the right attributes.
 */
export const dataRight = {
    paddingHorizontal: whiteSpace.X025,
    paddingBottom: whiteSpace.X025,
    textAlign: 'right',
    fontSize: fontSize.text,
    fontWeight: fontWeight.text,
    fontFamily: fontFamily.text,
};

/**
 * End margin text attributes.
 */
export const endMarginText = {
    marginBottom: whiteSpace.X1,
};

/**
 * Typography for
 */
export const buttonText = {
    width: '100%',
    height: undefined,
    paddingVertical: Container.whiteSpace.X050,
    paddingHorizontal: Container.whiteSpace.X050,
    alignSelf: 'center',
    fontFamily: fontFamily.btn,
    fontSize: fontSize.h5,
    textAlign: 'center',
};

/**
 * Typography for flashmessage text.
 */
export const warningFlashMessageText = {
    textAlign: 'center',
    fontSize: fontSize.text,
    fontWeight: fontWeight.text,
    fontFamily: fontFamily.text,
    color: Color.text.dark,
};

/**
 * Typography attributes.
 */
export const typography = {
    // Fonts
    headerFont: 'OleoScriptSwashCaps_400Regular',
    subHeaderFont: 'JosefinSans_600SemiBold',
    textFont: 'Merriweather_400Regular',
    quotesFont: 'Merriweather_400Regular_Italic',
    btnFont: 'JosefinSans_600SemiBold',
    btnFont2: 'Merriweather_700Bold',

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

    // Whitespace
    whiteSpace25: 4.55,
    whiteSpace50: 9.1,
    whiteSpace75: 13.65,
    whiteSpace: 18.2,
    whiteSpace200: 36.4,

    // Weight
    h1Weight: '400',
    h2Weight: '400',
    h3Weight: '400',
    h4Weight: '400',
    h5Weight: '400',
    textWeight: '400',
    btnWeight: '600',

    headerWeight: '400',
    subHeaderWeight: '400',
    paragraphWeight: '400',
};
