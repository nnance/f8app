/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */


const Navigator = require('Navigator');
const ProfilePicture = require('../../common/ProfilePicture');
const React = require('React');
const EmptySchedule = require('./EmptySchedule');
const FilterSessions = require('./filterSessions');
const ListContainer = require('ListContainer');
const ScheduleListView = require('./ScheduleListView');

const { connect } = require('react-redux');

import type { Session } from '../../reducers/sessions';
import type { FriendsSchedule } from '../../reducers/friendsSchedules';

const { createSelector } = require('reselect');

type Props = {
  sessions: Array<Session>;
  friend: FriendsSchedule;
  navigator: Navigator;
};

class FriendsScheduleView extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
    this.renderEmptyList = this.renderEmptyList.bind(this);
  }

  render() {
    const backItem = {
      icon: require('../../common/img/back_white.png'),
      onPress: () => this.props.navigator.pop(),
    };
    const firstName = this.props.friend.name.split(' ')[0];
    return (
      <ListContainer
        title={`${firstName}'s Schedule`}
        parallaxContent={<ProfilePicture user={this.props.friend} size={100} />}
        backgroundImage={require('./img/schedule-background.png')}
        backgroundColor={'#5597B8'}
        selectedSectionColor="#51CDDA"
        leftItem={backItem}
      >
        <ScheduleListView
          title="Day 1"
          day={1}
          sessions={this.props.sessions}
          renderEmptyList={this.renderEmptyList}
          navigator={this.props.navigator}
        />
        <ScheduleListView
          title="Day 2"
          day={2}
          sessions={this.props.sessions}
          renderEmptyList={this.renderEmptyList}
          navigator={this.props.navigator}
        />
      </ListContainer>
    );
  }

  renderEmptyList(day) {
    return (
      <EmptySchedule
        title="Nothing to show."
        text={`${this.props.friend.name} has not added any sessions for day ${day}`}
      />
    );
  }
}

const data = createSelector(
  store => store.sessions,
  (store, props) => props.friend.schedule,
  (sessions, schedule) => FilterSessions.bySchedule(sessions, schedule),
);

function select(store, props) {
  return {
    sessions: data(store, props),
  };
}

module.exports = connect(select)(FriendsScheduleView);
