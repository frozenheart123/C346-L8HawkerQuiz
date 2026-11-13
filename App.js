import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Question from './Question';

const questions = [
  {
    id: 1,
    picture: require('./img/chicken_rice.jpg'),
    prompt: 'What is this hawker favourite called?',
    options: ['Nasi Lemak', 'Duck Rice', 'Hainanese Chicken Rice', 'Nasi Padang'],
    answer: 'Hainanese Chicken Rice',
  },
  {
    id: 2,
    picture: require('./img/laksa.jpg'),
    prompt: 'Name this spicy coconut noodle soup.',
    options: ['Mee Siam', 'Laksa', 'Prawn Noodles', 'Mee Rebus'],
    answer: 'Laksa',
  },
  {
    id: 3,
    picture: require('./img/satay.jpg'),
    prompt: 'What are these grilled skewers called?',
    options: ['Otah', 'BBQ Chicken Wings', 'Sambal Stingray', 'Satay'],
    answer: 'Satay',
  },
  {
    id: 4,
    picture: require('./img/chilli_crab.jpg'),
    prompt: 'Which crab dish is this?',
    options: ['Chilli Crab', 'Black Pepper Crab', 'Salted Egg Crab', 'Crab Bee Hoon'],
    answer: 'Chilli Crab',
  },
  {
    id: 5,
    picture: require('./img/kaya_toast.jpg'),
    prompt: 'Which breakfast set is this?',
    options: ['Roti Prata', 'Chwee Kueh', 'Kaya Toast', 'Carrot Cake'],
    answer: 'Kaya Toast',
  },
  {
    id: 6,
    picture: require('./img/char_kway_teow.jpg'),
    prompt: 'Name this wok-fried noodle dish.',
    options: ['Hokkien Mee', 'Hor Fun', 'Mee Goreng', 'Char Kway Teow'],
    answer: 'Char Kway Teow',
  },
];

const showResult = (title, message) => {
  if (Platform.OS === 'web') {
    window.alert(title + '\n' + message);
  } else {
    Alert.alert(title, message);
  }
};

const getFeedback = (score, total) => {
  if (score === total) {
    return 'Perfect score! You are a true hawker food expert.';
  }
  if (score >= total / 2) {
    return 'Well done!';
  }
  return 'You can do better next time.';
};

export default function App() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const scrollRef = useRef(null);

  const total = questions.length;
  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const score = questions.filter((q) => answers[q.id] === q.answer).length;
  const progress = (answeredCount / total) * 100;

  const submitAnswers = () => {
    setSubmitted(true);
    showResult(
      getFeedback(score, total),
      'You have ' + score + ' correct answers out of ' + total + '!'
    );
  };

  const tryAgain = () => {
    setAnswers({});
    setSubmitted(false);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.logo}>
            <FontAwesome6 name="bowl-food" size={22} color="#2B2118" />
          </View>
          <View style={styles.titleText}>
            <Text style={styles.title}>Hawker Food Quiz</Text>
            <Text style={styles.subtitle}>
              How well do you know Singapore's local dishes?
            </Text>
          </View>
        </View>

        <View style={styles.progressBox}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>YOUR PROGRESS</Text>
            <Text style={styles.progressCount}>
              {answeredCount} / {total} answered
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: progress + '%' }]} />
          </View>
        </View>
      </View>

      <ScrollView ref={scrollRef} contentContainerStyle={styles.list}>
        {questions.map((question, index) => (
          <Question
            key={question.id}
            number={index + 1}
            picture={question.picture}
            prompt={question.prompt}
            options={question.options}
            answer={question.answer}
            selected={answers[question.id] || ''}
            submitted={submitted}
            onSelect={(value) =>
              setAnswers((prev) => ({ ...prev, [question.id]: value }))
            }
          />
        ))}

        {submitted ? (
          <View style={styles.resultCard}>
            <View style={styles.trophy}>
              <FontAwesome6 name="trophy" size={26} color="#2B2118" />
            </View>
            <Text style={styles.resultLabel}>YOUR SCORE</Text>
            <Text style={styles.resultScore}>
              {score} / {total}
            </Text>
            <Text style={styles.resultFeedback}>{getFeedback(score, total)}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={tryAgain}>
              <FontAwesome6 name="rotate-right" size={14} color="#D62828" />
              <Text style={styles.retryText}>TRY AGAIN</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity style={styles.button} onPress={submitAnswers}>
              <FontAwesome6 name="paper-plane" solid size={16} color="#FFFFFF" />
              <Text style={styles.buttonText}>SUBMIT ANSWERS</Text>
            </TouchableOpacity>
            <Text style={styles.hint}>
              {answeredCount === total
                ? 'All done! Tap submit to see your score.'
                : total - answeredCount + ' question(s) left to answer'}
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          <FontAwesome6 name="mug-hot" size={14} color="#B7791F" />
          <Text style={styles.footerText}>Developed by NELSON (24039810)</Text>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6E9',
  },
  header: {
    backgroundColor: '#2B2118',
    paddingTop: 56,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FCBF49',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: '#E8D9C3',
    fontSize: 13,
    marginTop: 2,
  },
  progressBox: {
    marginTop: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    padding: 12,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    color: '#FCBF49',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  progressCount: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#FCBF49',
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#D62828',
    borderRadius: 14,
    paddingVertical: 16,
    boxShadow: '0 6px 14px rgba(214, 40, 40, 0.30)',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  hint: {
    textAlign: 'center',
    color: '#7A6A58',
    fontSize: 13,
    marginTop: 10,
  },
  resultCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderTopWidth: 6,
    borderTopColor: '#FCBF49',
    padding: 20,
    boxShadow: '0 6px 14px rgba(43, 33, 24, 0.10)',
  },
  trophy: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FCBF49',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultLabel: {
    color: '#7A6A58',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  resultScore: {
    color: '#2B2118',
    fontSize: 40,
    fontWeight: '900',
    marginTop: 2,
  },
  resultFeedback: {
    color: '#5C4A36',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 4,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#D62828',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 16,
  },
  retryText: {
    color: '#D62828',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 18,
  },
  footerText: {
    color: '#7A6A58',
    fontSize: 13,
  },
});
