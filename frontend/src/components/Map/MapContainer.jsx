'use client'
import api from '@/http'
import AreasServices from '@/services/areas'
import { Map, Polygon, YMaps } from '@pbe/react-yandex-maps'
import React, { useEffect, useState } from 'react'

const MapContainer = ({ setResult }) => {
	const [dataMap, setDataMap] = useState([])
	const [selectedItem, setSelectedItem] = useState(null)

	const getResource = async idArea => {
		const data = await api.get('/resource/' + idArea)
		if (data.data || data.data.data) {
			setResult(data.data.data)
		}
	}

	const getAllAreas = async () => {
		const data = await (await AreasServices.getAll()).data
		console.log(data.data)
		setDataMap(data.data)
	}

	useEffect(() => {
		getAllAreas()
	}, [])

	const openPopup = (event, item) => {
		getResource(item.id)
		setSelectedItem(item)
		if (!item.owners) {
			return
		}

		// Вычислите позицию всплывающего окна относительно клика
		const x = event.get('clientX')
		const y = event.get('clientY')

		// Создайте всплывающее окно
		const popup = document.createElement('div')
		popup.className = 'custom-popup'
		popup.style.position = 'absolute'
		popup.style.left = `${x}px`
		popup.style.top = `${y}px`
		popup.style.background = 'white'
		popup.onclick = () => {
			closePopup()
			// Добавьте другие действия, которые нужно выполнить при нажатии на всплывающее окно
			console.log('Popup clicked!')
		}

		console.log(item.owners.ownerData)

		// Заполните всплывающее окно данными
		popup.innerHTML = `
      <h4>Информация о владельце</h4>
      ${
				item.owners &&
				`<div>
              <p>ФИО: ${item.owners.ownerData}</p>
          </div>`
			}
    `

		// Добавьте всплывающее окно на карту
		document.body.appendChild(popup)
	}

	const closePopup = () => {
		setSelectedItem(null)

		// Удалите всплывающее окно из DOM
		const popup = document.querySelector('.custom-popup')
		if (popup) {
			setResult(null)
			popup.remove()
		}
	}

	return (
		<YMaps
			query={{ apikey: '622b38fb-2d92-4b0c-82fc-8532cfec3290', lang: 'ru_RU' }}
		>
			<Map
				defaultState={{
					center: [62.0551187, 129.752843],
					zoom: 11,
					controls: ['zoomControl'],
				}}
				width='70vw'
				height='87vh'
				modules={['control.ZoomControl']}
			>
				{dataMap.map((item, index) => (
					<React.Fragment key={index}>
						<Polygon
							options={{
								fillColor: item.owners ? '#B22222' : '#4169E1',
							}}
							geometry={item.coordinates.map(coords =>
								coords.map(coord => [coord[1], coord[0]])
							)}
							onClick={event => openPopup(event, item)}
						/>
					</React.Fragment>
				))}
			</Map>
		</YMaps>
	)
}

export default MapContainer
