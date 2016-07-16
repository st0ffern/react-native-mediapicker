import React,{Component} from 'react'
import {
  CameraRoll
  ,Platform
  ,StyleSheet
  ,View
  ,Text
  ,Dimensions
  ,ListView
  ,ActivityIndicator
} from 'react-native'

import SGListView from 'react-native-sglistview'
import MediaItem from './MediaItem'

class MediaPicker extends Component{
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selected: [],
      loadingImages: [],
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
    this.selected = this.props.selected
  }

  componentWillMount() {
    var { width } = Dimensions.get('window');
    this.imageSize = ((width - (this.props.imagesPerRow+1) * this.props.imageMargin) / this.props.imagesPerRow);

    //Fetch
    var fetchParams = {
      first: 10000,
      groupTypes: this.props.groupTypes,
      assetType: this.props.assetType,
    };

    if (Platform.OS === "android") delete fetchParams.groupTypes;
    if (this.state.lastCursor) fetchParams.after = this.state.lastCursor;

    CameraRoll.getPhotos(fetchParams)
      .then((data) => {
        //split to rows
        var rows=[];
        while (data.edges.length > 0){
            rows.push(data.edges.splice(0,this.props.imagesPerRow));
        }
        //cloneWithRows
        this.setState({dataSource: this.state.dataSource.cloneWithRows(rows)})
      });
  }
  render(){
    return (
      <View style={[ styles.wrapper, { padding: this.props.imageMargin, paddingRight: 0, backgroundColor: this.props.backgroundColor}, ]}>
        <SGListView
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          dataSource={this.state.dataSource}
          renderRow={rowData => 
            <MediaItem 
              data={data} 
              selected={this.selected}
              onClick={item => this._handleClick(item)}/>
          } />
      </View>
    );
  }
  renderRow(data){
    var items = data.map((item,key) => {
      if (item === null) {
        return null;
      }
      console.log(data)
      return this._renderImage(item,key);
    })
    return(
      <View style={styles.row}>
        {items}
      </View>
    )
  }
  _handleClick(item){
    var selected = this.selected
    var index = selected.indexOf(image)

    if (index >= 0) selected.splice(index, 1)
    else {
      if (selected.length < this.props.maximum) selected.push(image)
      else selected = [image]
    }
    this.selected = selected 
    this.props.callback(this.selected)
  }
}

const styles = StyleSheet.create({
  wrapper:{
    flex: 1,
  },
  listContainer: {
    flexDirection: 'column',
  },
  row:{
    flexDirection: 'row',
  },
})

MediaPicker.propTypes = {
  callback: React.PropTypes.func.isRequired,
  groupTypes: React.PropTypes.oneOf([
    'Album',
    'All',
    'Event',
    'Faces',
    'Library',
    'PhotoStream',
    'SavedPhotos',
  ]),
  maximum: React.PropTypes.number,
  assetType: React.PropTypes.oneOf([
    'Photos',
    'Videos',
    'All',
  ]),
  imagesPerRow: React.PropTypes.number,
  imageMargin: React.PropTypes.number,
  selectedMarker: React.PropTypes.element,
  backgroundColor: React.PropTypes.string,
  selected: React.PropTypes.array,
}
MediaPicker.defaultProps = {
  groupTypes: 'SavedPhotos',
  maximum: 15,
  imagesPerRow: 3,
  imageMargin: 5,
  assetType: 'Photos',
  backgroundColor: 'white',
  selected: [],
  callback: function(d) {
    console.log(d);
  },
}

export default MediaPicker;
