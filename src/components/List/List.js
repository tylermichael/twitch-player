/* @flow */

import React, { Component } from 'react';

class List extends Component {
	render(): any {
		return <div className="channel-list-container">
			{this.props.children}
    </div>
	}
}

export default List;