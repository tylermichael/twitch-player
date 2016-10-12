import React from 'react';

import './LoadingIndicator.scss'

export default _ => {
  return <div className="LoadingIndicator__root">
    <svg viewBox="0 0 16 16" className="LoadingIndicator" focusable="false">
      <g>
        <g class="msportalfx-svg-loading-ellipsis-square">
          <rect y="6" width="4" height="4"></rect>
          <rect x="6" y="6" width="4" height="4"></rect>
          <rect x="12" y="6" width="4" height="4"></rect>
        </g>
      </g>
    </svg>
  </div>
}
