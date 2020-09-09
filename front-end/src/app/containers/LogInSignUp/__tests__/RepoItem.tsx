import React from 'react';
import { render } from '@testing-library/react';
import { UserItem } from '../UserItem';

const renderUserItem = (props: Parameters<typeof UserItem>[number]) =>
  render(<UserItem {...props} />);

describe('<UserItem />', () => {
  it('should match the snapshot', () => {
    const userItem = renderUserItem({
      name: 'test',
    });
    expect(userItem.container.firstChild).toMatchSnapshot();
  });

  it('should have props displayed', () => {
    const name = 'test';
    const userItem = renderUserItem({
      name: name,
    });
    expect(userItem.queryByText(name)).toBeInTheDocument();
  });
});
