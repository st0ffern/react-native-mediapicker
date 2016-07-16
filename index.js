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
import Image from 'react-native-image-progress'
import Button from 'react-native-nativebutton'

class MediaPicker extends Component{
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selected: [],
      loadingImages: [],
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
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

  _selectImage(image) {
    if (index >= 0) this.state.selected.splice(this.state.selected.indexOf(image), 1)
    else {
      if (this.state.selected.length < this.props.maximum) this.state.selected.push(image)
      else this.state.selected = [image]
    }
    this.setState({ selected: selected })
    this.props.callback(this.state.selected)
  }
  render(){
    return (
      <View style={[ styles.wrapper, { padding: this.props.imageMargin, paddingRight: 0, backgroundColor: this.props.backgroundColor}, ]}>
        <SGListView
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          dataSource={this.state.dataSource}
          renderRow={rowData => this.renderRow(rowData)} />
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

  _renderImage(item,key) {
    var marker = this.props.selectedMarker ? this.props.selectedMarker :
      <Image
        style={[styles.marker, {width: 25, height: 25, right: this.props.imageMargin + 5},]}
        source={require('./checkmark.png')}
      />
    return (
      <Button
        key={key}
        style={{marginBottom: this.props.imageMargin, marginRight: this.props.imageMargin}}
        onPress={event => this._selectImage(item.node.image)}>
        <Image 
          indicator={ActivityIndicator}
          source={{ uri: item.node.image.uri }} 
          style={{height: this.imageSize, width: this.imageSize}} >
          { (this.state.selected.indexOf(item.node.image) >= 0) ? marker : null }
        </Image>
      </Button>
    );
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
  checkIcon: {
    position: 'absolute',
    top: 5,
    backgroundColor: 'transparent',
  },
})

MediaPicker.propTypes = {
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
  callback: React.PropTypes.func,
  selectedMarker: React.PropTypes.element,
  backgroundColor: React.PropTypes.string,
}
MediaPicker.defaultProps = {
  groupTypes: 'SavedPhotos',
  maximum: 15,
  imagesPerRow: 3,
  imageMargin: 5,
  assetType: 'Photos',
  backgroundColor: 'white',
  callback: function(d) {
    console.log(d);
  },
}

export default MediaPicker;
