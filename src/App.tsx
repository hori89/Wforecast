/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';

import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {Header} from 'react-native-elements';

import Geolocation from '@react-native-community/geolocation';
import {WeatherModel} from './model/WeatherModel';
import {colors} from './styles/common';
import {ForecastItem} from './view/ForecastItem';

type AppProps = {
  forecastList: Array<WeatherModel>;
  loading: boolean;
  error: boolean;
};

export default class App extends Component<AppProps> {
  state: AppProps = {forecastList: [], loading: true, error: false};

  componentDidMount() {
    this.initForecast();
  }

  initForecast() {
    Geolocation.getCurrentPosition(info => {
      const latitude = info.coords.latitude;
      const longitude = info.coords.longitude;

      const call =
        'https://api.openweathermap.org/data/2.5/forecast?lat=' +
        latitude +
        '&lon=' +
        longitude +
        '&units=metric&appid=a8d9dca5c4d8a9016ee3a88c4fe0306d';

      console.log('CALL ' + call);

      fetch(call)
        .then(response => response.json())
        .then(data => {
          const responseList: Array<any> = data.list;
          var resultList: Array<WeatherModel> = [];
          responseList.map(data => {
            var temp: WeatherModel = {
              date: data.dt * 1000,
              temperature: data.main.temp,
              feelsLike: data.main.feels_like,
              weatherText: data.weather[0].main,
              description: data.weather[0].description,
              weatherIcon: data.weather[0].icon,
              humidity: data.main.humidity,
              tempMin: data.main.temp_min,
            };
            resultList = [...resultList, temp];
          });

          this.setState({
            forecastList: resultList,
            loading: false,
            error: false,
          });
        })
        .catch(error => {
          console.log('error ' + error);

          this.setState({
            loading: false,
            error: true,
          });
        });
    });
  }

  renderForecastList() {
    return this.state.forecastList.map(forecast => {
      return (
        <ForecastItem key={JSON.stringify(forecast.date)} forecast={forecast} />
      );
    });
  }

  render() {
    return (
      <Fragment>
        <Header
          backgroundColor={colors.primary}
          barStyle={'light-content'}
          centerComponent={{text: 'Weather', style: {color: '#fff'}}}
        />
        {!this.state.loading ? (
          <ScrollView style={styles.scrollView}>
            {this.renderForecastList()}
          </ScrollView>
        ) : this.state.error ? (
          <View style={styles.emptyViewContainer}>
            <Text>Error while loading data, try again</Text>
          </View>
        ) : (
          <View style={styles.emptyViewContainer}>
            <Text>Loading...</Text>
          </View>
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.secondary,
  },
  emptyViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
