/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { MapView } from 'react-native-amap3d';
import Cluster from './src/compoments/Cluster/index';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  state = {
    mapCenter: {
      latitude: 30.587916,
      longitude: 104.169855,
    },
    zoomLevel: 8,
  }

  onStatusChange = ({ nativeEvent }) => { 
    this.nativeEvent = nativeEvent; 
    this.setState({
      zoomLevel: nativeEvent.zoomLevel
    })
    this.cluster.update({ 
      zoomLevel: nativeEvent.zoomLevel, 
      region: { 
        longitude: nativeEvent.longitude, 
        latitude: nativeEvent.latitude, 
        longitudeDelta: nativeEvent.longitudeDelta, 
        latitudeDelta: nativeEvent.latitudeDelta 
      } 
    }); 
  };

  onPress = cluster => {
    this.setState({
      zoomLevel: this.state.zoomLevel + 1,
      mapCenter: cluster.coordinate
    })
  }

  markers = Array(100).fill(0).map((_, i) => ({
    coordinate: {
      latitude: 30.577916 + Math.random(),
      longitude: 104.069855 + Math.random(),
    },
    extra: { key: `Marker${i}` },
  }))

  renderMarker = item => (
    <MapView.Marker
      key={item.extra.key}
      title={item.extra.key}
      infoWindowDisabled={true}
      coordinate={item.coordinate}
      onPress={() => {
        this.setState({
          mapCenter: item.coordinate
        })
        alert('Hello ' + item.extra.key)
      }}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => this.mapView = ref}
          onStatusChangeComplete={this.onStatusChange}
          style={StyleSheet.absoluteFill}
          showsScale={false}
          showsCompass={false}
          zoomLevel={this.state.zoomLevel}
          coordinate={this.state.mapCenter}>
          <Cluster
            onPress={this.onPress}
            ref={ref => this.cluster = ref}
            markers={this.markers}
            renderMarker={this.renderMarker}></Cluster>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  mapView: {
    
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
