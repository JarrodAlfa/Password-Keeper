import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  type ItemType = {
    id: string;
    title: string;
    password: string;
  };

  const [data, setData] = useState<ItemType[]>([
    {
      id: '1',
      title: 'email',
      password: 'password123!',
    },
    {
      id: '2',
      title: 'work email',
      password: 'working123!',
    },
    {
      id: '3',
      title: 'work phone',
      password: '1234',
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [editTitle, setEditTitle] = useState('');
  const [editPass, setEditPass] = useState('');

  const HandleOpenEditing = (item: ItemType) => {
    setSelectedItem(item);
    setModalVisible(true);

    setEditTitle(item.title);
    setEditPass(item.password);
  };

  const HandleCloseEditing = () => {
    setSelectedItem(null)
    setModalVisible(false)
  }

  const HandleSaveEdit = () => {
    if (!selectedItem) return;

    setData(prevData =>
      prevData.map(item =>
        item.id === selectedItem.id ? { ...item, title: editTitle, password: editPass} : item
      )
    )
    HandleCloseEditing();
  }

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
        <TouchableOpacity onPress={() => HandleOpenEditing(item)}>
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
      
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.backButton} onPress={HandleCloseEditing}>
              <Ionicons name='arrow-back-circle' size={50} color={'#222222'} />
            </TouchableOpacity>
            
            <View style={styles.textView}>
              <Text style={styles.editText}>change your e-mail/user:</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput placeholder="mail/user" value={editTitle} onChangeText={setEditTitle} placeholderTextColor="rgba(172, 172, 172, .30)" style={styles.editInputs}/>
            </View>
            <View style={styles.textView}>
              <Text style={styles.editText}>enter your old password:</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput placeholder="old password" placeholderTextColor="rgba(172, 172, 172, .30)" style={styles.editInputs}/>
            </View>
            <View style={styles.textView}>
              <Text style={styles.editText}>enter your new password:</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput placeholder="new password" onChangeText={setEditPass} placeholderTextColor="rgba(172, 172, 172, .30)" style={styles.editInputs}/>
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={HandleSaveEdit}>
              <Text style={styles.editText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  centeredView: {
    flex: 1,
    justifyContent: 'center'
  },
  modalView: {
    margin: 50,
    backgroundColor: '#eff1f1',
    borderWidth: 3,
    borderRadius: 20,
    borderColor: 'rgba(172, 172, 172, .30)',
  },
  backButton: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginRight: 'auto'
  },
  textView: {
    alignItems: 'center',
  },
  editText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222'
  },
  inputView: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    padding: 16,
    borderRadius: 20,
    borderWidth: 3,
    backgroundColor: '#FFF',
    borderColor: 'rgba(172, 172, 172, .30)',
  },
  editInputs: {
    flex: 1,
    fontSize: 16,
    color: '#222222'
  },
  confirmButton: {
    backgroundColor: '#C2D8C4',
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 70,
    alignItems: 'center',
  },
});
