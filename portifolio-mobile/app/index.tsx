import React, { useState, useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Cabecalho } from '../components/Cabecalho';
import { Apresentation } from '../components/Apresentation';
import { AboutMe } from '../components/AboutMe';
import { Projects } from '../components/Projects';
import { Rodape } from '../components/Rodape';
import Forca from './Forca/Forca';

export default function App() {
	const [route, setRoute] = useState<'home' | 'forca'>('home');

	const scrollRef = useRef<ScrollView | null>(null);
	const positions = useRef<Record<string, number>>({});

	const handleNavigate = (target: string) => {
		const scrollToSection = () => {
			const y = positions.current[target] ?? 0;
			scrollRef.current?.scrollTo({ y, animated: true });
		};

		if (route !== 'home') {
			setRoute('home');
			setTimeout(scrollToSection, 120);
		} else {
			scrollToSection();
		}
	};

	const openForca = () => setRoute('forca');

	return (
		<SafeAreaView style={styles.safe}>
			<Cabecalho onNavigate={handleNavigate} />

			{route === 'home' ? (

				<ScrollView
					ref={scrollRef}
					contentContainerStyle={styles.container}
					keyboardShouldPersistTaps="handled"
				>
					<View onLayout={(e) => (positions.current['apres'] = e.nativeEvent.layout.y)}>
						<Apresentation />
					</View>

					<View onLayout={(e) => (positions.current['about'] = e.nativeEvent.layout.y)}>
						<AboutMe />
					</View>

					<View onLayout={(e) => (positions.current['project'] = e.nativeEvent.layout.y)}>
						<Projects onOpenForca={openForca} />
					</View>

					<View onLayout={(e) => (positions.current['footer'] = e.nativeEvent.layout.y)}>
						<Rodape />
					</View>
				</ScrollView>

			) : (

				// ⭐⭐⭐ CORREÇÃO: A View precisa de flex: 1 para o jogo renderizar corretamente!
				<View style={{ flex: 1 }}>
					<TouchableOpacity onPress={() => setRoute('home')} style={styles.backButton}>
						<Text style={styles.backText}>{'< Voltar'}</Text>
					</TouchableOpacity>

					{/* Tela do jogo da Forca */}
					<Forca />
				</View>

			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: { flex: 1 },
	container: { paddingBottom: 40 },
	backButton: { padding: 12 },
	backText: { color: '#007AFF', fontWeight: '700' },
});
