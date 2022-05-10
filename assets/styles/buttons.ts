/**
 * Module imports.
 */
import * as Abstract from './abstracts';
import * as Color from './colors';
import * as Container from './containers';

/**
 * Standard List Button.
 */
export const button = {
    width: '100%',
    height: undefined,
    overflow: 'hidden',
    paddingHorizontal: Container.whiteSpace.X075,
    paddingVertical: Container.whiteSpace.X050,
    marginVertical: Container.whiteSpace.X025,
    borderRadius: Container.borderRadius.button,
    backgroundColor: Color.schemeOne.primary,
    color: Color.text.dark,
};

/**
 * Standard Button Container.
 */
export const buttonContainer = {
    alignSelf: 'center',
    width: '95%',
    height: undefined,
    backgroundColor: Color.background.light,

    // Shadows
    shadowColor: Color.shadows.s1,
    shadowOffset: Abstract.shadow.buttonOffset,
    shadowOpacity: Abstract.shadow.buttonOpacity,
    shadowRadius: Abstract.shadow.buttonRadius,
    elevation: Abstract.shadow.buttonElevation,
};

export const buttonSTD = {
    // width: '100%',
    height: undefined,
    overflow: 'hidden',
    paddingHorizontal: Container.whiteSpace.X075,
    paddingVertical: Container.whiteSpace.X050,
    marginVertical: Container.whiteSpace.X025,
    marginHorizontal: Container.whiteSpace.X050,

    borderRadius: Container.borderRadius.button,
    backgroundColor: Color.schemeOne.secondary,
    color: Color.text.dark,
};
