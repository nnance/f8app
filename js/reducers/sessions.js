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

'use strict';

const createApolloReducer = require('./createApolloReducer');

export type Speaker = {
  id: string;
  bio: string;
  name: string;
  pic: string;
  title: string;
};

export type Session = {
  id: string;
  day: number;
  allDay: boolean;
  title: string;
  description: string;
  hasDetails: boolean;
  slug: string;
  speakers: Array<Speaker>;
  onMySchedule: boolean;
  tags: Array<string>;
  startTime: number;
  endTime: number;
  map: ?string;
  location: ?string;
};

function reducer(action: Object): Session[] {
  return action.data.schedule.map(session => {
    return {
      id: session.id,
      day: session.day,
      allDay: session.allDay,
      title: session.title,
      description: session.description,
      hasDetails: session.hasDetails,
      slug: session.slug,
      onMySchedule: session.isAdded,
      tags: session.tags,
      startTime: session.startTime, // start time
      endTime: session.endTime, // end time
      map: session.location.x1url,
      location: session.location.name,
      speakers: session.speakers.map(speaker => {
        return {
          id: speaker.id,
          bio: '',
          name: speaker.name,
          pic: speaker.picture,
          title: speaker.title,
        };
      }),
    };
  });
}

module.exports = createApolloReducer('LOADED_SESSIONS', reducer);
