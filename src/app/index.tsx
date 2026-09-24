import { Ionicons } from "@react-native-vector-icons/ionicons";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const DATA = [
      {
        id: 1,
        title: 'email',
        password: 'password123!',
      },
      {
        id: 2,
        title: 'work email',
        password: 'password123!',
      },
      {
        id: 3,
        title: 'work phone',
        password: 'password123!',
      },
    ]
    
  type ItemProps = {title: string; password: string};

  const Item = ({title, password}: ItemProps) => (
    <View style={styles.item}>
      <TouchableOpacity>
        <Ionicons name='create' size={24} color={'333'} />
      </TouchableOpacity>

      <Text style={styles.itemText}>{title}</Text>
      
      <TouchableOpacity>
        <Ionicons name='trash' size={24} color={'333'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name='search' size={24} color={'333'} />
        <TextInput placeholder='search' placeholderTextColor="rgba(172, 172, 172, .30)" style={styles.searchBarInput} clearButtonMode='always'/>
      </View>

      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} password={item.password} />}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  searchBar: {
    gap: 10,
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
    color: '#000000'
  },
  item: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#64C674',
    borderRadius: 20,
    padding: 16,
    marginBottom: 10,
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});
