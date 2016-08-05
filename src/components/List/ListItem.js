import React, { Component } from 'react';
import classnames from 'classnames';

class ListItem extends Component {
  
  constructor(props: Object, state: Object) {
    super(props, state);

    let methods = ['renderStream', 'renderGame', 'handleItemClick'];
    methods.forEach((method: string) => {
      this[method] = this[method].bind(this);
    });
  }

  handleItemClick(type: string, event: Event) {
    event.preventDefault();
    let { handleListItemClick } = this.props;
    if(type === 'stream') {
      // eslint-disable-next-line
      handleListItemClick && handleListItemClick();
    }
  }

  renderStream(): React.Element<{}> {
    let { stream } = this.props;
    let stream_item_props = {
      key: stream._id,
      className: classnames({
        'card': true,
        'card--favorite': stream.isFavorited
      }),
      onClick: this.handleItemClick.bind(null, 'stream')
    };
    return <div {...stream_item_props}>
      <div className="card__preview-link">
        <img src={stream.preview.medium} className="card__stream-preview" />
        <div className="card__favorite">☆</div>
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
      key: game.game._id,
      className: classnames({
        'card': true,
        'card--type-game': true,
        'card--favorite': game.isFavorited
      }),
      onClick: this.handleItemClick.bind(null, 'game')
    };
    let GAME_URL = `http://twitch.tv/directory/game/${game.game.name}`;
    let GAME_NAME = game.game.name;
    return <div {...game_item_props}>
      <a className="card__preview-link" href={GAME_URL}>
        <img src={game.game.box.template.replace('{width}', 140).replace('{height}', 196)} className="card__preview" />
        <div className="card__favorite">☆</div>
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







// {
//   "game": {
//     "name": "League of Legends",
//     "popularity": 77120,
//     "_id": 21779,
//     "giantbomb_id": 24024,
//     "box": {
//       "large": "https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-272x380.jpg",
//       "medium": "https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-136x190.jpg",
//       "small": "https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-52x72.jpg",
//       "template": "https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg"
//     },
//     "logo": {
//       "large": "https://static-cdn.jtvnw.net/ttv-logoart/League%20of%20Legends-240x144.jpg",
//       "medium": "https://static-cdn.jtvnw.net/ttv-logoart/League%20of%20Legends-120x72.jpg",
//       "small": "https://static-cdn.jtvnw.net/ttv-logoart/League%20of%20Legends-60x36.jpg",
//       "template": "https://static-cdn.jtvnw.net/ttv-logoart/League%20of%20Legends-{width}x{height}.jpg"
//     },
//     "_links": {}
//   },
//   "viewers": 77409,
//   "channels": 1280
// }