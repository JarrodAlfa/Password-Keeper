import { Ionicons } from "@react-native-vector-icons/ionicons";
import { StyleSheet, TextInput, View } from "react-native";

type SearchBarProps = {
  SearchText: string;
  SetSearchText: (text: string) => void;
};

export default function SearchBar({ SearchText, SetSearchText }: SearchBarProps) {
    return (
        <View style={styles.searchBar}>
            <Ionicons name='search' size={24} color={'#222222'} />
            <TextInput
                style={styles.searchBarInput}
                placeholder="Search..."
                placeholderTextColor="#222222"
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