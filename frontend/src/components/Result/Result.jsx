import style from './Result.module.scss'

const Result = ({ result }) => {
	return (
		<section className={style['container']}>
			<h2>Местность</h2>
			{result &&
				result.map(item => (
					<>
						<hr />
						<h1 style={{ fontWeight: 'bold', margin: 0, padding: 0 }}>
							{item.type}
						</h1>
						<p>{item.details}</p>
						<hr />
					</>
				))}
		</section>
	)
}

export default Result
