import React from 'react';
import { render } from '@testing-library/react';
import { Nav } from '../Nav';
import { MemoryRouter } from 'react-router-dom';

describe('<Nav />', () => {
  it('should match the snapshot', () => {
    const logo = render(
      <MemoryRouter>
        <Nav collapsed />
      </MemoryRouter>,
    );
    expect(logo.container.firstChild).toMatchSnapshot();
  });
});
