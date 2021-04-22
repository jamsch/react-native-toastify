# @jamsch/react-native-toastify

React Native stubs for the library `react-toastify`. Please note that not all exports are handled.

## Prerequisites

- react-native-paper
- react-native-vector-icons (specifically MaterialIcons included in your app's bundle)

## Installation

```sh
npm install @jamsch/react-native-toastify
```

## Usage

```js
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { toast, ToastContainer } from '@jamsch/react-native-toastify';

export default function App() {
  return (
    <View>
      {/** This element will render the toast */}
      <ToastContainer position="bottom-left" />

      {/** Somewhere else in your app */}
      <TouchableOpacity onPress={() => toast.success('Success!')}>
        <Text>Success toast</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toast.info('Info!')}>
        <Text>Info toast</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Usage in monorepos

If you're already using `react-toastify` in a shared monorepo, you may want to install `babel-plugin-module-resolver` and alias `react-toastify` to this library on your React Native project.

```js
module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          'react-toastify': '@jamsch/react-native-toastify',
        },
      },
    ],
  ],
};
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
