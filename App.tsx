/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @returns {JSX.Element}
 * @function
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NativeBaseProvider} from 'native-base';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import Signup from './screens/auth/signup';
import Login from './screens/auth/login';
import Layout from './screens/app/_layout';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

const authStack = createStackNavigator();

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

export default function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const navigationRef = useNavigationContainerRef();

  // manage Splashscreen from here ??
  useEffect(() => SplashScreen.hide(), [])

  // render _layout.tsx in production ??
  return (
    <SafeAreaView style={backgroundStyle}>
        <Layout />
    </SafeAreaView>
  );
}

// TODO: add global theme and config parameters to NativeBaseProvider
// isSSR?? is probably only good for rendering websites with react
// user or email as condition
// user ? (
// <NativeBaseProvider>
//   <NavigationContainer ref={navigationRef} >
//     <authStack.Navigator screenOptions={} >
//       <authStack.Screen name='Login' component={Login} />
//       <authStack.Screen name='Signup' component={Signup} />
//       <authStack.Screen name='restPassword' component={restPassword} />
//     </authStack.Navigator>
//   </NavigationContainer>
// </NativeBaseProvider>) : (
//   <NativeBaseProvider>
//   <PageProvider>
//     <MainScreen />
//     </PageProvider>
//   </NativeBaseProvider>
// )

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});



  /* <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView> */

