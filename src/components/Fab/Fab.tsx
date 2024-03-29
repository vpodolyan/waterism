import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { FadedBackdrop } from '../FadedBackdrop/FadedBackdrop';

interface Props {
  onPrimaryButtonClick: () => void;
  onSencodaryButtonClick: () => void;
}

export function Fab({ onPrimaryButtonClick, onSencodaryButtonClick }: Props) {
  const [expanded, setExpanded] = useState(false);

  const primaryButtonAnimatedStyle = useAnimatedStyle(() => ({
    width: withTiming(expanded ? 48 : 130, { duration: 100 })
  }));

  const secondaryButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: expanded ? withTiming(-52, { duration: 100 }) : 0 }]
  }));

  const handlePrimaryPress = () => {
    onPrimaryButtonClick();
    expanded && setExpanded(false);
  };

  const handleSecondaryPress = () => {
    onSencodaryButtonClick();
    expanded && setExpanded(false);
  };

  return (
    <>
      {expanded && <FadedBackdrop onPress={() => setExpanded(false)} />}

      {expanded && (
        <View style={styles.expandedLabelsContainer}>
          <Text style={styles.label}>Replace filter</Text>
          <Text style={styles.label}>Add bottle</Text>
        </View>
      )}

      <Animated.View style={[styles.secondaryButtonContainer, secondaryButtonAnimatedStyle]}>
        <Pressable onPress={handleSecondaryPress}>
          <Icon name="refresh" color={colors.white} size={20} />
        </Pressable>
      </Animated.View>

      <Animated.View style={[styles.primaryButtonContainer, primaryButtonAnimatedStyle]}>
        <Pressable onPress={handlePrimaryPress}>
          {!expanded && <Text style={styles.label}>Add bottle</Text>}
          {expanded && <Icon name="add" size={20} color={colors.white} />}
        </Pressable>
        {!expanded && (
          <Pressable onPress={() => setExpanded(true)} hitSlop={{ top: 10, bottom: 12, right: 10, left: 2 }}>
            <Icon name="arrow-drop-up" style={styles.upIcon} size={20} color={colors.white} />
          </Pressable>
        )}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  primaryButtonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 12,
    right: 12,
    elevation: 4,
    borderRadius: 100,
    backgroundColor: colors.primary,
    padding: 14,
    height: 48
  },
  label: {
    color: colors.white,
    fontWeight: '500',
    textTransform: 'uppercase'
  },
  expandedLabelsContainer: {
    position: 'absolute',
    right: 80,
    bottom: 25,
    height: 75,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  secondaryButtonContainer: {
    position: 'absolute',
    right: 14,
    bottom: 16,
    backgroundColor: colors.red,
    width: 44,
    height: 44,
    borderRadius: 100,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  upIcon: {
    marginLeft: 2
  }
});
