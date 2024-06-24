/**
 * Module imports.
 */
import * as Color from './colors';
import * as Container from './containers';
import * as Typography from './typography';

/**
 *
 */
export const textInputField = {
    width: '100%',
    height: 'auto',
    paddingHorizontal: Typography.whiteSpace[50],
    paddingVertical: Typography.whiteSpace[50],
    marginBottom: Typography.whiteSpace[10],
    backgroundColor: Color.grayScale.gray4,
    color: Color.text.dark,
    borderRadius: Container.borderRadius.button,
    justifySelf: 'center',
    alignSelf: 'center',
};

export const labelInputField = {
    width: '100%',
    height: 30,
    paddingHorizontal: Typography.whiteSpace[25],
    paddingVertical: Typography.whiteSpace[50],
};

export const pickers = {
    width: '100%',
    // maxHeight: 20,
    paddingHorizontal: 0,
    paddingVertical: 0,
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
