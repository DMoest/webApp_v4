/**
 * Module imports.
 */
import * as Abstract from './abstracts';
import * as Color from './colors';
import * as Container from './containers';
import * as Typography from './typography';
import * as Variable from './variables';

/**
 * Base button properties.
 */
export const baseButton = {
    overflow: 'hidden',
    width: '100%',
    height: 'auto',
    paddingHorizontal: Typography.whiteSpace[50],
    paddingVertical: Typography.whiteSpace[25],
    marginVertical: Typography.whiteSpace[25],
    marginHorizontal: Typography.whiteSpace[10],
    alignSelf: 'center',
    borderRadius: Variable.borderRadius.button,

    // Colors
    color: Color.text.dark,
    backgroundColor: Color.background.light,

    // Shadows/Abstracts
    shadowColor: Color.shadows[400],
    shadowOffset: Abstract.shadow.btnOffset,
    shadowOpacity: Abstract.shadow.buttonOpacity,
    shadowRadius: Abstract.shadow.buttonRadius,
    elevation: Abstract.abstracts.buttonElevation,
};

// List button style
export const listButton = {
    ...baseButton,
    backgroundColor: Color.schemeOne.primary[300],
};

// Button container style
export const buttonContainer = {
    ...baseButton,
    backgroundColor: Color.schemeOne.primary[300],
};

export const warningButton = {
    ...baseButton,
    backgroundColor: Color.indicator.warning[300],
};
