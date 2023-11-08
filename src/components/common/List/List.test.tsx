import { render, screen } from '@testing-library/react';
import List from '.';

test('Render List succesfully', () => {
  const view = render(<List items={['1', '2', '3']} content={(item) => item} />);

  expect(screen.getByTestId("list")).toBeInTheDocument();
  expect(screen.getAllByTestId("listitem")).toHaveLength(3);
  expect(screen.getAllByTestId("listitem")[0]).toHaveTextContent("1");
  expect(screen.getAllByTestId("listitem")[1]).toHaveTextContent("2");
  expect(screen.getAllByTestId("listitem")[2]).toHaveTextContent("3");
})