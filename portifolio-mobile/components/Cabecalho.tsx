import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';

type Props = {
	onNavigate?: (target: string) => void;
};

export function Cabecalho({ onNavigate }: Props) {
	const nav = [
		{ key: 'apres', label: 'Apresentação' },
		{ key: 'about', label: 'Skills' },
		{ key: 'project', label: 'Projetos' },
	];

	return (
		<View style={styles.header}>
			<Text style={styles.logo}>Willian Silva</Text>
			<View style={styles.nav}>
				{nav.map((n) => (
					<TouchableOpacity
						key={n.key}
						onPress={() => onNavigate?.(n.key)}
						style={styles.navButton}
					>
						<Text style={styles.navText}>{n.label}</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#e5e5e5',
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 12 : 12,
	},
	logo: {
		fontSize: 18,
		fontWeight: '700',
	},
	nav: {
		flexDirection: 'row',
		gap: 8,
	},
	navButton: {
		paddingHorizontal: 8,
		paddingVertical: 6,
	},
	navText: {
		fontSize: 14,
		color: '#007AFF',
	},
});
