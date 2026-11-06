import { Ionicons } from "@react-native-vector-icons/ionicons";
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { darkColors, lightColors } from "../constants/colors";

type EditModalProps = {
    Colors: typeof darkColors | typeof lightColors;
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

export default function EditModal({ Colors, EditTitle, OldPassword, EditPassword, EditModaleVisible, HandleCloseEditing, SetEditTitle, SetOldPassword, SetEditPassword, CheckSaveable }: EditModalProps) {
    return (
        <Modal
        visible={EditModaleVisible}
        transparent={true}
        animationType="slide"
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: Colors.background, }, { borderColor: Colors.border }]}>
            <TouchableOpacity style={styles.backButton} onPress={HandleCloseEditing}>
              <Ionicons name='arrow-back-circle' size={50} color={Colors.icon} />
            </TouchableOpacity>
            
            <View style={styles.textView}>
              <Text style={[styles.editText, { color: Colors.text }]}>change your e-mail/user:</Text>
            </View>
            <View style={[styles.inputView, { backgroundColor: Colors.modalBackground, borderColor: Colors.border }]}>
              <TextInput 
                placeholder="mail/user..." 
                value={EditTitle} 
                onChangeText={SetEditTitle} 
                placeholderTextColor={Colors.placeholder}
                style={[styles.editInputs, { color: Colors.text }]}
                clearButtonMode='always'
                autoCapitalize="none"
              />
            </View>
            <View style={styles.textView}>
              <Text style={[styles.editText, { color: Colors.text }]}>enter your old password:</Text>
            </View>
            <View style={[styles.inputView, { backgroundColor: Colors.modalBackground, borderColor: Colors.border }]}>
              <TextInput 
                placeholder="old password..."
                value={OldPassword}
                onChangeText={SetOldPassword}
                secureTextEntry 
                placeholderTextColor={Colors.placeholder}
                style={[styles.editInputs, { color: Colors.text }]}
                clearButtonMode='always'
                autoCapitalize="none"
              />
            </View>
            <View style={styles.textView}>
              <Text style={[styles.editText, { color: Colors.text }]}>enter your new password:</Text>
            </View>
            <View style={[styles.inputView, { backgroundColor: Colors.modalBackground, borderColor: Colors.border }]}>
              <TextInput 
                placeholder="new password..." 
                value={EditPassword}
                secureTextEntry
                onChangeText={SetEditPassword} 
                placeholderTextColor={Colors.placeholder}
                style={[styles.editInputs, { color: Colors.text }]}
                clearButtonMode='always'
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity style={[styles.confirmButton, { backgroundColor: Colors.item }]} onPress={CheckSaveable}>
              <Text style={[styles.editText, { color: Colors.text }]}>Save</Text>
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
        color: '#222222',
        backgroundColor: 'transparent',
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