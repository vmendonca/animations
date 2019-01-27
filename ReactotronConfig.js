import Reactotron from 'reactotron-react-native'

if (__DEV__) {
  const tron = Reactotron
    // .configure()
    .configure({ host: '192.168.10.104' })
    // .configure({ host: '192.168.0.103' })
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}
