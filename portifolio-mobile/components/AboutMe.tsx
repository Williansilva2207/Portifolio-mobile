import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';

export function AboutMe() {
		const skills = [
			{ key: 'python', label: 'Python', icon: { set: 'FontAwesome5', name: 'python' } },
			{ key: 'java', label: 'Java', icon: { set: 'FontAwesome5', name: 'java' } },
			{ key: 'react', label: 'React', icon: { set: 'FontAwesome5', name: 'react' } },
			{ key: 'reactnative', label: 'React Native', icon: { set: 'Ionicons', name: 'logo-react' } },
			{ key: 'html5', label: 'HTML5', icon: { set: 'FontAwesome', name: 'html5' } },
			{ key: 'css3', label: 'CSS3', icon: { set: 'FontAwesome', name: 'css3' } },
			{ key: 'javascript', label: 'JavaScript', icon: { set: 'Ionicons', name: 'logo-javascript' } },
		];

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Skills</Text>

			<View style={styles.list}>
				{skills.map((s) => (
					<View key={s.key} style={styles.item}>
						{s.icon.set === 'FontAwesome5' ? (
							<FontAwesome5 name={s.icon.name as any} size={24} color="#333" />
						) : s.icon.set === 'Ionicons' ? (
							<Ionicons name={s.icon.name as any} size={24} color="#333" />
						) : (
							<FontAwesome name={s.icon.name as any} size={24} color="#333" />
						)}
						<Text style={styles.itemText}>{s.label}</Text>
					</View>
				))}
			</View>
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
	},
	list: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: 12,
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 8,
		margin: 6,
		backgroundColor: '#f2f2f2',
		borderRadius: 8,
	},
	itemText: {
		marginLeft: 8,
		fontSize: 14,
	},
});
