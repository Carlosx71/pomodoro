import React from 'react';

import { any, node, number } from 'prop-types';

import { IFlexContainerProps, IFlexContainerStyles } from './interfaces';
import { FlexContainerStyles } from './styles';

const FlexContainer: React.FC<IFlexContainerProps> = ({ padding, children }) => {
  const styledProps: IFlexContainerStyles = { padding: padding ?? 0 };
  const classes = FlexContainerStyles(styledProps);
  return (
    <div className={classes.root}>{children}</div>
  );
};

FlexContainer.propTypes = {
  padding: number,
  children: node,
};

FlexContainer.defaultProps = {
  padding: 0,
  children: any,
};

export default FlexContainer;
