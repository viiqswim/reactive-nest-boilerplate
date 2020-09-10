import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { AppLayout } from '../index';

const shallowRenderer = createRenderer();

describe('<AppLayout />', () => {
  it('should match snapshot', () => {
    shallowRenderer.render(<AppLayout children={<span>hello</span>} />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
