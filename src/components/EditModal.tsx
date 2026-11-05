import { Ionicons } from "@react-native-vector-icons/ionicons";
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type EditModalProps = {
    EditTitle: string;
    SetEditTitle: (text: string) => void;
    OldPassword: string;
    SetOldPassword: (text: string) => void;
    EditPassword: string;
    SetEditPassword: (text: string) => void;
    EditModaleVisible: boolean;
    HandleCloseEditing: () => void;
    CheckSaveable: () => void;
};

export default function EditModal({ EditTitle, OldPassword, EditPassword, EditModaleVisible, HandleCloseEditing, SetEditTitle, SetOldPassword, SetEditPassword, CheckSaveable }: EditModalProps) {
    return (
        <Modal
        visible={EditModaleVisible}
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
                value={EditTitle} 
                onChangeText={SetEditTitle} 
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
                value={OldPassword}
                onChangeText={SetOldPassword}
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
                value={EditPassword}
                secureTextEntry
                onChangeText={SetEditPassword} 
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
})