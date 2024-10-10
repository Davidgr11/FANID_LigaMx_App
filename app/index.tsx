import { Text, View, StyleSheet, 
		TextInput, Pressable
} from "react-native";
import { useFonts } from "expo-font";
import IconRocket from './iconrocket';
import IconRobot from './robot';

//https://docs.expo.dev/develop/user-interface/fonts/
//https://reactsvgicons.com/react-svg-icons-guide

export default function Index() {

	const [loaded, error] = useFonts({
		'poppins': require('../assets/fonts/PoppinsSemiBold.ttf'),
	  });


  return (
    <View style={styles.container}>
		<IconRocket width='150' height='150'></IconRocket>
		<Text style={styles.title}>AppTitle</Text>
		<Text >¡Te damos la bienvenida!</Text>
		<View style={styles.inputfieldlabel}>
			<Text >Usuario</Text>
			<TextInput style={styles.input}></TextInput>
		</View>
		<View style={styles.inputfieldlabel}>
			<Text >Contraseña</Text>
			<TextInput style={styles.input} secureTextEntry="true"></TextInput>
		</View>
		<Pressable style={styles.botonconlogo} onPress={()=>{alert("not implemented")}} >
			<IconRobot width='32' height='32'></IconRobot>
			<Text>Log in!</Text>
		</Pressable>
		<Text >¿No tienes una cuenta?</Text>
		<Pressable style={styles.botonconlogo}>
			<IconRobot width='32' height='32'></IconRobot>
			<Text>Regístrate.</Text>
		</Pressable>

    </View>
	
  );
}

const styles=StyleSheet.create(
	{
		container:{
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		title:{
			fontFamily:'poppins',
			fontSize:44
		},
		inputfieldlabel:
		{
			flexDirection:'row',
			alignItems: 'center',
			justifyContent: 'flex-end',
			width:'60%'
		},
		input: {
			height: 40,
			width:150,
			margin: 12,
			borderWidth: 1,
			padding: 10,
		  },
		botonconlogo:
		{
			backgroundColor:'#F9D689',
			flexDirection:'row',
			alignItems: 'center',
			padding:5,
			borderRadius:5,
			borderColor:'#000',
			borderWidth:2,
			width:150
		},
		//#973131 #E0A75E #F9D689 #F5E7B2
		
	}
)