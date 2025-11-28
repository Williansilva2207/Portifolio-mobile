import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';

const wordsList = [
  'Arrakis','Duna','Caladan','Salusa Secundus','Kaitain','Corrino',
  'Harkonnen','Atreides','Fremen','Bene Gesserit','Mentat','Sardaukar',
  "Muad'Dib","Kwisatz Haderach","Shai-Hulud","Especiaria","Melange",
  'Stilgar','Chani','Alia','Paul Atreides','Irulan','Gurney Halleck',
  'Duncan Idaho','Thufir Hawat','Liet-Kynes','Sietch','Crysknife',
  'Gom Jabbar','Água da Vida','Choam'
];

const imagens = [
  require('../../assets/images/Shai Hulud 1.png'),
  require('../../assets/images/Shai Hulud 2.png'),
  require('../../assets/images/Shai Hulud 3.png'),
  require('../../assets/images/Shai Hulud 4.png'),
  require('../../assets/images/Shai Hulud 5.png'),
  require('../../assets/images/Shai Hulud 6_1.png'),
  require('../../assets/images/Shai Hulud 7.png'),
  require('../../assets/images/Shai Hulud and Fremen.png'),
];

export default function Forca() {
  const [word, setWord] = useState('');
  const [inputLetter, setInputLetter] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [maxWrongGuesses, setMaxWrongGuesses] = useState(6);

  useEffect(() => {
    startGame();
  }, []);

  function startGame() {
    const newWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    setWord(newWord.toUpperCase());
    setGuessedLetters([]);
    setMaxWrongGuesses(6);
    setInputLetter('');
  }

  function handleSubmit() {
    const letter = inputLetter.toUpperCase().trim();

    if (!letter.match(/^[A-ZÇÁÉÍÓÚÂÊÔÃÕÜ]$/i)) {
      Alert.alert('Aviso', 'Digite apenas letras.');
      setInputLetter('');
      return;
    }

    if (guessedLetters.includes(letter)) {
      Alert.alert('Aviso', `A letra "${letter}" já foi usada!`);
      setInputLetter('');
      return;
    }

    setGuessedLetters((prev) => [...prev, letter]);

    if (!word.includes(letter)) {
      setMaxWrongGuesses((t) => t - 1);
    }

    setInputLetter('');
  }

  // normaliza caracteres removendo acentos para comparação
  const normalizeChar = (c: string) => c.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();

  // handle via teclado exibido na tela
  function handleGuess(letter: string) {
    const g = letter.toUpperCase();
    if (guessedLetters.includes(g)) {
      Alert.alert('Aviso', `A letra "${g}" já foi usada!`);
      return;
    }

    setGuessedLetters((prev) => [...prev, g]);

    const normalizedWord = word.split('').map((l) => normalizeChar(l));
    const normalizedGuess = normalizeChar(g);
    if (!normalizedWord.includes(normalizedGuess)) {
      setMaxWrongGuesses((t) => t - 1);
    }
  }

  function displayPalavra() {
    return word.split('').map((l, i) => {
      const visible =
        l === ' ' || l === '-' || l === "'" ||
        guessedLetters.some((g) => normalizeChar(g) === normalizeChar(l)) ||
        maxWrongGuesses <= 0;
      return (
        <Text key={i} style={styles.letra}>
          {visible ? l : '_'}
        </Text>
      );
    });
  }

  function getImagem() {
    const venceu = word.split('').every((l) => l === ' ' || l === '-' || guessedLetters.includes(l) || l === "'");
    const perdeu = maxWrongGuesses <= 0;

    if (venceu) return imagens[7];
    if (perdeu) return imagens[6];

    const index = 6 - maxWrongGuesses;
    return imagens[index];
  }

  function getImagemIndex() {
    const venceu = word.split('').every((l) => l === ' ' || l === '-' || guessedLetters.includes(l) || l === "'");
    const perdeu = maxWrongGuesses <= 0;

    if (venceu) return 7;
    if (perdeu) return 6;

    return 6 - maxWrongGuesses;
  }

  const normalizedWord = word.split('').map((l) => normalizeChar(l));
  const acertadas = guessedLetters.filter((l) => normalizedWord.includes(normalizeChar(l)));
  const erradas = guessedLetters.filter((l) => !normalizedWord.includes(normalizeChar(l)));
  const gameOver = maxWrongGuesses <= 0 || word.split('').every((l) => l === ' ' || l === '-' || l === "'" || guessedLetters.includes(l));

  const imageIndex = getImagemIndex();
  const imageSource = imagens[imageIndex];
  const opacity = useRef(new Animated.Value(1)).current;

  // pré-carregar imagens locais (no caso de require isso garante referência)
  useEffect(() => {
    imagens.forEach((img) => {
      // Image.prefetch aceita URIs; for local requires this is a no-op but safe
      try {
        Image.prefetch?.(img as any);
      } catch (e) {
        // ignore
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // animar opacidade quando o índice da imagem mudar
  useEffect(() => {
    opacity.setValue(0);
    Animated.timing(opacity, { toValue: 1, duration: 120, useNativeDriver: true }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageIndex]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Jogo da Forca - Tema Duna</Text>

        <View style={styles.imageWrap}>
          <Animated.Image source={imageSource} style={[styles.image, { opacity }]} resizeMode="contain" />
        </View>

        <View style={styles.palavra}>{displayPalavra()}</View>

        {!gameOver && (
          <View style={styles.keyboard}>
            {[
              'A','B','C','D','E','F','G',
              'H','I','J','K','L','M','N',
              'O','P','Q','R','S','T','U',
              'V','W','X','Y','Z','Ç'
            ].map((k) => {
              const used = guessedLetters.includes(k);
              return (
                <TouchableOpacity
                  key={k}
                  style={[styles.key, used && styles.keyUsed]}
                  onPress={() => handleGuess(k)}
                  disabled={used}
                >
                  <Text style={[styles.keyText, used && styles.keyTextUsed]}>{k}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <View style={styles.letrasUsadas}>
          <View style={styles.letrasRow}>
            <Text style={styles.bold}>Letras corretas: </Text>
            {acertadas.map((l, i) => (
              <Text key={i} style={[styles.letraUsed, styles.correta]}>{l}</Text>
            ))}
          </View>
          <View style={styles.letrasRow}>
            <Text style={styles.bold}>Letras erradas: </Text>
            {erradas.map((l, i) => (
              <Text key={i} style={[styles.letraUsed, styles.errada]}>{l}</Text>
            ))}
          </View>
        </View>

        {gameOver && (
          <View style={styles.status}>
            <Text style={styles.statusText}>{maxWrongGuesses <= 0 ? `Você perdeu! Palavra: ${word}` : 'Parabéns! Você ganhou!'}</Text>
            <TouchableOpacity style={styles.restartBtn} onPress={startGame}>
              <Text style={styles.restartText}>Reiniciar</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.tentativas}>Tentativas restantes: {maxWrongGuesses}</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 16, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  imageWrap: { width: '100%', height: 240, alignItems: 'center', justifyContent: 'center', marginBottom: 12, paddingHorizontal: 8 },
  image: { width: '90%', height: 200 },
  palavra: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: 12 },
  letra: { fontSize: 22, marginHorizontal: 4 },
  form: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, width: 120, textAlign: 'center', borderRadius: 6, marginRight: 8 },
  button: { backgroundColor: '#2B00FF', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: '700' },
  letrasUsadas: { width: '100%', marginVertical: 8 },
  letrasRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginVertical: 4 },
  letraUsed: { marginHorizontal: 6, fontSize: 16 },
  correta: { color: 'green' },
  errada: { color: 'red' },
  status: { alignItems: 'center', marginVertical: 12 },
  statusText: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  restartBtn: { backgroundColor: '#007AFF', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 6 },
  restartText: { color: '#fff', fontWeight: '700' },
  tentativas: { marginTop: 8, fontSize: 14 },
  bold: { fontWeight: '700' },
  keyboard: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginVertical: 12 },
  key: { width: 40, height: 40, backgroundColor: '#fff', margin: 4, alignItems: 'center', justifyContent: 'center', borderRadius: 6, borderWidth: 1, borderColor: '#ddd' },
  keyUsed: { backgroundColor: '#eee', borderColor: '#ccc' },
  keyText: { fontSize: 16, fontWeight: '700' },
  keyTextUsed: { color: '#999' },
});
