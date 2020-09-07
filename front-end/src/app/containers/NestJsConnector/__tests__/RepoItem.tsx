import React from 'react';
import { render } from '@testing-library/react';
import { RepoItem } from '../RepoItem';

const renderRepoItem = (props: Parameters<typeof RepoItem>[number]) =>
  render(<RepoItem {...props} />);

describe('<RepoItem />', () => {
  it('should match the snapshot', () => {
    const userItem = renderRepoItem({
      name: 'test',
    });
    expect(userItem.container.firstChild).toMatchSnapshot();
  });

  it('should have props displayed', () => {
    const name = 'test';
    const userItem = renderRepoItem({
      name: name,
    });
    expect(userItem.queryByText(name)).toBeInTheDocument();
  });
});
