import React, { useEffect, useMemo } from 'react';
import {
  Keyboard,
  StyleProp,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { TypeOptions, ToastPosition, Id, ToastOptions } from './types';
import create from 'zustand';
import { TYPE, POSITION } from './constants';
export * from './types';

const noop = () => {};

export const cssTransition = noop;
export const collapseToast = noop;
export const useToast = noop;
export const useToastContainer = noop;
export const Bounce = noop;
export const Flip = noop;
export const Slide = noop;
export const Zoom = noop;

type ToastParams = {
  /** Unique identifier */
  id?: number;
  /** The message to show */
  message: string;
  /** Type of toast */
  type: TypeOptions;
  /**  Position of the toast */
  position: ToastPosition;
  /** Toast duration */
  duration: number;
  /** Toast Visibility */
  visibility: boolean;
  /** Toast Action onPress */
  action?: () => void;
  /** Toast Action Label */
  actionLabel: string;
};

/** Map react-toastify positions to either top or bottom */
const positionMap: Record<ToastPosition, string> = {
  'bottom-left': 'bottom',
  'bottom-right': 'bottom',
  'top-left': 'top',
  'top-right': 'top',
  'bottom-center': 'bottom',
  'top-center': 'top',
} as const;

const defaults: ToastParams = {
  id: 1,
  message: '',
  type: 'info',
  position: 'bottom-left',
  duration: 2000,
  visibility: false,
  action: undefined,
  actionLabel: 'DONE',
};

const useToastState = create<ToastParams>(() => defaults);

useToastState.subscribe((state, prev) => {
  if (
    state.position !== prev.position &&
    positionMap[state.position] === 'bottom'
  ) {
    Keyboard.dismiss();
  }
});

const createToast = (type: TypeOptions) => (
  message: string,
  options?: ToastOptions
) => {
  // @ts-ignore
  useToastState.setState((s) => ({
    ...options,
    message,
    type,
    visibility: true,
    id: (s.id || 0) + 1,
  }));
};

const toast = (content: string, options?: ToastOptions) =>
  createToast('success')(content, options);

toast.POSITION = POSITION;
toast.type = TYPE;
toast.success = createToast('success');
toast.info = createToast('info');
toast.error = createToast('error');
toast.warning = createToast('warning');
toast.dark = createToast('dark');
toast.warn = createToast('warning');
toast.dismiss = (_id?: Id) => useToastState.setState({ visibility: false });
toast.hide = () => useToastState.setState({ visibility: false });
toast.clearWaitingQueue = noop;
toast.update = noop;
toast.done = noop;
toast.onChange = noop;
toast.isActive = () => false;
toast.configure = (config: ToastContainerProps = {}) => {
  useToastState.setState((s) => ({
    duration: config.duration || s.duration,
  }));
};

export { toast };

export interface ToastContainerProps {
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  /** Duration to render toast */
  duration?: number;
  position?: ToastParams['position'];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  textStyle,
  style,
  position,
}) => {
  // Set initial state
  useEffect(() => {
    if (position) {
      useToastState.setState({ position });
    }
  }, [position]);

  const state = useToastState();

  const wrapperStyle = useMemo((): StyleProp<ViewStyle> => {
    const position = positionMap[state.position];
    return {
      bottom: position === 'bottom' ? 0 : undefined,
      top: position === 'top' ? 0 : undefined,
    };
  }, [state.position]);

  return (
    <Snackbar
      key={`toast.${state.id || 0}`}
      onDismiss={toast.hide}
      style={[types[state.type], style]}
      wrapperStyle={wrapperStyle}
      duration={state.duration}
      visible={state.visibility}
      action={
        state.action
          ? { label: state.actionLabel, onPress: state.action }
          : undefined
      }
    >
      <Icon size={16} name={icons[state.type]} color="#ffffff" />
      <Text style={[styles.message, textStyle]}>{`  ${state.message}`}</Text>
    </Snackbar>
  );
};

type ToastIconType = {
  [key in TypeOptions]: string;
};

const icons: ToastIconType = {
  info: 'info',
  warning: 'error-outline',
  success: 'check',
  error: 'error-outline',
  dark: 'info',
  default: 'info',
};

type ToastStyles = {
  [key in TypeOptions]: ViewStyle;
};

const types = StyleSheet.create<ToastStyles>({
  info: {
    backgroundColor: 'rgba(81,98,188,0.9)',
  },
  success: {
    backgroundColor: 'rgba(75,153,79,0.9)',
  },
  warning: {
    backgroundColor: 'rgba(254,177,25,0.9)',
  },
  error: {
    backgroundColor: 'rgba(216,25,25,0.9)',
  },
  dark: {},
  default: {},
});

const styles = StyleSheet.create({
  message: {
    fontSize: 20,
    color: '#ffffff',
  },
});
