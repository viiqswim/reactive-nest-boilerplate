import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import { TestPage } from '..';

const shallowRenderer = createRenderer();

describe('<TestPage />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<TestPage />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
