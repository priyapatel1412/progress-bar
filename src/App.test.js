import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('renders ProgressBar component', () => {
    // Render the App component
    render(<App />);

    // Find the heading element with the name 'Progress Bar'
    const progressBarHeading = screen.getByRole('heading', {
      name: 'Progress Bar',
    });

    // Check that the progressBarHeading element is present in the document
    expect(progressBarHeading).toBeInTheDocument();
  });
});
