/* @flow */

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';

import { ListItem } from '../List';
import { LoadingIndicator } from '../Icons';

@observer
class TabBody extends Component {
	render(): any {

    let { children, selected, UIStore, StreamStore, type } = this.props;
		let channels;
    let container_list_props = {
      className: classnames({
        'channel-list-container__list': true,
        'channel-list-container__list--selected': selected,
				'channel-list-container__list--secondary': UIStore.secondaryContent === 'games' && type === 'category'
      })
    };
		if(type === 'category') {
			channels = StreamStore.topStreamsForGame.map((stream: Object, index: Number): any =>
	      <ListItem
	        key={stream._id}
	        type="stream"
	        stream={stream}
	      />
	    );
		}

		return <div {...container_list_props}>
			<div className="channel-list-container__wrapper">
				<div className="channel-list-container__list__column channel-list-container__list-primary">
						{children}
				</div>
				{type === 'category' &&
				<div className='channel-list-container__list__column channel-list-container__list-secondary'>
					{UIStore.searchIsDoneLoading && channels || <LoadingIndicator />}
				</div>
				}
			</div>
		</div>
	}
}

export default TabBody;
