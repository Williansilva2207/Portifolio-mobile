import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export function Rodape() {
	const open = async (url: string) => {
		const supported = await Linking.canOpenURL(url);
		if (supported) await Linking.openURL(url);
	};

	return (
		<View style={styles.footer}>
			<View style={styles.socials}>
				<TouchableOpacity onPress={() => open('https://github.com/Williansilva2207')}>
					<FontAwesome name="github" size={28} color="#111" />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => open('https://www.linkedin.com/in/willian-rodrigues-295575297/')}>
					<FontAwesome name="linkedin" size={28} color="#0A66C2" />
				</TouchableOpacity>
			</View>

			<Text style={styles.text}>Recife, PE</Text>
			<Text style={styles.text}>&copy; {new Date().getFullYear()} Willian Silva</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	footer: {
		paddingVertical: 16,
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: '#e5e5e5',
		marginTop: 16,
	},
	socials: {
		flexDirection: 'row',
		gap: 16,
		marginBottom: 8,
	},
	text: {
		fontSize: 14,
		color: '#333',
	},
});
