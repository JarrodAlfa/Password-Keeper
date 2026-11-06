import { Ionicons } from "@react-native-vector-icons/ionicons";
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { darkColors, lightColors } from "../constants/colors";

type SettingsModalProps = {
    Colors: typeof darkColors | typeof lightColors;
    DarkMode: boolean;
    SetDarkMode: (value: boolean) => void;
    Notifications: boolean;
    ToggleNotifications: (value: boolean) => void;
    SettingsModalVisible: boolean;
    HandleCloseSettings: () => void;
};

export default function SettingsModal({ Colors, DarkMode, SetDarkMode, Notifications, ToggleNotifications, SettingsModalVisible, HandleCloseSettings }: SettingsModalProps) {
    return (
        <Modal
        visible={SettingsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={HandleCloseSettings}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: Colors.modalBackground }, { borderColor: Colors.border }]}>
            <TouchableOpacity style={styles.backButton} onPress={HandleCloseSettings}>
              <Ionicons name='arrow-back-circle' size={50} color={Colors.icon} />
            </TouchableOpacity>

            <View style={styles.option}>
              <Text style={[styles.itemText, { color: Colors.text }]}>Dark mode</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: Colors.switchTrackOff, true: Colors.switchTrackOn }}
                ios_backgroundColor="#3e3e3e"
                thumbColor={Colors.switchThumb}
                value={DarkMode}
                onValueChange={SetDarkMode}
              />
            </View>

            <View style={styles.option}>
              <Text style={[styles.itemText, { color: Colors.text }]}>Notifications</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: Colors.switchTrackOff, true: Colors.switchTrackOn }}
                ios_backgroundColor="#3e3e3e"
                thumbColor={Colors.switchThumb}
                value={Notifications}
                onValueChange={ToggleNotifications}
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