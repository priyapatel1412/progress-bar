import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Button from './Button';
import {red, white, yellow, dark} from '../../common/palette';

describe('Button', () => {
  // Setting up a mock function to be used as the button click handler
  const buttonClickHandler = jest.fn();

  it('renders the button with default props', () => {
    // Rendering the Button component with the provided props
    const {getByText} = render(
      <Button buttonClickHandler={buttonClickHandler}>Click Me</Button>
    );

    // Getting the button element by its text content
    const button = getByText('Click Me');

    // button element should be in the document
    expect(button).toBeInTheDocument();
    // button element should have the expected styles
    expect(button).toHaveStyle(`
      background-color: ${yellow};
      color: ${dark};
    `);
  });

  it('renders the button as a stop button', () => {
    const {getByText} = render(
      <Button buttonClickHandler={buttonClickHandler} stopButton>
        Stop
      </Button>
    );

    const button = getByText('Stop');

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle(`
      background-color: ${red};
      color: ${white};
    `);
  });

  it('renders the button with percentage value', () => {
    const {getByText} = render(
      <Button buttonClickHandler={buttonClickHandler}>+10%</Button>
    );

    // Getting the button element by its text content
    const button = getByText('+10%');

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle(`
        background-color: ${yellow};
        color: ${dark};
    `);
  });

  it('calls the buttonClickHandler when the button is clicked', () => {
    const buttonClickHandler = jest.fn();
    const {getByText} = render(
      <Button buttonClickHandler={buttonClickHandler}>Click Me</Button>
    );

    const button = getByText('Click Me');
    // Simulating a click event on the button
    fireEvent.click(button);

    // buttonClickHandler should have been called
    expect(buttonClickHandler).toHaveBeenCalled();
  });
});
