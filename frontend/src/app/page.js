'use client'
import Header from '@/components/Header/Header'
import MapContainer from '@/components/Map/MapContainer'
import Result from '@/components/Result/Result'
import style from './page.module.scss'
import { useState } from 'react'
export default function Home() {
	const [result, setResult] = useState()
	return (
		
		<div>
			<Header />
			<main className={style['main']}>
				<Result result={result} />
				<MapContainer setResult={setResult} />
			</main>
		</div>
	)
}
