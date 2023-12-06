import { Inter } from 'next/font/google'
import { ApolloProvider } from '../components/Apollo/ApolloLayout'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Агрокарта',
	description: 'Помогаем мы, экономите вы',
}

export default function RootLayout({ children }) {
	return (
		<html lang='ru'>
			<body className={inter.className}>
				<ApolloProvider>{children}</ApolloProvider>
			</body>
		</html>
	)
}
