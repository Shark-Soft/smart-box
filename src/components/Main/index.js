import React, { useState, useEffect } from 'react'
import socketIOClient, { io } from 'socket.io-client'
const ENDPOINT = 'industrial.ubidots.com:9012'
const TOKEN = 'BBFF-m6cylBBBG5xN0xY0krNtMY6jVfYqEt'
const DEVICE_LABEL = 'test'
const VARIABLE_LABEL = 'data2'
const VARIABLE_ID = '60ad21f273efc30bb4dedb58'
const QUERY = `test|LV|${TOKEN}|${DEVICE_LABEL}:${VARIABLE_LABEL}end`
var connectSocket = function (socket) {
  // Implements the socket connection
  socket.on('connect', function () {
    console.log(1)
    socket.emit(QUERY)
  })
}
function App() {
  useEffect(() => {
    const socket = io.connect('https://' + ENDPOINT)
    connectSocket(socket)
  }, [])

  return <p>It's</p>
}

export default App
