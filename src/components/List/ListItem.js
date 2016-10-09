import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';

@observer
class ListItem extends Component {

  constructor(props: Object, state: Object) {
    super(props, state);

    let methods = ['renderStream', 'renderGame', 'handleItemClick', 'handleStarClick'];
    methods.forEach((method: string) => {
      this[method] = this[method].bind(this);
    });
  }

  handleItemClick(type: string, event: Event) {
    event.preventDefault();
    let { handleListItemClick } = this.props;
    // if(type === 'stream') {
      // eslint-disable-next-line
      handleListItemClick && handleListItemClick();
    // }
  }

  handleStarClick(event: Object): Boolean {
    event.stopPropagation();
    let { handleFavoriteToggle, type } = this.props;
    this.props[type].favoriteToggle();
    handleFavoriteToggle();
    return false;
  }

  renderStream(): React.Element<{}> {
    let { stream } = this.props;
    let stream_item_props = {
      key: stream._id,
      className: classnames({
        'card': true,
        'card--favorite': stream.favorite
      }),
      onClick: this.handleItemClick.bind(null, 'stream')
    };
    let star_props = {
      onClick: this.handleStarClick,
      className: classnames({
        card__favorite: true
      })
    };

    return <div {...stream_item_props}>
      <div className="card__preview-link">
        <img src={stream.preview.medium +'?'+ +new Date()} className="card__stream-preview" />
        <div {...star_props}>☆</div>
      </div>
      <p className="card__status faux-link">
        {stream.channel.status}
      </p>
      <p className="card__info">
        {Number(stream.viewers).toLocaleString('en')} on <a href={stream.channel.url}>{stream.channel.display_name}</a> playing <a title={stream.channel.game} href={`http://twitch.tv/directory/game/${stream.channel.game}`}>{stream.channel.game}</a>
      </p>
    </div>
  }

  renderGame(): React.Element<{}> {
    let { game } = this.props;
    let game_item_props = {
      key: game._id,
      className: classnames({
        'card': true,
        'card--type-game': true,
        'card--favorite': game.favorite
      }),
      onClick: this.handleItemClick.bind(null, 'game')
    };
    let star_props = {
      onClick: this.handleStarClick,
      className: classnames({
        card__favorite: true
      })
    };
    // let GAME_URL = `http://twitch.tv/directory/game/${game.name}`;
    let GAME_NAME = game.name;
    return <div {...game_item_props}>
      <a className="card__preview-link">
        <img src={game.preview.replace('{width}', 140).replace('{height}', 196) +'?'+ +new Date()} className="card__preview" />
        <div {...star_props}>☆</div>
      </a>
      <p className="card__status faux-link">
        {GAME_NAME}
      </p>
      <p className="card__info">
        {Number(game.viewers).toLocaleString('en')} viewers
      </p>
    </div>
  }

  render(): any {
    let { type } = this.props;
    if(type === 'stream') {
      return this.renderStream();
    } else if(type === 'game') {
      return this.renderGame();
    }
  }
}

export default ListItem;
