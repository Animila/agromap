'use client'
import AreasServices from '@/services/areas'
import { Map, Polygon, YMaps } from '@pbe/react-yandex-maps'
import React, { useEffect, useState } from 'react'
const MapContainer = () => {
	const [dataMap, setDataMap] = useState([])

	const getAllAreas = async () => {
		const data = await (await AreasServices.getAll()).data
		console.log(data.data)
		setDataMap(data.data)
	}

	useEffect(() => {
		getAllAreas()
	}, [])

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
							geometry={item.coordinates.map(coords =>
								coords.map(coord => [coord[1], coord[0]])
							)}
						/>
					</React.Fragment>
				))}
			</Map>
		</YMaps>
	)
}

export default MapContainer
