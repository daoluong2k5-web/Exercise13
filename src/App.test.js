import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Exercise 13 header and tabs', () => {
  render(<App />);
  const headerElement = screen.getByText(/Exercise 13: React Hook \(useEffect\)/i);
  expect(headerElement).toBeInTheDocument();
  expect(screen.getByText('All Exercises')).toBeInTheDocument();
  expect(screen.getByText('1. UserPosts (API Fetch)')).toBeInTheDocument();
  expect(screen.getByText('2. CountdownTimer')).toBeInTheDocument();
  expect(screen.getByText('3. WindowSize (Resize)')).toBeInTheDocument();
  expect(screen.getByText('4. ValidatedInput')).toBeInTheDocument();
});
