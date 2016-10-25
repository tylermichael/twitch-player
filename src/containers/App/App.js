/* global Twitch */

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import TwitchAPI from 'twitch-api-promise';

import SideBarDirectory from '../SideBarDirectory';

import StreamStore from '../../stores/StreamStore';
// import APIService from '../../services/APIService';
import AuthStore from '../../stores/AuthStore';
import UIStore from '../../stores/UIStore';

import './App.css';

TwitchAPI.init({ client_id: "hqzlo6eefvxru8861y7hsk6dpgniy8m" })
.then((status: Object) => {
  AuthStore.authenticated = status.authenticated;
})

let _StreamStore = new StreamStore(UIStore);

@observer
class App extends Component {
  state: Object;

  constructor(props: Object, state: Object) {
    super(props, state);

    this.state = {
      sideBarShown: true
    };

    let methods = ['onTwitchConnectClick', 'bindAndToggleValue'];

    methods.forEach((method: string) => {
      this[method] = this[method].bind(this);
    });
  }

  onTwitchConnectClick() {
    TwitchAPI.login()
    .then((status: Object) => {
			if(!status.authenticated && status.redirect_url) {
				console.log('redirecting...');
				window.location = status.redirect_url;
			}
      AuthStore.authenticated = status.authenticated;
    });
  }

  bindAndToggleValue(prop: string) {
    this.setState({[prop]: !this.state[prop]});
  }

  render(): any {
    let { sideBarShown } = this.state;
    let TwitchConnect_props = {
      className: classnames({
        'vertical-center': true,
        hidden: AuthStore.authenticated
      }),
      onClick: this.onTwitchConnectClick,
      id: 'twitch-connect',
      src: 'https://camo.githubusercontent.com/f1266002daa15b9aeeb5ab511afef6aa4faffdb5/687474703a2f2f7474762d6170692e73332e616d617a6f6e6177732e636f6d2f6173736574732f636f6e6e6563745f6c696768742e706e67'
    };

    let main_section_props = {
      className: classnames({
        'nav-collapsed': !sideBarShown
      }),
      id: 'main'
    };

    let pickChannelTextProps = {
      className: classnames({
        'no-channel-selected': true,
        'hidden': (AuthStore.authenticated && UIStore.currentChannel !== "") || !AuthStore.authenticated
      })
    };

    return <div>
      <SideBarDirectory shown={sideBarShown} StreamStore={_StreamStore} UIStore={UIStore} />
      <section {...main_section_props}>
        <div className="collapse-nav">
          <button onClick={this.bindAndToggleValue.bind(null, 'sideBarShown')}>Toggle Nav</button>
        </div>
        <div className='channel-viewer-container'>
          <img {...TwitchConnect_props} />
          <div {...pickChannelTextProps}>Pick a channel from the left</div>
          <iframe className='channel-viewer-container__player' id='js-video-player' src={UIStore.currentChannelPlayerURL()} frameBorder="0"></iframe>
          <iframe className="channel-viewer-container__chat" id='js-chat-container' src={UIStore.currentChannelChatURL()} frameBorder="0"></iframe>
        </div>
      </section>
    </div>
  }
}

export default App;
