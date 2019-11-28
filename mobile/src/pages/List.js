import React, { useState, useEffect } from 'react';

import socketio from 'socket.io-client';

import { Alert, SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage } from 'react-native';

import SpaList from '../components/SpaList';

import logo from '../assets/logo.png';

export default function List() {
  const [spaServices, setSpaServices] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.1.100:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spa.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
      })
    })
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('spaServices').then(storagedSpaServices => {
      const spaServicesArray = storagedSpaServices.split(',').map(spaService => spaService.trim());

      setSpaServices(spaServicesArray);
    })
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView>
        {spaServices.map(spaService => <SpaList key={spaService} spaService={spaService} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: 'center',
    marginTop: 10
  },
});