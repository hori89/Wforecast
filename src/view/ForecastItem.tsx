import React, {Component} from 'react';
import {Card, Text, Image} from 'react-native-elements';
import {View, StyleSheet} from 'react-native';
import {GetImageByIconId} from '../utils/DataHelper';
import {WeatherModel} from '../model/WeatherModel';
import moment from 'moment';
import {fonts, padding} from '../styles/common';

export type ForecastItemProps = {
  forecast: WeatherModel;
};

export const ForecastItem = (props: ForecastItemProps) => {
  var date = moment(new Date(props.forecast.date));

  return (
    <Card containerStyle={styles.card}>
      <Image
        source={GetImageByIconId(props.forecast.weatherIcon)}
        style={styles.cardImage}
        containerStyle={styles.cardImageContainer}
      />
      <View style={styles.cardRowContainer}>
        <Text style={styles.cardTime}>{date.format('H:mm')}</Text>
        <Text style={styles.cardDate}>{date.format('DD/MM')}</Text>
      </View>

      <Text style={styles.cardDescription}>
        {props.forecast.weatherText} ({props.forecast.description})
      </Text>

      <View style={styles.cardRowContainer}>
        <Text style={styles.cardTemperature}>
          {props.forecast.temperature.toFixed(1)}
          &#8451;
        </Text>
        <Text style={styles.cardDescription}>
          Feels like {props.forecast.feelsLike.toFixed(1)} &#8451;
        </Text>
      </View>
      <Text style={styles.cardSummary}>
        Min: {props.forecast.tempMin.toFixed(1)} &#8451;
      </Text>
      <Text style={styles.cardDescription}>
        Humidity: {props.forecast.humidity}%
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: padding.normal,
  },
  cardRowContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  cardTime: {
    fontSize: fonts.large,
    fontWeight: '300',
    flex: 1,
  },
  cardDate: {
    fontSize: fonts.small,
    fontWeight: '600',
  },
  cardTemperature: {
    fontSize: fonts.large,
    fontWeight: '500',
    flex: 1,
  },
  cardDescription: {
    fontSize: fonts.small,
    marginVertical: 4,
    fontStyle: 'italic',
  },
  cardSummary: {
    fontSize: fonts.small,
    marginVertical: 2,
  },
  cardImage: {
    width: 44,
    height: 44,
  },
  cardImageContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
