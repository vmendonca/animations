import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  ScrollView,
} from "react-native";


const SCREEN_HEIGHT = Dimensions.get('window').height

class AppleMusicUI extends Component {

  state = {
    isScrollEnabled: false
  }
  componentWillMount() {

    this.scrollOffset = 0

    this.animation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 90 })

    this.panResponder = PanResponder.create({

      onMoveShouldSetPanResponder: (evt, gestureState) => {

        if ((this.state.isScrollEnabled && this.scrollOffset <= 0 && gestureState.dy > 0) || !this.state.isScrollEnabled && gestureState.dy < 0) {
          return true
        } else {
          return false
        }
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.animation.extractOffset()
      },
      onPanResponderMove: (evt, gestureState) => {
        this.animation.setValue({ x: 0, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.moveY > SCREEN_HEIGHT - 120) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start()
        }
        else if (gestureState.moveY < 120) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start()
        }
        else if (gestureState.dy < 0) {
          this.setState({ isScrollEnabled: true })

          Animated.spring(this.animation.y, {
            toValue: -SCREEN_HEIGHT + 120,
            tension: 1
          }).start()
        }
        else if (gestureState.dy > 0) {
          this.setState({ isScrollEnabled: false })
          Animated.spring(this.animation.y, {
            toValue: SCREEN_HEIGHT - 120,
            tension: 1
          }).start()
        }
      }

    })
  }

  render() {

    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    }

    return (
      <Animated.View style={{ flex: 1, backgroundColor: "red" }}>
        <Animated.View
          {... this.panResponder.panHandlers}
          style={[animatedHeight, { position: 'absolute', left: 0, right: 0, zIndex: 10, backgroundColor: 'white', height: SCREEN_HEIGHT }]}

        >
          <ScrollView
            scrollEnabled={this.state.isScrollEnabled}
            scrollEventThrottle={16}
            onScroll={event => {
              this.scrollOffset = event.nativeEvent.contentOffset.y
            }}
          >

              <View style={{flexDirection: 'row',margin:10, justifyContent: 'space-between',}}>
                 <View style={{width:40, height: 40, backgroundColor:"green", maring:5}}/>
                 <View style={{width:40, height: 40, backgroundColor:"green", maring:5}}/>
                 <View style={{width:40, height: 40, backgroundColor:"green", maring:5}}/>
              </View>

            <View style={{ height: 10000, backgroundColor: "blue" }}  />
          </ScrollView>
        </Animated.View>

      </Animated.View>
    );
  }
}
export default AppleMusicUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
