import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { API } from "../../config/api";

export default function VerifyOTP() {

  const router = useRouter();

  const { email } = useLocalSearchParams();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  async function verifyOTP() {

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(`${API}/auth/verify-otp`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          email,
          otp

        }),

      });

      const data = await res.json();

      if (!data.success) {

        alert(data.message);
        return;

      }

      alert("OTP Verified");

      router.replace({
        pathname: "/auth/reset-password",
        params: {
          email,
        },
      });

    } catch (e) {

      console.log(e);

      alert("Server Error");

    } finally {

      setLoading(false);

    }

  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>Verify OTP</Text>

      <TextInput
        placeholder="Enter OTP"
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
        style={styles.input}
      />

      <Pressable
        style={styles.button}
        onPress={verifyOTP}
      >

        <Text style={styles.buttonText}>

          {loading ? "Verifying..." : "Verify OTP"}

        </Text>

      </Pressable>

    </View>

  );

}

const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
padding:25
},

title:{
fontSize:30,
fontWeight:"700",
marginBottom:25
},

input:{
borderWidth:1,
borderColor:"#ddd",
padding:15,
borderRadius:10,
marginBottom:20
},

button:{
backgroundColor:"#123C7B",
padding:16,
borderRadius:10,
alignItems:"center"
},

buttonText:{
color:"#fff",
fontWeight:"700"
}

});