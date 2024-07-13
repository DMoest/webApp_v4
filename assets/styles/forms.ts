/**
 * Module imports.
 */
import * as Color from './colors';
import * as Container from './containers';
import * as Typography from './typography';

export const baseInput = {
    width: '100%',
    height: 'auto',
    paddingHorizontal: Typography.whiteSpace[25],
    paddingVertical: Typography.whiteSpace[50],
    marginBottom: Typography.whiteSpace[25],

    alignSelf: 'center',
    justifySelf: 'center',

    // Border
    borderWidth: 0.5,
    borderRadius: Container.borderRadius.button,
    borderColor: Color.grayScale[100],

    // Fonts
    textAlign: 'left',
    textAlignVertical: 'middle',
    fontSize: Typography.fontSize.text,
    fontFamily: Typography.fontFamily.text,
    color: Color.text.dark,
    backgroundColor: Color.background.light,
};

/**
 *
 */
export const textInputField = {
    ...baseInput,
    backgroundColor: Color.schemeOne.primary[100],
};

export const labelInputField = {
    width: '100%',
    height: 30,
    paddingHorizontal: Typography.whiteSpace[25],
    paddingVertical: Typography.whiteSpace[50],
};

export const pickers = {
    width: '100%',
    maxHeight: 10,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginVertical: 0,
    marginHorizontal: 0,
};

// export const pickerItems = {
//     width: '100%',
//     textSize: Typography.fontSize.text,
//     paddingHorizontal: 0,
//     paddingVertical: 0,
// };

export const TabBarStyles = {
    tabBar: {
        width: '100%',
        height: 'auto',
        paddingHorizontal: 0,
        backgroundColor: Color.indicator.caution[100],
    },
    tab: {
        width: 'auto',
        padding: 0,
    },
    indicator: {
        backgroundColor: '#000', // Change this to your preferred color
    },
};
