import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '.';

test('Render Modal succesfully', () => {
  const handleClose = jest.fn();

  render(<Modal open={true} handleClose={handleClose} title='title'>content</Modal>);

  expect(screen.getByTestId("modal")).toBeInTheDocument();
  expect(screen.getByTestId("modal-title")).toHaveTextContent("title");
  expect(screen.getByTestId("modal-content")).toHaveTextContent("content");

  userEvent.click(screen.getByTestId("modal-close"));

  expect(handleClose).toHaveBeenCalled();
})

test('not render Modal', () => {
  render(<Modal open={false}></Modal>);

  expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
})