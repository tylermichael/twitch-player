import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';

import { ListItem } from '../../components/List';
import { TabBody } from '../../components/Tab';

import './SideBarDirectory.scss'

@observer
class SideBarDirectory extends Component {
  constructor(props: Object, state: Object) {
    super(props, state);

    let methods = ['handleRefreshClick', 'handleCategoryClick', 'handleListItemClick', 'handleFavoriteToggle'];
    methods.forEach((method: string) => {
      this[method] = this[method].bind(this);
    });
  }

  handleRefreshClick() {
    this.props.StreamStore.getFollowed();
    this.props.StreamStore.getGames();
    this.props.StreamStore.getTopStreams();
  }

  handleCategoryClick(category: string) {
    this.props.UIStore.view = category;
  }

  handleListItemClick(type: string, symbol: string) {
    switch (type) {
      case 'stream':
        this.props.UIStore.currentChannel = symbol;
        break;
      case 'game':
        this.props.UIStore.secondaryContent = 'games';
        this.props.UIStore.topGameSearchTerm = symbol;
        break;
      default:
        break;
    }
  }

  handleFavoriteToggle(type: string, id: number) {
    this.props.StreamStore.favoriteToggle(type, id);
  }

  render(): any {
    let { StreamStore, UIStore, shown } = this.props;

    if(!UIStore.isDoneLoading) {
      return <div>Loading...</div>
    }

    let streams = StreamStore.followed.map((stream: Object, index: Number): any =>
      <ListItem
        key={stream._id}
        handleFavoriteToggle={this.handleFavoriteToggle.bind(null, 'channel', stream.channel._id)}
        handleListItemClick={this.handleListItemClick.bind(null, 'stream', stream.channel.name)}
        type="stream"
        stream={stream}
      />
    );
    let games = StreamStore.games.map((game: Object, index: Number): any =>
      <ListItem
        key={index}
        handleFavoriteToggle={this.handleFavoriteToggle.bind(null, 'game', game._id)}
        handleListItemClick={this.handleListItemClick.bind(null, 'game', game.name)}
        type="game"
        game={game}
      />
    );
    let topStreams = StreamStore.topStreams.map((stream: Object, index: Number): any =>
      <ListItem
        key={index}
        handleListItemClick={this.handleListItemClick.bind(null, 'stream', stream.channel.name)}
        type="stream"
        stream={stream}
      />
    );

    let categories = ['followed', 'games', 'top'];
    let category_props = categories.map((category: string): Object => {
      return {
        onClick: this.handleCategoryClick.bind(null, category),
        className: classnames({
          'grid-1-3': true,
          'channel-list-container__top-button': true,
          selected: UIStore.view === category
        })
      }
    });

    let channel_list_container_props = {
      className: classnames({
        'channel-list-container': true,
        'channel-list-container--hidden': !shown
      })
    };

    let back_button_props = {
      onClick: (_: any) => {
        UIStore.secondaryContent = "";
        setTimeout((_: any) => {
          UIStore.topGameSearchTerm = "";
          StreamStore.topStreamsForGame = [];
        }, 600);
      },
      className: 'channel-list-container__top-center'
    };

    return <div {...channel_list_container_props}>
      <div className="channel-list-container__choices">
        <div className="container">
          <div className="row">
            <div {...category_props[0]}>Followed</div>
            <div {...category_props[1]}>Games</div>
            <div {...category_props[2]}>Top</div>
          </div>
        </div>
        <div className='channel-list-container__top-center' onClick={this.handleRefreshClick}>REFRESH</div>
        {UIStore.secondaryContent === "games" && <div {...back_button_props}>BACK</div>}
      </div>
      <TabBody selected={UIStore.view === 'followed'} type="listings" UIStore={UIStore}>
        {streams}
      </TabBody>
      <TabBody selected={UIStore.view === 'games'} type="category" StreamStore={StreamStore} UIStore={UIStore}>
        {games}
      </TabBody>
      <TabBody selected={UIStore.view === 'top'} type="listings" UIStore={UIStore}>
        {topStreams}
      </TabBody>
    </div>
  }
}

export default SideBarDirectory;
