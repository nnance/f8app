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

const ListView = require('ListView');
const Dimensions = require('Dimensions');
const Platform = require('Platform');
const StyleSheet = require('StyleSheet');
const React = require('React');
const View = require('View');

type Rows = Array<Object>;
type RowsAndSections = {
  [sectionID: string]: Object;
};

export type Data = Rows | RowsAndSections;
type RenderElement = () => ?ReactElement;

type Props = {
  data: ?Data;
  renderEmptyList?: ?RenderElement;
  minContentHeight: number;
  contentInset: { top: number; bottom: number; };
};

// FIXME: Android has a bug when scrolling ListView the view insertions
// will make it go reverse. Temporary fix - pre-render more rows
const LIST_VIEW_PAGE_SIZE = Platform.OS === 'android' ? 1 : 1;

function cloneWithData(dataSource: ListView.DataSource, data: ?Data) {
  if (!data) {
    return dataSource.cloneWithRows([]);
  }
  if (Array.isArray(data)) {
    return dataSource.cloneWithRows(data);
  }
  return dataSource.cloneWithRowsAndSections(data);
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#eeeeee',
    height: 1,
  },
});

class PureListView extends React.Component {
  constructor(props: Props) {
    super(props);
    const dataSource = new ListView.DataSource({
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      contentHeight: 0,
      dataSource: cloneWithData(dataSource, props.data),
    };

    this.renderFooter = this.renderFooter.bind(this);
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        dataSource: cloneWithData(this.state.dataSource, nextProps.data),
      });
    }
  }

  onContentSizeChange(contentWidth: number, contentHeight: number) {
    if (contentHeight !== this.state.contentHeight) {
      this.setState({ contentHeight });
    }
  }
  getScrollResponder(): any {
    return this.listView.getScrollResponder();
  }

  scrollTo(...args: Array<any>) {
    this.listView.scrollTo(...args);
  }

  props: Props;

  renderFooter(): ?ReactElement {
    if (this.state.dataSource.getRowCount() === 0) {
      return this.props.renderEmptyList && this.props.renderEmptyList();
    }

    return this.props.renderFooter && this.props.renderFooter();
  }

  render() {
    const { contentInset } = this.props;
    const bottom = contentInset.bottom +
      Math.max(0, this.props.minContentHeight - this.state.contentHeight);
    return (
      <ListView
        initialListSize={1}
        pageSize={LIST_VIEW_PAGE_SIZE}
        {...this.props}
        ref={
          (node) => {
            this.listView = node;
          }
        }
        dataSource={this.state.dataSource}
        renderFooter={this.renderFooter}
        contentInset={{ bottom, top: contentInset.top }}
        onContentSizeChange={this.onContentSizeChange}
      />
    );
  }
}

PureListView.defaultProps = {
  data: [],
  contentInset: { top: 0, bottom: 0 },
  // TODO: This has to be scrollview height + fake header
  minContentHeight: Dimensions.get('window').height + 20,
  renderSeparator: (sectionID, rowID) => <View style={styles.separator} key={rowID} />,
  renderEmptyList: null,
};

module.exports = PureListView;
