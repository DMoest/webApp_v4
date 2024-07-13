import * as Color from './colors';
import * as Typography from './typography';

export const loadingIndicator = {
    size: 'large',
    width: '100%',
    height: 'auto',
    color: Color.schemeOne.primary[300],
};

export const loadingIndicatorContainer = {
    width: '100%',
    height: 'auto',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: Color.background.light,
};

export const loadingIndicatorText = {
    paddingVertical: Typography.whiteSpace[100],
    paddingHorizontal: Typography.whiteSpace[100],
    color: Color.text.dark,
    fontSize: 16,
    fontWeight: Typography.fontWeight.h4,
    fontFamily: Typography.fontFamily.subHeader,
    textAlign: 'center',
};
