'use client'
import { GET_ALL_AREAS } from '@/query/areas'
import { useQuery } from '@apollo/client'
import { Map, Polygon, YMaps } from '@pbe/react-yandex-maps'
import React, { useEffect, useState } from 'react'
import dataFile from '../../../public/data.json'
const MapContainer = () => {
	const [dataMap, setDataMap] = useState([])
	const { data, loading, error } = useQuery(GET_ALL_AREAS)

	console.log(data)

	useEffect(() => {
		setDataMap(dataFile.features)
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
				{dataMap.map((feature, index) => (
					<React.Fragment key={index}>
						<Polygon
							geometry={feature.geometry.coordinates.map(coords =>
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
