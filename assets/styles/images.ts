/**
 * Module imports.
 */
// eslint-disable-next-line import/namespace
import { Dimensions } from 'react-native';
import * as Typography from './typography';

/**
 * Cover Aspect Ratio attributes.
 */
export const coverAspectRation = {
    aspectRation: 16 / 6,
};

/**
 * Cover Image attributes.
 */
export const images = {
    coverAspectRation: 16 / 6,
    coverWidth: Dimensions.get('screen').width,
    coverHeight: (Dimensions.get('screen').width / 16) * 6,
};

/**
 * Image attributes.
 */
export const image = {
    flex: 1,
    width: '100%',
    height: undefined,
    aspectRatio: coverAspectRation.aspectRation,
};

/**
 * Image Container attributes.
 */
export const imageContainer = {
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    height: (Dimensions.get('screen').width / 16) * 6,
    marginBottom: Typography.whiteSpace.X1,
};
