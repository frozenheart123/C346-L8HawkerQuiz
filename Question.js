import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const getStatus = (selected, submitted, isCorrect) => {
  if (submitted) {
    return isCorrect
      ? { label: 'Correct', icon: 'circle-check', color: '#2D9D5B' }
      : { label: 'Wrong', icon: 'circle-xmark', color: '#D62828' };
  }
  if (selected) {
    return { label: 'Answered', icon: 'circle-check', color: '#B7791F' };
  }
  return null;
};

const Question = ({
  number,
  picture,
  prompt,
  options,
  answer,
  selected,
  submitted,
  onSelect,
}) => {
  const isCorrect = selected === answer;
  const status = getStatus(selected, submitted, isCorrect);

  let borderColor = '#EADBC4';
  if (submitted) {
    borderColor = isCorrect ? '#2D9D5B' : '#D62828';
  } else if (selected) {
    borderColor = '#FCBF49';
  }

  return (
    <View style={[styles.card, { borderColor }]}>
      <View style={styles.imageWrap}>
        <Image source={picture} style={styles.picture} resizeMode="cover" />
        <View style={styles.overlayRow}>
          <Text style={styles.numberChip}>Q{number}</Text>
          {status && (
            <View style={styles.statusChip}>
              <FontAwesome6
                name={status.icon}
                solid
                size={12}
                color={status.color}
              />
              <Text style={[styles.statusText, { color: status.color }]}>
                {status.label}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.prompt}>{prompt}</Text>

        <View style={[styles.pickerRow, { borderColor }]}>
          <View style={styles.pickerIcon}>
            <FontAwesome6 name="utensils" size={14} color="#2B2118" />
          </View>
          <Picker
            selectedValue={selected}
            onValueChange={(value) => onSelect(value)}
            enabled={!submitted}
            style={styles.picker}
            dropdownIconColor="#2B2118"
          >
            <Picker.Item label="Select an answer..." value="" color="#A08C74" />
            {options.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </View>

        {submitted && !isCorrect && (
          <View style={styles.answerRow}>
            <FontAwesome6 name="lightbulb" solid size={13} color="#B7791F" />
            <Text style={styles.answerText}>
              Correct answer: <Text style={styles.answerBold}>{answer}</Text>
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 18,
    overflow: 'hidden',
    boxShadow: '0 6px 14px rgba(43, 33, 24, 0.10)',
  },
  imageWrap: {
    height: 190,
  },
  picture: {
    width: '100%',
    height: '100%',
  },
  overlayRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberChip: {
    backgroundColor: '#D62828',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: 'hidden',
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '800',
  },
  body: {
    padding: 16,
  },
  prompt: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2B2118',
    lineHeight: 23,
    marginBottom: 12,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    backgroundColor: '#FFFBF4',
    overflow: 'hidden',
  },
  pickerIcon: {
    width: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCBF49',
  },
  picker: {
    flex: 1,
    height: 50,
    borderWidth: 0,
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#2B2118',
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    backgroundColor: '#FFF4DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  answerText: {
    flex: 1,
    fontSize: 14,
    color: '#5C4A36',
  },
  answerBold: {
    fontWeight: '800',
    color: '#2B2118',
  },
});
