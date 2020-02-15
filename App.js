import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button
} from "react-native";
import axios from "axios";

export default function App() {
  const [dados, setDados] = useState([
    {
      id: "0",
      campo: "nome",
      tipo: "Text",
      label: "Nome:",
      valor: "Alex",
      keyboardType: "default" //'default' | 'email-address' | 'numeric' | 'phone-pad';
    },
    {
      id: "1",
      campo: "sobrenome",
      tipo: "Text",
      label: "Sobrenome:",
      valor: "Silva",
      keyboardType: "default"
    },
    {
      id: "2",
      campo: "idade",
      tipo: "Text",
      style: { fontSize: 28, color: "red" },
      placeholder: "Sua idade",
      placeholderTextColor: "#363636",
      keyboardType: "number-pad",
      maxLength: "2",
      label: "Idade:",
      valor: "18"
    }
  ]);
  const [loading, setLoading] = useState(false);

  const [campo1, setCampo1] = useState();
  const [campo2, setCampo2] = useState();
  const [campo3, setCampo3] = useState();
  const [campo4, setCampo4] = useState();

  useEffect(() => {
    //getDados();
  }, []);

  /*
  async function getDados() {
    setLoading(true);
    await axios
      .get("http://192.168.15.11:8080/campos_dinamicos/webresources/api/listar")
      .then(response => {
        //console.log(response.data);
        setDados(response.data);
      });
    setLoading(false);
  }
*/
  function vai(item) {
    if (item.tipo == "Text") {
      return (
        <View
          style={{
            margin: 5,
            padding: 5,
            borderColor: "#ddd",
            borderWidth: 1,
            borderRadius: 5
          }}
        >
          {/*<Text>Campo: {item.campo}</Text>
          <Text>Tipo: {item.tipo}</Text>*/}
          <Text>{item.label}</Text>
          <TextInput
            style={[
              {
                borderColor: "#363636",
                borderWidth: 0.8,
                padding: 5,
                marginTop: 5
              },
              item.style
            ]}
            value={item.valor}
            keyboardType={item.keyboardType}
            onChangeText={v => setCampo4(v)}
          />
        </View>
      );
    }
  }

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>Carregando...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={{ height: 8, backgroundColor: "#1B75BB" }}></View>

        <View>
          <FlatList
            data={dados}
            keyExtractor={e => e.id}
            renderItem={({ item }) => <Teste data={item} />}
          />
        </View>
      </View>
    );
  }
}

function Teste({ data }) {
  const [campo1, setCampo1] = useState();
  const [campo2, setCampo2] = useState();

  useEffect(() => {
    if (!campo1) {
      setCampo1(data.label);
    }
    if (!campo2) {
      setCampo2(data.valor);
    }
  }, []);

  return (
    <View
      style={{
        margin: 5,
        padding: 5,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 5
      }}
    >
      <Text>{campo1}</Text>
      <TextInput
        style={[
          {
            borderColor: "#363636",
            borderWidth: 0.8,
            padding: 5,
            marginTop: 5
          },
          data.style
        ]}
        value={campo2}
        keyboardType={data.keyboardType}
        onChangeText={v => setCampo2(v)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24
  }
});
