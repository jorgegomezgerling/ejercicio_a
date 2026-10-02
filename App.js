// Ejercicio 01-A: Contador + Toggle de Tema
import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";

const MAX = 10; // bonus: límite del contador

const temas = {
  claro: {
    fondo: "#F2F2F7",
    tarjeta: "#FFFFFF",
    borde: "#E5E5EA",
    texto: "#1C1C1E",
    secundario: "#6B6B70",
    boton: "#2563EB",
    botonTexto: "#FFFFFF",
  },
  oscuro: {
    fondo: "#0F0F12",
    tarjeta: "#1C1C22",
    borde: "#2C2C34",
    texto: "#F5F5F7",
    secundario: "#A1A1AA",
    boton: "#60A5FA",
    botonTexto: "#0F0F12",
  },
};

// Una sola pantalla: los estilos dependen del tema
function getStyles(t) {
  return StyleSheet.create({
    contenedor: {
      flex: 1,
      backgroundColor: t.fondo,
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    tarjeta: {
      width: "100%",
      maxWidth: 400,
      backgroundColor: t.tarjeta,
      borderColor: t.borde,
      borderWidth: 1,
      borderRadius: 16,
      padding: 24,
      alignItems: "center",
    },
    titulo: { fontSize: 18, fontWeight: "600", color: t.texto },
    contador: {
      fontSize: 72,
      fontWeight: "bold",
      color: t.texto,
      marginVertical: 16,
      textAlign: "center",
    },
    aviso: { color: "#DC2626", marginBottom: 12, textAlign: "center" },
    fila: {
      flexDirection: "row",
      flexWrap: "wrap", // para que no se rompa en pantallas chicas
      justifyContent: "center",
      gap: 8,
    },
    boton: {
      backgroundColor: t.boton,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      minWidth: 90,
      alignItems: "center",
    },
    botonTexto: { color: t.botonTexto, fontWeight: "600", fontSize: 16 },
  });
}

function Boton({ titulo, onPress, disabled, styles }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: "rgba(255,255,255,0.3)" }}
      style={({ pressed }) => [
        styles.boton,
        { opacity: disabled ? 0.4 : pressed ? 0.7 : 1 },
      ]}
    >
      <Text style={styles.botonTexto}>{titulo}</Text>
    </Pressable>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  const [tema, setTema] = useState("claro");

  const styles = getStyles(temas[tema]);
  const llegoAlMax = count >= MAX;

  return (
    <View style={styles.contenedor}>
      <StatusBar style={tema === "claro" ? "dark" : "light"} />
      <View style={styles.tarjeta}>
        <Text style={styles.titulo}>Contador</Text>
        <Text style={styles.contador}>{count}</Text>
        {llegoAlMax && (
          <Text style={styles.aviso}>Llegaste al máximo ({MAX})</Text>
        )}
        <View style={styles.fila}>
          <Boton
            titulo="+1"
            onPress={() => setCount(count + 1)}
            disabled={llegoAlMax}
            styles={styles}
          />
          <Boton titulo="Reset" onPress={() => setCount(0)} styles={styles} />
          <Boton
            titulo={tema === "claro" ? "Oscuro" : "Claro"}
            onPress={() => setTema(tema === "claro" ? "oscuro" : "claro")}
            styles={styles}
          />
        </View>
      </View>
    </View>
  );
}
