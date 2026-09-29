import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  {
    id: '1',
    title: 'email',
    password: 'password123!',
  },
  {
    id: '2',
    title: 'work email',
    password: 'password123!',
  },
  {
    id: '3',
    title: 'work phone',
    password: 'password123!',
  },
];

type ItemType = {
  id: string;
  title: string;
  password: string;
}

export default function Index() {
  const [textToShow, setTextToShow] = useState<string | null>(null);
  const toggleTTS = (id: string) => {
    setTextToShow(prevTTS => (prevTTS === id ? null : id));
  };

  const Item = ({ item }: { item: ItemType }) => {
    const isShown = textToShow === item.id;

    return (
    <TouchableOpacity onPress={
      () => toggleTTS(item.id)
    }>
      <View style={styles.item}>
        <TouchableOpacity>
          <Ionicons name='create' size={24} color={'#222222'} />
        </TouchableOpacity>

        <Text style={styles.itemText}>{isShown ? item.password : item.title}</Text>
        
        <TouchableOpacity>
          <Ionicons name='trash' size={24} color={'#222222'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name='search' size={24} color={'#222222'} />
        <TextInput placeholder='search' placeholderTextColor="rgba(172, 172, 172, .30)" style={styles.searchBarInput} clearButtonMode='always'/>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={Item}
        extraData={textToShow}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.newItemButton}>
          <Text style={styles.newItemButtonText}>Create new password</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name='cog' size={50} color={'#222222'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#eff1f1',
  },
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
    color: '#222222'
  },
  item: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#C2D8C4',
    borderRadius: 20,
    padding: 16,
    marginBottom: 10,
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222222',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 20,
  },
  newItemButton: {
    flex: 1,
    backgroundColor: '#C2D8C4',
    padding: 20,
    borderRadius: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  newItemButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222'
  },
});
