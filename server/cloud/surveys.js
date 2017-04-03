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

const Agenda = Parse.Object.extend('Agenda');
const Attendance = Parse.Object.extend('Attendance');
const Survey = Parse.Object.extend('Survey');
const SurveyResult = Parse.Object.extend('SurveyResult');

function sendSurveys(attendees, survey, session) {
  if (!survey) {
    throw new Error(`Survey not found for session ${session.id}`);
  }

  console.log(`Found ${attendees.length} attendees`);
  return Parse.Promise.when(attendees.map((record) => {
    const user = record.get('user');
    return new SurveyResult().save({
      user,
      survey,
    }).then(() => Parse.Push.send({
      where: new Parse.Query(Parse.Installation).equalTo('user', user),
      data: {
        badge: 'Increment',
        alert: `Please rate "${session.get('sessionTitle')}"`,
        e: true, // ephemeral
      },
    })).then(() => record.save({ sent: true }));
  })).then(function () {
    return arguments.length;
  });
}

function toSurveys(emptyResults) {
  return emptyResults.map((emptyResult) => {
    const survey = emptyResult.get('survey');

    const questions = [];
    if (survey.get('q1')) {
      questions.push({
        text: survey.get('q1'),
        lowLabel: 'Not at all',
        highLabel: 'Very useful',
      });
    }

    if (survey.get('q2')) {
      questions.push({
        text: survey.get('q2'),
        lowLabel: 'Not likely',
        highLabel: 'Very likely',
      });
    }

    return {
      id: emptyResult.id,
      sessionId: survey.get('session').id,
      questions,
    };
  });
}

Parse.Cloud.define('send_surveys', (request, response) => {
  if (request.master) {
    Parse.Cloud.useMasterKey();
  } else {
    response.error('Need master key');
    return;
  }

  const sessionId = request.params.sessionId;
  if (!sessionId) {
    response.error('Need sessionId');
    return;
  }

  console.log(`Fetching attendees for ${sessionId}`);
  const agenda = new Agenda({ id: sessionId });
  const attendees = new Parse.Query(Attendance)
    .equalTo('agenda', agenda)
    .notEqualTo('sent', true)
    .find();
  const survey = new Parse.Query(Survey)
    .equalTo('session', agenda)
    .first();

  Parse.Promise.when(attendees, survey, new Parse.Query(Agenda).get(sessionId))
    .then(sendSurveys)
    .then(
      (value) => { response.success(value); },
      (error) => { response.error(error); },
    );
});

Parse.Cloud.define('surveys', (request, response) => {
  Parse.Cloud.useMasterKey();

  const user = request.user;
  if (!user) {
    response.success([]);
    return;
  }

  new Parse.Query(SurveyResult)
    .equalTo('user', user)
    .equalTo('rawAnswers', null)
    .include('survey')
    .include('survey.session')
    .find()
    .then(toSurveys)
    .then(
      (value) => { response.success(value); },
      (error) => { response.error(error); },
    );
});

Parse.Cloud.define('submit_survey', (request, response) => {
  Parse.Cloud.useMasterKey();

  const user = request.user;
  if (!user) {
    response.error({ message: 'Not logged in' });
    return;
  }

  const params = request.params;
  if (!params.id || !params.answers) {
    response.error({ message: 'Need id and answers' });
    return;
  }

  new Parse.Query(SurveyResult)
    .equalTo('user', user)
    .equalTo('objectId', params.id)
    .find()
    .then((results) => {
      if (results.length === 0) {
        throw new Error('No user/id combination found');
      }
      return results[0].save({
        a1: params.answers[0],
        a2: params.answers[1],
        rawAnswers: JSON.stringify(params.answers),
      });
    })
    .then(
      (value) => { response.success(value); },
      (error) => { response.error(error); },
    );
});
