import { useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CreateModal from "../components/CreateModal";
import EditModal from "../components/EditModal";
import Footer from "../components/Footer";
import Item from "../components/Item";
import SearchBar from "../components/SearchBar";
import SettingsModal from "../components/SettingsModal";

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
  const toggleNotifications = (value: boolean) => {
    setNotifications(value);

    if (value === true) {
      handleNotificationAlert();
    }
  }


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

  const handleNotificationAlert = () => {  
    Alert.alert(
      'Notifications',
      'Do you want to enable notifications?',
      [
        {
          text: 'OK',
          style: 'default',
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            setNotifications(false);
          }
        }
      ],
      {cancelable: true}
    );
 }

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
      <EditModal
        EditTitle={editTitle}
        OldPassword={oldPass}
        EditPassword={editPass}
        EditModaleVisible={EditModalVisible}
        HandleCloseEditing={HandleCloseEditing}
        SetEditTitle={setEditTitle}
        SetOldPassword={setOldPass}
        SetEditPassword={setEditPass}
        CheckSaveable={CheckSaveable}
      />

      <CreateModal
        NewTitle={newTitle}
        NewPassword={newPassword}
        CreateModaleVisible={CreateModalVisible}
        HandleCloseCreating={handleCloseCreate}
        SetNewTitle={setNewTitle}
        SetNewPassword={setNewPassword}
        CheckCreateable={handleCreateItem}
      />

      <SettingsModal
        DarkMode={darkMode}
        SetDarkMode={toggleDarkMode}
        Notifications={notifications}
        ToggleNotifications={toggleNotifications}
        SettingsModalVisible={SettingsModalVisible}
        HandleCloseSettings={handleCloseSettings}
      />

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

      <Footer 
        openCreateModal={handleOpenCreate}
        openEditModal={handleOpenSettings}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#eff1f1',
  },
});
