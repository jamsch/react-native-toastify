import React from 'react';

import { Text, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { toast, ToastContainer } from '@jamsch/react-native-toastify';

export default function App() {
  return (
    <PaperProvider>
      <ToastContainer position="bottom-left" />
      <TouchableOpacity onPress={() => toast.success('Success!')}>
        <Text>Success toast</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toast.info('Info!')}>
        <Text>Info toast</Text>
      </TouchableOpacity>
    </PaperProvider>
  );
}
