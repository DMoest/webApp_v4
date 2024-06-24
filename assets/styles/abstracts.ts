/**
 * Module imports.
 */
import * as Color from './colors';
import * as Typography from './typography';

/**
 * Abstracts Attributes.
 */
export const abstracts = {
    // Shadow properties
    buttonOffset: {
        width: 0.5,
        height: 1.5,
    },
    buttonOpacity: 0.4,
    buttonRadius: 1.5,
    buttonElevation: 2,
};

/**
 * Shadows Attributes.
 */
export const shadow = {
    btnOffset: {
        width: 0.5,
        height: 1.5,
    },
    buttonOpacity: 0.3,
    buttonRadius: 1.5,
    buttonElevation: 2,
};

/**
 * Activity Indicator Attributes.
 */
export const activityIndicator = {
    size: 'large',
    marginVertical: Typography.whiteSpace[100],
    marginHorizontal: Typography.whiteSpace[100],
    color: Color.schemeOne.primary[300],
};
