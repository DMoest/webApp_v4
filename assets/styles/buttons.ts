/**
 * Module imports.
 */
import * as Abstract from './abstracts';
import * as Color from './colors';
import * as Container from './containers';

/**
 * Style properties for a button.
 */
export const button = {
    // width: '100%',
    // height: undefined,
    overflow: 'hidden',
    paddingHorizontal: Container.whiteSpace.X075,
    paddingVertical: Container.whiteSpace.X050,
    marginVertical: Container.whiteSpace.X025,
    borderRadius: Container.borderRadius.button,
    backgroundColor: Color.schemeOne.primary,
    color: Color.text.dark,
};

/**
 * Style properties for list buttons.
 */
export const listButton = {
    width: '100%',
    height: undefined,
    overflow: 'hidden',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Container.whiteSpace.X075,
    paddingVertical: Container.whiteSpace.X050,
    marginVertical: Container.whiteSpace.X025,
    borderRadius: Container.borderRadius.button,
    backgroundColor: Color.schemeOne.primary,
    color: Color.text.dark,
};

/**
 * Style properties for button container.
 */
export const buttonContainer = {
    width: '95%',
    height: undefined,
    alignSelf: 'center',
    backgroundColor: Color.background.light,

    // Shadows/Abstracts
    shadowColor: Color.shadows.s1,
    shadowOffset: Abstract.shadow.buttonOffset,
    shadowOpacity: Abstract.shadow.buttonOpacity,
    shadowRadius: Abstract.shadow.buttonRadius,
    elevation: Abstract.shadow.buttonElevation,
};

/**
 * Style properties for standard buttons.
 */
export const buttonSTD = {
    width: '95%',
    height: undefined,
    overflow: 'hidden',
    paddingHorizontal: Container.whiteSpace.X075,
    paddingVertical: Container.whiteSpace.X050,
    marginVertical: Container.whiteSpace.X025,
    marginHorizontal: Container.whiteSpace.X050,
    borderRadius: Container.borderRadius.button,
    backgroundColor: Color.schemeOne.primary,
    color: Color.text.dark,
};

export const textLink = {
    color: Color.colors.linkColor,

};
