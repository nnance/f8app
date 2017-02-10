import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import EditorListView from '../components/EditorListView';

const clogs = [
  {
    title: 'abc',
    preview: 'http://localhost:8080/static/preview/g3456.png',
    category: 'D',
  },
  {
    title: 'abc',
    preview: 'http://localhost:8080/static/preview/g3456.png',
    category: 'D',
  },
  {
    title: 'abc',
    preview: 'http://localhost:8080/static/preview/g3456.png',
    category: 'D',
  },
  {
    title: 'abc',
    preview: 'http://localhost:8080/static/preview/g3456.png',
    category: 'D',
  },
  {
    title: 'abc',
    preview: 'http://localhost:8080/static/preview/g3456.png',
    category: 'D',
  },
];

const editors = [
  {
    profilePicture: 'http://localhost:8080/static/preview/g3456.png',
    name: 'im name',
    followingCount: 1234,
    clogCount: 1234,
    clogs,
  },
];

const Dump = () => <EditorListView category="D" editors={editors}/>;

const query = gql`
  query EditorListView {
    editors {
      ...EditorListView
    }
  }
  ${EditorListView.fragments.editor}
`;

const mapQueryToProps = ({ data }) => {
  const { loading } = data;
  return {
    editors: loading ? [] : data.editors,
  };
};

export default graphql(query, {
  props: mapQueryToProps,
})(EditorListView);
