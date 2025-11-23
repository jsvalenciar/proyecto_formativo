import React from 'react';
import { Tooltip } from 'react-tooltip';

const TooltipWrapper = ({ children, tooltipId, content, place = 'top' }) => {
  return (
    <>
      <div data-tooltip-id={tooltipId} data-tooltip-content={content}>
        {children}
      </div>
      <Tooltip id={tooltipId} place={place} />
    </>
  );
};

export default TooltipWrapper;
