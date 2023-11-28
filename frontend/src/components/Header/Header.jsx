import style from './Header.module.scss'

const Header = () => {
	return (
		<header className={style['container']}>
			<h1 className={style['logo']}>Агрокарта</h1>
		</header>
	)
}

export default Header
