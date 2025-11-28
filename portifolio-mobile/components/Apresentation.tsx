import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export function Apresentation() {
	return (
		<View style={styles.hero}>
			<View style={styles.textWrapper}>
				<Text style={styles.title}>Oi, eu sou Willian Rodrigues</Text>
				<Text style={styles.subtitle}>
					Estudante de Ciência da Computação que busca por meio da tecnologia um
					mundo melhor!
				</Text>
			</View>

			<View style={styles.photoWrapper}>
				<Image
					// imagem copiada para `portifolio-mobile/assets/images/will.jpg`
					source={require('../assets/images/will.jpg')}
					style={styles.picture}
					accessibilityLabel="Foto de Will"
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	hero: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 20,
		paddingHorizontal: 16,
	},
	textWrapper: {
		flex: 1,
		paddingRight: 12,
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		marginBottom: 6,
	},
	subtitle: {
		fontSize: 14,
		color: '#333',
	},
	photoWrapper: {
		width: 100,
		height: 100,
		borderRadius: 50,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
	},
	picture: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
});
