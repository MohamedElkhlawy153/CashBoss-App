import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {COLORS} from '../constants/colors'

// A wrapper component to provide safe area padding and consistent background color
const SafeScreen = ({children}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{flex:1, paddingTop: insets.top, backgroundColor:COLORS.background}}>
        {children}
    </View>
  )
}

export default SafeScreen;