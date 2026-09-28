import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ValidatedInput from './ValidatedInput';

describe('ValidatedInput Component (Exercise 4)', () => {
  const isNotEmpty = (val) => val.trim().length > 0;

  test('renders input without error class initially when valid', () => {
    render(
      <ValidatedInput
        validationFunction={() => true}
        errorMessage="Field cannot be empty"
        placeholder="Type name..."
      />
    );

    const input = screen.getByPlaceholderText('Type name...');
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveClass('error');
    expect(screen.queryByText('Field cannot be empty')).not.toBeInTheDocument();
  });

  test('validates input and shows error message when input fails validation', () => {
    render(
      <ValidatedInput
        validationFunction={isNotEmpty}
        errorMessage="Field cannot be empty"
        placeholder="Type name..."
      />
    );

    const input = screen.getByPlaceholderText('Type name...');

    // Type spaces
    fireEvent.change(input, { target: { value: '   ' } });

    expect(input).toHaveClass('error');
    expect(screen.getByText('Field cannot be empty')).toBeInTheDocument();

    // Type valid text
    fireEvent.change(input, { target: { value: 'Valid Text' } });

    expect(input).not.toHaveClass('error');
    expect(screen.queryByText('Field cannot be empty')).not.toBeInTheDocument();
  });
});
