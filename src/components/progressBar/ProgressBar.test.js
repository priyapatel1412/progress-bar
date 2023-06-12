import '@testing-library/jest-dom';
import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  it('renders select options for progress bars', () => {
    // Render the ProgressBar component
    const {getByLabelText, getByText} = render(<ProgressBar />);

    // Get elements by label text and check if they are in the document
    const selectLabel = getByLabelText('Select Progress Bar:');
    const progressBar1Option = getByText('Progress Bar 1');
    const progressBar2Option = getByText('Progress Bar 2');
    const progressBar3Option = getByText('Progress Bar 3');

    expect(selectLabel).toBeInTheDocument();
    expect(progressBar1Option).toBeInTheDocument();
    expect(progressBar2Option).toBeInTheDocument();
    expect(progressBar3Option).toBeInTheDocument();
  });

  it('updates selected progress bar when option is changed', () => {
    // Render the ProgressBar component
    const {getByLabelText, getByRole} = render(<ProgressBar />);

    // Get elements by label text and role, and simulate change events
    const selectElement = getByLabelText('Select Progress Bar:');
    const progressBar1 = getByRole('option', {name: 'Progress Bar 1'});
    const progressBar2 = getByRole('option', {name: 'Progress Bar 2'});
    const progressBar3 = getByRole('option', {name: 'Progress Bar 3'});

    fireEvent.change(selectElement, {target: {value: '1'}});
    expect(progressBar1).toHaveAttribute('value', '1');

    fireEvent.change(selectElement, {target: {value: '2'}});
    expect(progressBar2).toHaveAttribute('value', '2');

    fireEvent.change(selectElement, {target: {value: '3'}});
    expect(progressBar3).toHaveAttribute('value', '3');
  });

  it('renders the correct number of progress bars', () => {
    // Render the ProgressBar component
    const {getAllByRole} = render(<ProgressBar />);

    // Get all elements by role and check the length
    const progressBars = getAllByRole('progressbar');

    expect(progressBars.length).toBe(3);
  });

  it('initializes progress bars with 0% progress', () => {
    // Render the ProgressBar component
    const {getAllByRole} = render(<ProgressBar />);

    // Get all elements by role and check the value attribute
    const progressBars = getAllByRole('progressbar');

    progressBars.forEach((progressBar) => {
      expect(progressBar.getAttribute('value')).toBe('0');
    });
  });

  it('stops the progress when "Stop" button is clicked', () => {
    // Render the ProgressBar component
    const {getByText, getAllByRole} = render(<ProgressBar />);

    // Get elements by text and role, simulate click event
    const stopButton = getByText('Stop');
    const progressBars = getAllByRole('progressbar');

    fireEvent.click(stopButton);

    progressBars.forEach((progressBar) => {
      expect(progressBar).toHaveAttribute('value', '0');
    });
  });

  it('shows a warning modal when "Stop" button is clicked', () => {
    const {getByText, queryByText} = render(<ProgressBar />);

    // Get element by text, simulate click event, and check if warning modal is present
    const stopButton = getByText('Stop');

    fireEvent.click(stopButton);

    const warningModal = queryByText(
      'If you press Continue this process can not be resumed!'
    );
    expect(warningModal).toBeInTheDocument();
  });

  it('resumes the progress when "Continue" button is clicked on the warning modal', () => {
    const {getByText, getAllByRole, queryByText} = render(<ProgressBar />);

    // Get element by text, simulate click event, and check progress bars and warning modal
    const stopButton = getByText('Stop');

    fireEvent.click(stopButton);

    const continueButton = getByText('Continue');
    fireEvent.click(continueButton);

    const progressBars = getAllByRole('progressbar');
    progressBars.forEach((progressBar) => {
      expect(progressBar).toHaveAttribute('value', '0');
    });

    const warningModal = queryByText(
      'If you press Continue this process can not be resumed!'
    );
    expect(warningModal).not.toBeInTheDocument();
  });

  it('cancels the progress stop when "Cancel" button is clicked on the warning modal', () => {
    const {getByText, getAllByRole, queryByText} = render(<ProgressBar />);

    const stopButton = getByText('Stop');

    fireEvent.click(stopButton);

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    const progressBars = getAllByRole('progressbar');

    progressBars.forEach((progressBar) => {
      // Set the progress bar to a non-zero value here
      progressBar.setAttribute('value', '50');
      expect(progressBar.getAttribute('value')).toBe('50');
    });

    const warningModal = queryByText(
      'If you press Continue this process can not be resumed!'
    );
    expect(warningModal).not.toBeInTheDocument();
  });
});
