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
 */


/* global Parse */

function fetchSchedule(user) {
  if (!user.get('sharedSchedule')) {
    return Parse.Promise.as(null);
  }
  // https://www.parse.com/questions/can-i-use-include-in-a-query-to-include-all-members-of-a-parserelation-error-102
  return user.relation('mySchedule').query().find().then(
    (sessions) => {
      const schedule = {};
      sessions.forEach((session) => {
        schedule[session.id] = true;
      });
      return {
        id: user.get('facebook_id'),
        name: user.get('name'),
        schedule,
      };
    },
  );
}

Parse.Cloud.define('friends', (request, response) => {
  Parse.Cloud.useMasterKey();

  const user = request.user;
  if (!user) {
    response.success([]);
    return;
  }
  if (!Parse.FacebookUtils.isLinked(user)) {
    response.error('Current user is not linked to Facebook');
    return;
  }

  const authData = user.get('authData');
  const token = authData.facebook.access_token;
  // TODO: Fetch all friends using paging
  Parse.Cloud.httpRequest({
    url: `https://graph.facebook.com/me/friends?fields=id&access_token=${token}`,
  }).then(
    (res) => {
      const friendIds = res.data.data.map(friend => friend.id);

      const query = new Parse.Query(Parse.User)
        .containedIn('facebook_id', friendIds);

      return query.find().then(
        users => Parse.Promise.when(users.map(fetchSchedule)),
      ).then(
        (...friends) => {
          // Parse Cloud Code and Parse Server have slightly different behavior
          // of Parse.Promise.when
          let args = friends[0];
          if (friends.length === 1 && Array.isArray(friends[0])) {
            args = friends[0];
          }
          return Array.prototype.filter.call(args, friend => friend !== null);
        },
      );
    },
  ).then(
    (value) => { response.success(value); },
    (error) => { response.error(error); },
  );
});
