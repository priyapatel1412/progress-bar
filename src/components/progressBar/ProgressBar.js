import React, {useState, useRef} from 'react';
import styled from 'styled-components';
import {rgba} from 'polished';
import ProgressIndicator from '../controls/ProgressIndicator';
import {dark, slate, white, green} from '../../common/palette';
import Button from '../controls/Button';
import WarningModal from '../model/WarningModal';

// Styled components
const StyledSection = styled.div`
  border: 1px solid ${rgba(dark, 0.7)};
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${slate};
  overflow: hidden;
`;

const Container = styled.div`
  color: ${white};
  background-color: ${rgba(dark, 0.7)};
  position: relative;
  border-radius: 6px;
  box-shadow: 0 1px 1px 0 ${rgba(dark, 0.3)};
  padding: 80px;

  @media (max-width: 414px) {
    padding: 10px;
  }
`;

const StyledHeading = styled.h1`
  display: flex;
  justify-content: center;
  color: ${green};
`;

const StyledSelect = styled.select`
  width: 50%;
  padding: 2px;
  margin-left: 5px;
  margin-bottom: 10px;
  border-radius: 4px;
  font-size: 15px;

  @media (max-width: 768px) {
    width: 40%;
  }
`;

const StylesButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  & > * {
    margin-right: 10px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

export default function ProgressBar() {
  const [progressBars, setProgressBars] = useState([
    {id: 1, percentage: 0},
    {id: 2, percentage: 0},
    {id: 3, percentage: 0},
  ]);

  const [selectedProgressBar, setSelectedProgressBar] = useState(1);
  const [showWarning, setShowWarning] = useState(false);

  // Reference for the selected progress bar
  const progressBarRef = useRef(selectedProgressBar);

  // Event handler for the progress bar selection change
  const handleProgressBarChange = () => {
    const selectedValue = progressBarRef.current.value;
    setSelectedProgressBar(Number(selectedValue));
  };

  // Event handler for button clicks to update progress
  const handleButtonClick = (value) => {
    setProgressBars((prevBars) =>
      prevBars.map((progressBar) => {
        if (progressBar.id === selectedProgressBar) {
          const newPercentage = progressBar.percentage + value;
          return {
            ...progressBar,
            percentage: Math.max(0, newPercentage), // Update the percentage property with a non-negative value
          };
        }
        return progressBar;
      })
    );
  };

  // Event handler for the "Stop" button click
  const handleStopClick = () => {
    setShowWarning(true);
  };

  // Event handler for the "Continue" button click in the warning modal
  const handleContinueClick = () => {
    setShowWarning(false);
    setProgressBars((prevBars) =>
      prevBars.map((progressBar) => ({
        ...progressBar,
        percentage: 0,
      }))
    );
  };

  // Event handler for the "Cancel" button click in the warning modal
  const handleCancelClick = () => {
    setShowWarning(false);
  };

  // Available percentage options for buttons
  const percentageOptions = ['-25', '-10', '+10', '+25'];

  return (
    <StyledSection>
      <Container>
        <StyledHeading>Progress Bar</StyledHeading>
        <div>
          <label htmlFor="progressBarSelect">Select Progress Bar:</label>
          <StyledSelect
            ref={progressBarRef}
            id="progressBarSelect"
            onChange={handleProgressBarChange}
            value={selectedProgressBar}
          >
            {progressBars.map((bar) => (
              <option key={bar.id} value={bar.id}>
                Progress Bar {bar.id}
              </option>
            ))}
          </StyledSelect>
        </div>

        {/* Render progress indicators for each progress bar */}
        {progressBars.map((bar) => (
          <ProgressIndicator key={bar.id} percentage={bar.percentage} />
        ))}

        {/* Render buttons for each percentage option and assign a click handler */}
        <StylesButtonContainer>
          {percentageOptions.map((percentage) => (
            <Button
              key={percentage}
              buttonClickHandler={() => handleButtonClick(Number(percentage))}
            >
              {percentage}
            </Button>
          ))}

          <Button buttonClickHandler={handleStopClick} stopButton>
            Stop
          </Button>
        </StylesButtonContainer>
        {/* Render Warning Modal on stop button click */}
        {showWarning && (
          <WarningModal
            showWarning
            cancelHandler={handleCancelClick}
            continueHandler={handleContinueClick}
          />
        )}
      </Container>
    </StyledSection>
  );
}
