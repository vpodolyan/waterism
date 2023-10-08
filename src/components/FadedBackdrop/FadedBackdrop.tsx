import { useEffect } from 'react';
import { Pressable, StatusBar, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  onPress?: () => void;
}

export function FadedBackdrop({ onPress }: Props) {
  useEffect(() => {
    StatusBar.setBackgroundColor('rgba(0,0,0,0)');
    StatusBar.setTranslucent(true);
  }, []);

  return <Pressable style={styles.container} onPress={onPress} />;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.backdrop
  }
});
