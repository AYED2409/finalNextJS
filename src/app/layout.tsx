import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar'
import SessionAuthProvider from '@/context/SessionAuthProvider'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
    	template: '%s | Vidi',
    	default: 'Vidi',
  	},
  	description: 'App for video content',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
	return (
    	<html lang="es">
    		<head>
    			<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    			<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    			
      		</head>
			<body className={montserrat.className}>
				<SessionAuthProvider>
					<Navbar />
					<main className='white'>
						{children}
					</main>
				</SessionAuthProvider>
			</body>
    	</html>
  )
}
