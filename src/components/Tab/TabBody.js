/* @flow */

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';

import { ListItem } from '../List';
import { LoadingIndicator } from '../Icons';

import './TabBody.scss';

@observer
class TabBody extends Component {

	handleListItemClick = (type: string, symbol: string) => {
		this.props.UIStore.currentChannel = symbol;
	}

	render(): any {

    let { children, selected, UIStore, StreamStore, type } = this.props;
		let channels;

    let container_list_props = {
      className: classnames({
        'lc__body': true,
        'lc__body--selected': selected,
				'lc__body--multi-view': type === 'category',
				'lc__body--view-secondary': UIStore.secondaryContent === 'games' && type === 'category'
      })
    };

		if(type === 'category') {
			channels = StreamStore.topStreamsForGame.map((stream: Object, index: Number): any =>
	      <ListItem
	        key={stream._id}
	        handleListItemClick={this.handleListItemClick.bind(null, 'stream', stream.channel.name)}
	        type="stream"
	        stream={stream}
	      />
	    );
		}
		return <div {...container_list_props}>
			<div className="lc__body__column lc__body--primary">
					{children}
			</div>
			{type === 'category' &&
			<div className='lc__body__column lc__body--secondary'>
				{UIStore.searchIsDoneLoading && channels || <div className='lc__body__loading-container'><LoadingIndicator /></div>}
			</div>
			}
		</div>
	}
}

export default TabBody;
