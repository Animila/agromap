import Header from '@/components/Header/Header'
import MapContainer from '@/components/Map/MapContainer'
import Result from '@/components/Result/Result'
import style from './page.module.scss'
export default function Home() {
	return (
		
		<div>
			<Header />
			<main className={style['main']}>
				<Result />
				<MapContainer />
			</main>
		</div>
	)
}
