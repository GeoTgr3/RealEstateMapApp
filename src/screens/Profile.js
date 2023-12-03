import React from "react";
import { View, Linking } from "react-native";
import {
	Layout,
	Button,
	Text,
	Section,
	SectionContent,
	useTheme,
	Avatar,
} from "react-native-rapi-ui";

export default function ({ navigation }) {
	const { isDarkmode, setTheme } = useTheme();
	return (
		<Layout>
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					marginHorizontal: 20,
				}}
			>
				<Section>
					<SectionContent>
						<Text fontWeight="bold" style={{ textAlign: "center" }}>
							Mon Profile
						</Text>
						<Avatar
							source={{ uri: 'https://img.freepik.com/premium-photo/portrait-young-handsome-man-glasses_127089-1348.jpg' }}
							size="xl"
							shape="round"
						/>
						<Button
							text="Edite profile"
							onPress={() => {
								navigation.navigate("SecondScreen");
							}}
							style={{
								marginTop: 10,
							}}
						/>
						

					</SectionContent>
				</Section>
			</View>
		</Layout>
	);
}
