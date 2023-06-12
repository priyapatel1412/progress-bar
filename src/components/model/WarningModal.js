import React from 'react';
import styled from 'styled-components';
import {dark, white, green} from '../../common/palette';
import {rgba} from 'polished';
import Button from '../controls/Button';
import PropTypes from 'prop-types';

//styled components
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${rgba(dark, 0.7)};
  color: ${rgba(white, 0.8)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 40px;
  align-items: center;
  background-color: ${dark};
  max-width: 400px;
  max-height: 400px;
  border-radius: 8px;

  @media (max-width: 768px) {
    max-width: 200px;
    max-height: 200px;
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  color: ${rgba(white, 0.8)};
  top: 7px;
  right: 7px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  background-color: ${green};
  color: ${dark};
  margin: 5px;
  min-width: 100px;

  &:hover,
  &:active {
    background-color: ${rgba(green, 0.5)};
    color: ${white};
  }
`;

const ButtonConatiner = styled.div`
  display: flex;
`;

/**
 * A warning modal component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.showWarning - Flag indicating whether to show the warning modal.
 * @param {function} props.cancelHandler - Event handler for the cancel button.
 * @param {function} props.continueHandler - Event handler for the continue button.
 * @returns {JSX.Element|null} The rendered warning modal.
 */

export default function WarningModal({
  showWarning,
  cancelHandler,
  continueHandler,
}) {
  if (!showWarning) {
    return null; // If showWarning prop is false, return null to render nothing
  }

  return (
    <ModalWrapper>
      <ModalContent>
        <CloseButton onClick={cancelHandler}>X</CloseButton>
        <p>Warning!!</p>
        <p>If you press Continue this process can not be resumed!</p>
        <ButtonConatiner>
          <StyledButton buttonClickHandler={continueHandler}>
            Continue
          </StyledButton>
          <StyledButton buttonClickHandler={cancelHandler}>Cancel</StyledButton>
        </ButtonConatiner>
      </ModalContent>
    </ModalWrapper>
  );
}

// Prop types validation
WarningModal.propTypes = {
  /* Flag indicating whether to show the warning modal */
  showWarning: PropTypes.bool.isRequired,
  /*  Event handler for the cancel button. */
  cancelHandler: PropTypes.func.isRequired,
  /* Event handler for the continue button. */
  continueHandler: PropTypes.func.isRequired,
};
