// mobile/components/PageLoader.jsx
import { View, ActivityIndicator } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

// A simple page loader component used during data fetching show a loading spinner
const PageLoader = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};
export default PageLoader;