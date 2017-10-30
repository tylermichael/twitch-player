import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';

import { ListItem } from '../../components/List';
import { TabBody } from '../../components/Tab';

import './SideBarDirectory.scss';

@observer
class SideBarDirectory extends Component {
  handleRefreshClick = _ => {
    this.props.StreamStore.getFollowed();
    this.props.StreamStore.getGames();
    this.props.StreamStore.getTopStreams();
  }
  handleCategoryClick = (category: string) => {
    let { StreamStore, UIStore } = this.props;
    if (category !== "games" || this.props.UIStore.view !== "games") {
      UIStore.secondaryContent = "";
      UIStore.topGameSearchTerm = "";
      StreamStore.topStreamsForGame = [];
    }
    this.props.UIStore.view = category;
  }
  handleListItemClick = (type: string, symbol: string) => {
    switch (type) {
      case 'stream':
        this.props.UIStore.currentChannel = symbol;
        break;
      case 'game':
        this.props.UIStore.secondaryContent = 'games';
        this.props.UIStore.topGameSearchTerm = symbol;
        this.props.StreamStore.getTopStreamsForGame();
        break;
      default:
        break;
    }
  }
  handleFavoriteToggle = (type: string, id: number) => {
    this.props.StreamStore.favoriteToggle(type, id);
  }
  render(): any {
    let { StreamStore, UIStore, shown } = this.props;
    if (!UIStore.isDoneLoading) {
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
          'lc__button': true,
          selected: UIStore.view === category
        })
      }
    });
    let channel_list_container_props = {
      className: classnames({
        'lc': true,
        'lc--hidden': !shown
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
      className: 'lc__button'
    };

    return <div {...channel_list_container_props}>
      <div className="SideBarDirectory__tabs">
        <div className="container">
          <div className="row">
            <div className="lc__categories">
              <div {...category_props[0]}>Followed</div>
              <div {...category_props[1]}>Games</div>
              <div {...category_props[2]}>Top</div>
            </div>
          </div>
        </div>
      </div>
      <div className='lc__button' onClick={this.handleRefreshClick}>REFRESH</div>
      {UIStore.secondaryContent === "games" && <div {...back_button_props}>BACK</div>}
      <div className="SideBarDirectory__body">
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
    </div>
  }
}

export default SideBarDirectory;
