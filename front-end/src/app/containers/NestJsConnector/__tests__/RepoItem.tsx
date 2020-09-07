import React from 'react';
import { render } from '@testing-library/react';
import { RepoItem } from '../RepoItem';

const renderRepoItem = (props: Parameters<typeof RepoItem>[number]) =>
  render(<RepoItem {...props} />);

describe('<RepoItem />', () => {
  it('should match the snapshot', () => {
    const repoItem = renderRepoItem({
      name: 'test',
    });
    expect(repoItem.container.firstChild).toMatchSnapshot();
  });

  it('should have props displayed', () => {
    const name = 'test';
    const repoItem = renderRepoItem({
      name: name,
    });
    expect(repoItem.queryByText(name)).toBeInTheDocument();
  });
});
