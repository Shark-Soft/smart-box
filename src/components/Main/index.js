import React, { useState, useEffect } from 'react'
import socketIOClient, { io } from 'socket.io-client'
import './style.css'

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

  return (
    <main>
      <section className="box-state">
        <h1 className="title">Estado de caja fuerte:</h1>
        <div className="state">Segura</div>
      </section>

      <div className="smart-info">
        <section className="info-section">
          <p>
            Puerta: <span>{ }</span>
          </p>
          <p>
            Temperatura: <span>{ }</span>
          </p>
        </section>
        <section className="map-section">
          <iframe
            width="100%"
            height="100%"
            center="3.488590, -76.516390"
            loading="lazy"
            allowfullscreen
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBC9qr456dF_UWRtj6joKqoqzxf8EAal-Q&q=3.488590, -76.516390">
          </iframe>
        </section>
      </div>

      <div className="smart-state">
        <section className="status-section">
          <div>
            <h2>Haz ingresado la contraseña correcta</h2>
            <h1>¿Deseas confirmar la apertura?</h1>
            <button>Aceptar</button>
            <button>Rechazar</button>
          </div>
        </section>
        <section className="img-section">image</section>
      </div>

    </main>
  )
}

export default App
