// FIX: The `styled` HOC is deprecated in NativeWind v4. The `className` prop can be used directly on React Native components.
import React from 'react';
import { SafeAreaView, View, Text, StatusBar } from 'react-native';

const App: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar barStyle="light-content" />
      <View className="flex-1 items-center justify-center p-4">
        <View className="p-8 border border-cyan-400 rounded-xl">
          <Text className="text-4xl font-bold mb-4 text-cyan-400 text-center">
            Olá, Mundo Nativo!
          </Text>
          <Text className="text-lg text-gray-300 mb-2 text-center">
            Este é o componente <Text className="font-semibold text-cyan-300">Mobile</Text> do projeto.
          </Text>
          <Text className="text-md text-gray-400 text-center">
            Construído com React Native & NativeWind.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
