import { render } from '@testing-library/react';
import Loader from '.';

test('Render Loader succesfully', () => {
  const view = render(<Loader />);

  expect(view).toBeDefined();
})