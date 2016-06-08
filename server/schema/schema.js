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
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import Parse from 'parse/node';

const Page = Parse.Object.extend('Page');
const FAQ = Parse.Object.extend('FAQ');
const Session = Parse.Object.extend('Agenda');
const Speaker = Parse.Object.extend('Speakers');
const Notification = Parse.Object.extend('Notification');
const Map = Parse.Object.extend('Maps');

var USERS_SCHEDULE = {};

var F8FriendType = new GraphQLObjectType({
  name: 'Friend',
  description: 'Facebook friend',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    picture: {
      type: GraphQLString,
      resolve: (friend) => `https://graph.facebook.com/${friend.id}/picture`,
    },
    schedule: {
      type: new GraphQLList(F8SessionType),
      description: 'Friends schedule',
      resolve: (friend, args) => new Parse.Query(Session)
        .containedIn('objectId', Object.keys(friend.schedule))
        .find(),
    },
  })
});

function loadFriends(rootValue) {
  return Parse.Cloud.run('friends', {user: rootValue});
}

function loadFriendsAttending(rootValue, session) {
  const {id} = session;
  return Parse.Cloud.run('friends', {user: rootValue})
    .then(friends => friends.filter(friend => !!friend.schedule[id]));
}

var F8UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString,
    },
    friends: {
      type: new GraphQLList(F8FriendType),
      description: 'User friends who are also in the F8 app and enabled sharing',
      resolve: (user, args, {rootValue}) => loadFriends(rootValue),
    },
    notifications: {
      type: new GraphQLList(F8NotificationType),
      resolve: () => new Parse.Query(Notification).find(),
    },
    faqs: {
      type: new GraphQLList(F8FAQType),
      resolve: () => new Parse.Query(FAQ).find(),
    },
    pages: {
      type: new GraphQLList(F8PageType),
      resolve: () => new Parse.Query(Page).find(),
    },
    maps: {
      type: new GraphQLList(F8MapType),
      resolve: () => new Parse.Query(Map).find(),
    },
    config: {
      type: F8ConfigType,
      resolve: () => Parse.Config.get(),
    }
  })
});

var F8MapType = new GraphQLObjectType({
  name: 'Map',
  description: 'A place at F8 venue',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString,
      resolve: (map) => map.get('name'),
    },
    map: {
      type: GraphQLString,
      resolve: (map) => map.get('x1') && map.get('x1').url(),
    },
    x1url: {
      type: GraphQLString,
      resolve: (map) => map.get('x1') && map.get('x1').url(),
    },
    x2url: {
      type: GraphQLString,
      resolve: (map) => map.get('x2') && map.get('x2').url(),
    },
    x3url: {
      type: GraphQLString,
      resolve: (map) => map.get('x3') && map.get('x3').url(),
    },
  }),
});

var F8SessionType = new GraphQLObjectType({
  name: 'Session',
  description: 'Represents F8 agenda item',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString,
      resolve: (session) => session.get('sessionTitle'),
    },
    slug: {
      type: GraphQLString,
      resolve: (session) => session.get('sessionSlug'),
    },
    day: {
      type: GraphQLInt,
      resolve: (session) => session.get('day'),
    },
    startTime: {
      type: GraphQLFloat,
      resolve: (session) => session.get('startTime').getTime(),
    },
    endTime: {
      type: GraphQLFloat,
      resolve: (session) => session.get('endTime').getTime(),
    },
    location: {
      type: F8MapType,
      resolve: (session) => new Parse.Query(Map).equalTo('name', session.get('sessionLocation')).first(),
    },
    description: {
      type: GraphQLString,
      resolve: (session) => session.get('sessionDescription'),
    },
    speakers: {
      type: new GraphQLList(F8SpeakerType),
      resolve: (session) =>
        Promise.all((session.get('speakers') || []).map(speaker => speaker.fetch())),
    },
    isAdded: {
      type: GraphQLBoolean,
      description: 'If the session has been added to persons schedule',
      resolve: (session, args, {rootValue}) => {
        return !!USERS_SCHEDULE[session.id];
      },
    },
    friends: {
      type: new GraphQLList(F8FriendType),
      description: 'User\'s friends who attend this session',
      resolve: (session, args, {rootValue}) => loadFriendsAttending(rootValue, session),
    },
  })
});

var F8PageType = new GraphQLObjectType({
  name: 'Page',
  description: 'Facebook pages',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString,
      resolve: (page) => page.get('title'),
    },
    url: {
      type: GraphQLString,
      resolve: (page) => `https://www.facebook.com/${page.get('alias')}`,
    },
    logo: {
      type: GraphQLString,
      resolve: (page) => {
        const logo = page.get('logo');
        if (logo) {
          return logo.url();
        } else {
          return `https://graph.facebook.com/${page.get('alias')}/picture?type=large`;
        }
      }
    }
  })
});

var F8FAQType = new GraphQLObjectType({
  name: 'FAQ',
  description: 'Frequently asked questions',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    question: {
      type: GraphQLString,
      resolve: (faq) => faq.get('question'),
    },
    answer: {
      type: GraphQLString,
      resolve: (faq) => faq.get('answer'),
    }
  })
});

var F8SpeakerType = new GraphQLObjectType({
  name: 'Speaker',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString,
      resolve: (speaker) => speaker.get('speakerName'),
    },
    title: {
      type: GraphQLString,
      resolve: (speaker) => speaker.get('speakerTitle'),
    },
    picture: {
      type: GraphQLString,
      resolve: (speaker) => speaker.get('speakerPic') && speaker.get('speakerPic').url(),
    }
  })
});

var F8NotificationType = new GraphQLObjectType({
  name: 'Notification',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    text: {
      type: GraphQLString,
      resolve: (notification) => notification.get('text'),
    },
    url: {
      type: GraphQLString,
      resolve: (notification) => notification.get('url'),
    },
    time: {
      type: GraphQLFloat,
      description: 'Unix timestamp when the notification was sent.',
      resolve: (notification) => notification.get('createdAt').getTime(),
    }
  }),
});

var F8ConfigType = new GraphQLObjectType({
  name: 'Config',
  fields: () => ({
    wifiNetwork: {
      type: GraphQLString,
      resolve: (config) => config.get('wifiNetwork'),
    },
    wifiPassword: {
      type: GraphQLString,
      resolve: (config) => config.get('wifiPassword'),
    },
  }),
});

var F8QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    viewer: {
      type: F8UserType,
      resolve: (rootValue) => rootValue, // TODO: Authenticate user
    },
    schedule: {
      type: new GraphQLList(F8SessionType),
      description: 'F8 agenda',
      resolve: (user, args) => new Parse.Query(Session)
        .ascending('startTime')
        .find(),
    },
  }),
});

export var Schema = new GraphQLSchema({
  query: F8QueryType,
});
