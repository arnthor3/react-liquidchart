import React, { PropTypes } from 'react';

const Clip = ({ clipId }) => (
  <defs>
    <clipPath id={clipId}>
      <path />
    </clipPath>
  </defs>
);

Clip.propTypes = {
  clipId: PropTypes.string,
};

export default Clip;
