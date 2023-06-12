import React from 'react';
import {render} from '@testing-library/react';
import ProgressIndicator from './ProgressIndicator';

describe('ProgressIndicator', () => {
  it('renders the progress bar with the correct percentage', () => {
    // Rendering the ProgressIndicator component with a percentage of 75
    const {getByRole, getByText} = render(
      <ProgressIndicator percentage={75} />
    );

    // Getting the filled progress bar element and the percentage text element
    const filledProgressBar = getByRole('progressbar');
    const percentageText = getByText('75%');

    // check if the elements are in the document
    expect(filledProgressBar).toBeInTheDocument();
    expect(percentageText).toBeInTheDocument();

    // Check the style of the filled progress bar
    expect(filledProgressBar).toHaveStyle(`
          width: 75%;
          background-color: green;
        `);
  });

  it('renders the progress bar as red when percentage is greater than 100', () => {
    const {getByRole} = render(<ProgressIndicator percentage={120} />);

    const filledProgressBar = getByRole('progressbar');

    expect(filledProgressBar).toHaveStyle(`
      width: 100%;
      background-color: red;
    `);
  });

  it('renders the progress bar as red when percentage is less than or equal to 0', () => {
    const {getByRole} = render(<ProgressIndicator percentage={120} />);

    const filledProgressBar = getByRole('progressbar');

    expect(filledProgressBar).toHaveStyle(`
      width: 100%;
      background-color: red;
    `);
  });
});
