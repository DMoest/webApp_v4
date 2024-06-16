/**
 * Module imports.
 */
import * as Color from './colors';
import * as Container from './containers';

/**
 *
 */
export const textInputField = {
    width: '100%',
    height: 'auto',
    paddingHorizontal: Container.whiteSpace.X050,
    paddingVertical: Container.whiteSpace.X050,
    marginBottom: Container.whiteSpace.X010,
    backgroundColor: Color.grayScale.gray4,
    color: Color.text.dark,
    borderRadius: Container.borderRadius.button,
    justifySelf: 'center',
    alignSelf: 'center',
};

export const labelInputField = {
    width: '100%',
    height: 30,
    paddingHorizontal: Container.whiteSpace.X025,
    paddingVertical: Container.whiteSpace.X050,
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
