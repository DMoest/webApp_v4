import * as Color from './colors';
import * as Typography from './typography';
import { Dimensions } from 'react-native';

export const mainContainer = {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Color.background.light,
};

export const content = {
    flex: 1,
    paddingHorizontal: Typography.whiteSpace.X075,
    backgroundColor: Color.background.light,
};

export const padding = {
    baseH: (Dimensions.get('screen').width / 100) * 3, // 3% of screen size
    baseV: (Dimensions.get('screen').width / 100) * 3,
};

export const margin = {
    baseH: (Dimensions.get('screen').width / 100) * 3, // 3% of screen size,
    baseV: (Dimensions.get('screen').width / 100) * 3,
};
