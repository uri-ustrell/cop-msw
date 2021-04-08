import React from 'react';
import {
  render, screen, waitFor, waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// missing import

import App from './App';

test('List all guardians successfully', async () => {
  render(<App />);

  expect(screen.queryAllByTestId('guardiansList.item')).toHaveLength(0);

  userEvent.click(screen.getByText('List'));

  await waitFor(() => screen.getByTestId('guardiansList.item.1'));

  expect(screen.queryAllByTestId(/guardiansList\.item\../i)).toHaveLength(6);
});

test('Add a new guardian successfully', async () => {
  const name = 'John Smith';

  render(<App />);

  userEvent.type(screen.getByPlaceholderText(/Guardian to add or remove/i), name);
  userEvent.click(screen.getByText(/Add/i));

  await waitFor(() => screen.getByTestId('guardiansList.item.1'));

  expect(screen.getByText(name)).toBeDefined();
});

test('Remove an existing guardian successfully', async () => {
  const name = 'Roger';

  render(<App />);

  userEvent.click(screen.getByText(/List/i));

  await waitFor(() => screen.getByTestId('guardiansList.item.1'));

  userEvent.type(screen.getByPlaceholderText(/Guardian to add or remove/i), name);
  userEvent.click(screen.getByText(/Remove/i));

  await waitForElementToBeRemoved(() => screen.getByText(name));

  expect(screen.queryByText(name)).toBeNull();
});

test('Show an error when trying to add an empty guardian', async () => {
  render(<App />);

  userEvent.click(screen.getByText(/Add/i));

  await waitFor(() => screen.getByTestId('guardiansList.error'));

  expect(screen.queryByTestId('guardiansList.error')).toHaveTextContent('Error when trying to add a guardian: Guardian Name should be provided');
});

test('Show an error when trying to remove a non-existing guardian', async () => {
  render(<App />);

  userEvent.click(screen.getByText(/Remove/i));

  await waitFor(() => screen.getByTestId('guardiansList.error'));

  expect(screen.queryByTestId('guardiansList.error')).toHaveTextContent('Error when trying to remove a guardian: Guardian Name should be provided');
});

test('Show network error when trying to list all guardians', async () => {
  // missing runtime handler

  render(<App />);

  expect(screen.queryAllByTestId('guardiansList.item')).toHaveLength(0);

  userEvent.click(screen.getByText('List'));

  await waitFor(() => screen.getByTestId('guardiansList.error'));

  expect(screen.queryByTestId('guardiansList.error')).toHaveTextContent('Network request failed');
});
