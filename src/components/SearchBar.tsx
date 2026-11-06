import { Ionicons } from "@react-native-vector-icons/ionicons";
import { StyleSheet, TextInput, View } from "react-native";
import { darkColors, lightColors } from "../constants/colors";

type SearchBarProps = {
  SearchText: string;
  SetSearchText: (text: string) => void;
  Colors: typeof lightColors | typeof darkColors;
};

export default function SearchBar({ SearchText, SetSearchText, Colors }: SearchBarProps) {
    return (
        <View style={[styles.searchBar, { backgroundColor: Colors.modalBackground }, { borderColor: Colors.border }]}>
            <Ionicons name='search' size={24} color={Colors.icon} />
            <TextInput
                style={styles.searchBarInput}
                placeholder="Search..."
                placeholderTextColor={Colors.placeholder}
                value={SearchText}
                onChangeText={SetSearchText}
                clearButtonMode='always'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        gap: 15,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        padding: 16,
        borderRadius: 20,
        borderWidth: 3,
        backgroundColor: '#FFF',
        borderColor: 'rgba(172, 172, 172, .30)',
    },
    searchBarInput: {
        flex: 1,
        fontSize: 16,
        color: '#222222',
        backgroundColor: 'transparent',
    },
})