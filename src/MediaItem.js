import React, { Component } from 'react'
import{
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native'
import PropTypes from 'prop-types'

import Button from 'react-native-nativebutton'
import ImageProgress from 'react-native-image-progress'

class MediaItem extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    var { width } = Dimensions.get('window');
    this.imageSize = ((width - (this.props.imagesPerRow+1) * this.props.imageMargin) / this.props.imagesPerRow);
  }

  render(){
    var {item} = this.props
    var ImageComponent = this.props.showLoading? ImageProgress:Image
    var marker = this.props.selectedMarker ? this.props.selectedMarker :
      <Image
        style={[styles.checkIcon, {width: 25, height: 25, right: this.props.imageMargin + 5},]}
        source={require('./checkmark.png')}
      />
    return (
      <Button
        key={item.node.image.uri}
        style={{marginBottom: this.props.imageMargin, marginRight: this.props.imageMargin}}
        onPress={event => this._handleClick(item.node.image)}>
        <ImageComponent 
          indicator={ActivityIndicator}
          source={{ uri: item.node.image.uri }} 
          style={{height: this.imageSize, width: this.imageSize}} >
          { (this.props.selected)? marker : null }
        </ImageComponent>
      </Button>
    )    
  }

  _handleClick(item){
    this.props.onClick(item)
  }

}

var styles = StyleSheet.create({
  checkIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
  },
})

MediaItem.defaultProps = {
  item: {},
  selected: false,
}

MediaItem.propTypes = {
  item: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  selectedMarker: PropTypes.element,
  imageMargin: PropTypes.number.isRequired,
}


export default MediaItem