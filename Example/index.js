import React,{Component} from 'react'
import {
  ,StyleSheet
  ,View
} from 'react-native'

import MediaPicker from 'react-native-media-picker';

class Example extends Component{
  render() {
    return (
      <View style={styles.container}>
        <CameraRollPicker
          groupTypes='SavedPhotos'
          batchSize={25}
          maximum={15}
          assetType='Photos'
          imagesPerRow={3}
          imageMargin={5}
          callback={images => this.doSomething(images)} />
      </View>
    );
  }
  doSomething(images) {
    console.log(images)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  }
})
