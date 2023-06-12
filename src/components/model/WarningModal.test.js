import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import WarningModal from './WarningModal';

describe('WarningModal', () => {
  let cancelHandler;
  let continueHandler;

  beforeEach(() => {
    // Create mock functions for cancel and continue handlers
    cancelHandler = jest.fn();
    continueHandler = jest.fn();
  });

  it('rers the modal when showWarning is true', () => {
    // Render the WarningModal component with showWarning set to true and handlers
    const {getByText} = render(
      <WarningModal
        showWarning={true}
        cancelHandler={cancelHandler}
        continueHandler={continueHandler}
      />
    );

    // Get elements by text and check if they are in the document
    const warningText = getByText('Warning!!');
    const continueButton = getByText('Continue');
    const cancelButton = getByText('Cancel');

    expect(warningText).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('does not render the modal when showWarning is false', () => {
    // Render the WarningModal component with showWarning set to false and handlers
    const {queryByText} = render(
      <WarningModal
        showWarning={false}
        cancelHandler={cancelHandler}
        continueHandler={continueHandler}
      />
    );

    // Get elements by text and check if they are not in the document
    const warningText = queryByText('Warning!!');
    const continueButton = queryByText('Continue');
    const cancelButton = queryByText('Cancel');

    expect(warningText).not.toBeInTheDocument();
    expect(continueButton).not.toBeInTheDocument();
    expect(cancelButton).not.toBeInTheDocument();
  });

  it('calls the cancelHandler when Cancel button is clicked', () => {
    // Render the WarningModal component with showWarning set to true and handlers
    const {getByText} = render(
      <WarningModal
        showWarning={true}
        cancelHandler={cancelHandler}
        continueHandler={continueHandler}
      />
    );

    // Get the Cancel button by text and simulate a click event
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(cancelHandler).toHaveBeenCalled();
  });

  it('calls the continueHandler when Continue button is clicked', () => {
    // Render the WarningModal component with showWarning set to true and handlers
    const {getByText} = render(
      <WarningModal
        showWarning={true}
        cancelHandler={cancelHandler}
        continueHandler={continueHandler}
      />
    );

    // Get the Continue button by text and simulate a click event
    const continueButton = getByText('Continue');
    fireEvent.click(continueButton);

    expect(continueHandler).toHaveBeenCalled();
  });
});
