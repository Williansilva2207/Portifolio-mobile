import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	TouchableOpacity,
	Linking,
} from 'react-native';

type Project = {
	title: string;
	description: string;
	imageUri: string;
	url?: string;
};

const projects: Project[] = [
	{
		title: 'Classificador Deadpool e Homem Aranha',
		description:
			'Projeto de Machine Learning que classifica imagens do Deadpool e do Homem Aranha com rede YOLO',
		imageUri: '',
		url: 'https://github.com/Williansilva2207/Rede-YOLO-para-detectar-o-Homem-Aranha-e-Deadpool',
	},
	{
		title: 'Redução de Dimensionalidade de Imagem',
		description:
			'Esse projeto visa utilizar bibliotecas e ferramentas para a redução da Dimensionalidade de imagens.',
		imageUri: '',
		url: 'https://github.com/Williansilva2207/Reducao-de-Dimensionalidade-em-Imagens-para-Redes-Neurais',
	},
	{
		title: 'Jogo da Forca - Tema Duna',
		description:
			'Jogo da forca criado com React que desafia o jogador a descobrir elementos do universo de Duna.',
		imageUri: '',
		url: undefined, // interna no web; configure navegação no app móvel se desejar
	},
];

type Props = {
	onOpenForca?: () => void;
};

export function Projects({ onOpenForca }: Props) {
	const open = async (url?: string) => {
		if (!url) return;
		const supported = await Linking.canOpenURL(url);
		if (supported) await Linking.openURL(url);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Projetos</Text>
			<ScrollView contentContainerStyle={styles.section}>
				{projects.map((p) => (
					<TouchableOpacity
						key={p.title}
						style={styles.card}
						activeOpacity={0.85}
						onPress={() => {
							// detectar jogo da forca de forma mais robusta (case-insensitive) ou quando não há URL externa
							if (!p.url || /forca/i.test(p.title)) {
								onOpenForca?.();
								return;
							}
							open(p.url);
						}}
					>
						<Image
							source={
								p.title.includes('Deadpool')
									? require('../assets/images/DS.png')
									: p.title.includes('Redução')
									? require('../assets/images/code.png')
									: require('../assets/images/paul.png')
							}
							style={styles.cardImage}
						/>
						<Text style={styles.cardTitle}>{p.title}</Text>
						<Text style={styles.cardText}>{p.description}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		textAlign: 'center',
		marginBottom: 12,
		color: '#111',
	},
	section: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: 12,
	},
	card: {
		width: 260,
		backgroundColor: 'rgb(43, 0, 255)',
		padding: 12,
		borderRadius: 10,
		margin: 8,
		alignItems: 'center',
	},
	cardImage: {
		width: 200,
		height: 120,
		borderRadius: 8,
		marginBottom: 10,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: '700',
		color: '#fff',
		marginBottom: 6,
		textAlign: 'center',
	},
	cardText: {
		color: '#fff',
		fontSize: 13,
		textAlign: 'center',
	},
});
