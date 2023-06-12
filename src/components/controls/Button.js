import React from 'react';
import styled from 'styled-components';
import {red, dark, white, yellow, orange} from '../../common/palette';
import {rgba} from 'polished';
import PropTypes from 'prop-types';

//styled components
const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  font: inherit;
  background-color: ${({isStopButton}) => (isStopButton ? red : yellow)};
  border-radius: 5px;
  color: ${({isStopButton}) => (isStopButton ? white : dark)};
  padding: 10px 20px;

  &:hover {
    background-color: ${({isStopButton}) =>
      isStopButton ? rgba(red, 0.8) : orange};
  }

  @media (max-width: 768px) {
    width: 20%;
    padding: 5px 10px;
  }
`;

/**
 * Styled button component with customizable styles.
 * @component
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {Function} props.buttonClickHandler - The click event handler for the button.
 * @param {boolean} props.stopButton - Flag indicating whether the button is a stop button.
 * @param {...*} props - Additional props to be spread on the button element.
 * @returns {JSX.Element} The rendered button component.
 */
export default function Button({
  children,
  buttonClickHandler,
  stopButton,
  ...props
}) {
  return (
    <StyledButton
      onClick={buttonClickHandler}
      isStopButton={stopButton}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  /* The content of the button */
  children: PropTypes.node.isRequired,
  /* The click event handler for the button */
  buttonClickHandler: PropTypes.func.isRequired,
  /* indicating whether the button is a stop button */
  stopButton: PropTypes.bool,
};
