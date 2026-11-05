import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { Alert, FlatList, KeyboardAvoidingView, Modal, Platform, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Item from "../components/Item";
import SearchBar from "../components/SearchBar";

type ItemType = {
  id: string;
  title: string;
  password: string;
};

export default function Index() {
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
  
  const [EditModalVisible, setEditModalVisible] = useState(false);
  const [CreateModalVisible, setCreateModalVisible] = useState(false);
  const [SettingsModalVisible, setSettingsModalVisible] = useState(false);
  
  const [newTitle, setNewTitle] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(previousState => !previousState);
  const [notifications, setNotifications] = useState(false);
  const toggleNotifications = () => setNotifications(previousState => !previousState);

  const [editTitle, setEditTitle] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [editPass, setEditPass] = useState('');

  const [searchText, setSearchText] = useState('');
  const filteredData = data.filter(item =>
    item.title.toLocaleLowerCase().includes(searchText.trim().toLowerCase())
  );

  const [textToShow, setTextToShow] = useState<string | null>(null);
  const toggleTTS = (id: string) => {
    setTextToShow(prevTTS => (prevTTS === id ? null : id));
  };

  const handleDeleteItem = (id: string) => {
    Alert.alert(
      'Delete password',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setData(PrevData =>
              PrevData.filter(item => item.id !== id)
            );

            setTextToShow(prev => prev === id ? null : prev);
          }
        }
      ],
      {cancelable: true}
    );
  };

  const handleOpenSettings = () => {
    setSettingsModalVisible(true);
  }

  const handleCloseSettings = () => {
    setSettingsModalVisible(false);
  }

  const handleOpenCreate = () => {
    setNewTitle('');
    setNewPassword('');
    setCreateModalVisible(true);
  };

  const handleCloseCreate = () => {
    setCreateModalVisible(false);
    setNewTitle('');
    setNewPassword('');
  };

  const handleCreateItem = () => {
    const title = newTitle.trim();

    if (!title || !newPassword) {
      alert('Please fill in both fields.');
      return;
    }

    const newItem: ItemType = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      password: newPassword
    };

    setData(prevData => [...prevData, newItem]);

    handleCloseCreate();
  }

  const HandleOpenEditing = (item: ItemType) => {
    setSelectedItem(item);
    setEditModalVisible(true);

    setEditTitle(item.title);
    setOldPass('');
    setEditPass('');
  };

  const HandleCloseEditing = () => {
    setSelectedItem(null)
    setEditModalVisible(false)
    setOldPass('')
    setEditPass('')
  }

  const CheckSaveable = () => {
    if (!selectedItem) return;

    if (!editTitle.trim() || !oldPass || !editPass) {
      alert('Please fill in all fields.');
      return;
    }

    if (oldPass !== selectedItem.password) {
      alert('Your old password is incorrect.');
      return;
    }
    
    HandleSaveEdit();
  };

  const HandleSaveEdit = () => {
    if (!selectedItem) return;

    setData(prevData =>
      prevData.map(item =>
        item.id === selectedItem.id ? { 
          ...item, 
          title: editTitle, 
          password: editPass} 
        : item
      )
    );

    HandleCloseEditing();
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar SearchText={searchText} SetSearchText={setSearchText} />
      
      <Modal
        visible={EditModalVisible}
        transparent={true}
        animationType="slide"
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.backButton} onPress={HandleCloseEditing}>
              <Ionicons name='arrow-back-circle' size={50} color={'#222222'} />
            </TouchableOpacity>
            
            <View style={styles.textView}>
              <Text style={styles.editText}>change your e-mail/user:</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput 
                placeholder="mail/user" 
                value={editTitle} 
                onChangeText={setEditTitle} 
                placeholderTextColor="rgba(172, 172, 172, .30)" 
                style={styles.editInputs}
                clearButtonMode='always'
                autoCapitalize="none"
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.editText}>enter your old password:</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput 
                placeholder="old password"
                value={oldPass}
                onChangeText={setOldPass}
                secureTextEntry 
                placeholderTextColor="rgba(172, 172, 172, .30)" 
                style={styles.editInputs}
                clearButtonMode='always'
                autoCapitalize="none"
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.editText}>enter your new password:</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput 
                placeholder="new password" 
                value={editPass}
                secureTextEntry
                onChangeText={setEditPass} 
                placeholderTextColor="rgba(172, 172, 172, .30)" 
                style={styles.editInputs}
                clearButtonMode='always'
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={CheckSaveable}>
              <Text style={styles.editText}>Save</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={CreateModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseCreate}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.backButton} onPress={handleCloseCreate}>
              <Ionicons name='arrow-back-circle' size={50} color={'#222222'} />
            </TouchableOpacity>
            
            <View style={styles.textView}>
              <Text style={styles.editText}>enter your e-mail/user:</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput 
                placeholder="mail/user" 
                value={newTitle} 
                onChangeText={setNewTitle} 
                placeholderTextColor="rgba(172, 172, 172, .30)" 
                style={styles.editInputs}
                autoCapitalize="none"
                clearButtonMode='always'
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.editText}>enter your password:</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput 
                placeholder="new password" 
                value={newPassword}
                secureTextEntry
                onChangeText={setNewPassword} 
                placeholderTextColor="rgba(172, 172, 172, .30)" 
                style={styles.editInputs}
                autoCapitalize="none"
                clearButtonMode='always'
              />
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={handleCreateItem}>
              <Text style={styles.editText}>Create</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={SettingsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseSettings}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.backButton} onPress={handleCloseSettings}>
              <Ionicons name='arrow-back-circle' size={50} color={'#222222'} />
            </TouchableOpacity>

            <View style={styles.option}>
              <Text style={styles.itemText}>Dark mode</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#767577", true: "#C2D8C4" }}
                ios_backgroundColor="#3e3e3e"
                value={darkMode}
                onValueChange={toggleDarkMode}
              />
            </View>

            <View style={styles.option}>
              <Text style={styles.itemText}>Notifications</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#767577", true: "#C2D8C4" }}
                ios_backgroundColor="#3e3e3e"
                value={notifications}
                onValueChange={toggleNotifications}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        extraData={textToShow}
        renderItem={({ item }) => (
          <Item 
            item={item}
            isShown={textToShow === item.id}
            onToggle={toggleTTS}
            onEdit={HandleOpenEditing}
            onDelete={handleDeleteItem}
          />
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.newItemButton}
          onPress={handleOpenCreate}  
        >
          <Text style={styles.newItemButtonText}>Create new password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOpenSettings}
        >
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
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  switch: {
    marginLeft: 10,
  }
});
