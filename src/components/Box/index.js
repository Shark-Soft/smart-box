import React, { useEffect, useState } from 'react'
import './style.css'
import { useParams, Link } from 'react-router-dom'
const TOKEN1 = 'BBFF-v87JpAH59kPfxjnkmF9U4mz8Wgxmjd'
const TOKEN2 = 'BBFF-PQqlgPQbY66QtOPURHqjRmV1OxU5cC'
const TOKEN3 = 'BBFF-RkmmHZqzNOOv3ASKfB02recC2FPdhJ'
function Box({ owner = false }) {
  const [state, setState] = useState({
    dist: 0,
    temp: 0,
    pass: 0,
    lat: 0,
    long: 0,
  })
  const { id } = useParams()
  const user_tokens = {
    1: TOKEN1,
    2: TOKEN2,
    3: TOKEN3,
  }
  const token = user_tokens[id]

  const getInfo = async () => {
    try {
      const temp = await fetch(
        `https://things.ubidots.com/api/v1.6/devices/smart-box${id}/temperatura/values/?token=${token}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const dist = await fetch(
        `https://things.ubidots.com/api/v1.6/devices/smart-box${id}/distancia/values/?token=${token}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const lat = await fetch(
        `https://things.ubidots.com/api/v1.6/devices/smart-box${id}/lat/values/?token=${token}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const long = await fetch(
        `https://things.ubidots.com/api/v1.6/devices/smart-box${id}/long/values/?token=${token}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const pass = await fetch(
        `https://things.ubidots.com/api/v1.6/devices/smart-box${id}/password/values/?token=${token}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const tempJson = await temp.json()
      const distJson = await dist.json()
      const latJson = await lat.json()
      const longJson = await long.json()
      const passJson = await pass.json()
      setState({
        dist: distJson.results[0].value,
        temp: tempJson.results[0].value,
        lat: latJson.results[0].value,
        long: longJson.results[0].value,
        pass: passJson.results[0].value,
      })
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getInfo()
  }, [token])
  const sendResponse = async (value) => {
    const data = { confirmation: value, password: 0 }
    await fetch(
      `https://industrial.api.ubidots.com/api/v1.6/devices/smart-box${id}`,
      {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': 'BBFF-vpL3K6dUH6NCNZ5Gg1DdiUd7gsnxy0',
        },
        body: JSON.stringify(data),
      }
    )
    window.location.reload()
  }
  const modalPass = () => (
    <section className="status-section">
      <div>
        <h2>Haz ingresado la contraseña correcta</h2>
        <h2>¿Deseas confirmar la apertura?</h2>
        <button className="btn-accp" onClick={() => sendResponse(1)}>
          Aceptar
        </button>
        <button className="btn-deny" onClick={() => sendResponse(0)}>
          Rechazar
        </button>
      </div>
    </section>
  )
  const modalInc = () => (
    <section className="status-section">
      <div>
        <h2>Cuidado</h2>
        <h2>Alguien a ingresado la contraseña Incorrecta</h2>
      </div>
    </section>
  )
  return (
    <main>
      <Link className="btn" to="/">
        Inicio
      </Link>
      <section className="box-state">
        <h1 className="title">Estado de caja fuerte {id}: </h1>
        <div
          className={
            state.temp > 30 || state.dist > 2 ? 'state danger ' : 'state safe'
          }
        >
          {state.temp > 30 || state.dist > 2 ? 'Riesgo' : 'Seguro'}
        </div>
      </section>

      <div className="smart-info">
        <section className="info-section">
          <p>
            Puerta:{' '}
            <span className="highligth">
              {state.dist > 1 ? 'Abierta' : 'Cerrada'}
            </span>{' '}
            distancia(
            {state.dist})
          </p>
          <p>
            Temperatura: <span>{state.temp}</span>c
          </p>
        </section>
        <section className="map-section">
          <div className="map">
            <iframe
              width="100%"
              height="100%"
              title="google maps"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBC9qr456dF_UWRtj6joKqoqzxf8EAal-Q&q=${state.lat},${state.long}&maptype=satellite`}
            ></iframe>
          </div>
          <p>
            lat: {state.lat} long: {state.long}
          </p>
        </section>
      </div>
      {state.pass}
      <div className="smart-state">
        {state.pass === 1 && owner ? modalPass() : <></>}
        {state.pass === 2 ? modalInc() : <></>}
        <section className="img-section"></section>
      </div>
    </main>
  )
}

export default Box
