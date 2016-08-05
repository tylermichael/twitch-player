/* @flow */

import React, { Component } from 'react';
import classnames from 'classnames';

class TabBody extends Component {
	render(): any {

    let { children, selected } = this.props;
    let container_list_props = {
      className: classnames({
        'channel-list-container__list': true,
        'channel-list-container__list--selected': selected
      })
    };

		return <div {...container_list_props}>{children}</div>
	}
}

export default TabBody;