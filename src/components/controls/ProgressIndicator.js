import React from 'react';
import styled from 'styled-components';
import {slate} from '../../common/palette';
import PropTypes from 'prop-types';

//styled components
const Wrapper = styled.div`
  background-color: ${slate};
  border-radius: 2px;
  margin-bottom: 15px;
  overflow: hidden;
`;

const FilledProgressBar = styled.div`
  box-sizing: border-box;
  width: ${({percentage}) =>
    percentage > 100 || percentage === 0 ? '100%' : `${percentage}%`};
  background-color: ${({percentage}) => {
    if (percentage > 100) {
      return 'red';
    } else if (percentage > 0) {
      return 'green';
    } else {
      return;
    }
  }};

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const StyledSpan = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

/**
 * A progress indicator component.
 *
 * @param {Object} props - The component props.
 * @param {number} props.percentage - The percentage value for the progress indicator.
 * @returns {JSX.Element} The rendered progress indicator.
 */
const ProgressIndicator = ({percentage}) => {
  return (
    <Wrapper>
      <FilledProgressBar
        role="progressbar"
        value={percentage}
        data-testid="progress-bar"
        percentage={percentage}
      >
        <StyledSpan>{percentage}%</StyledSpan>
      </FilledProgressBar>
    </Wrapper>
  );
};

ProgressIndicator.propTypes = {
  /* The percentage value for the progress indicator */
  percentage: PropTypes.number.isRequired,
};

export default ProgressIndicator;
