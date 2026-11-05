import { Ionicons } from "@react-native-vector-icons/ionicons";
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

type SettingsModalProps = {
    DarkMode: boolean;
    SetDarkMode: (value: boolean) => void;
    Notifications: boolean;
    SetNotifications: (value: boolean) => void;
    SettingsModalVisible: boolean;
    HandleCloseSettings: () => void;
};

export default function SettingsModal({ DarkMode, SetDarkMode, Notifications, SetNotifications, SettingsModalVisible, HandleCloseSettings }: SettingsModalProps) {
    return (
        <Modal
        visible={SettingsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={HandleCloseSettings}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.backButton} onPress={HandleCloseSettings}>
              <Ionicons name='arrow-back-circle' size={50} color={'#222222'} />
            </TouchableOpacity>

            <View style={styles.option}>
              <Text style={styles.itemText}>Dark mode</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#767577", true: "#C2D8C4" }}
                ios_backgroundColor="#3e3e3e"
                value={DarkMode}
                onValueChange={SetDarkMode}
              />
            </View>

            <View style={styles.option}>
              <Text style={styles.itemText}>Notifications</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#767577", true: "#C2D8C4" }}
                ios_backgroundColor="#3e3e3e"
                value={Notifications}
                onValueChange={SetNotifications}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        margin: 50,
        backgroundColor: '#eff1f1',
        borderWidth: 3,
        borderRadius: 20,
        borderColor: 'rgba(172, 172, 172, .30)',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center'
    },
    backButton: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginRight: 'auto'
    },
    itemText: {
    fontWeight: 'bold',        
    fontSize: 16,
    color: '#222222',
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
})