import React from 'react';
import PropTypes from 'prop-types';

const Clip = ({ clipId }) => (
  <g transform="translate(40,0)">
    <defs>
      <clipPath id={clipId}>
        <path />
      </clipPath>
    </defs>
  </g>

);

Clip.propTypes = {
  clipId: PropTypes.string,
};

export default Clip;
