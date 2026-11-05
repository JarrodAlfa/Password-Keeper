import { Ionicons } from "@react-native-vector-icons/ionicons";
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type CreateModalProps = {
    NewTitle: string;
    SetNewTitle: (text: string) => void;
    NewPassword: string;
    SetNewPassword: (text: string) => void;
    CreateModaleVisible: boolean;
    HandleCloseCreating: () => void;
    CheckCreateable: () => void;
}

export default function CreateModal({ NewTitle, NewPassword, CreateModaleVisible, HandleCloseCreating, SetNewTitle, SetNewPassword, CheckCreateable }: CreateModalProps) {
    return (
        <Modal
                visible={CreateModaleVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={HandleCloseCreating}
              >
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableOpacity style={styles.backButton} onPress={HandleCloseCreating}>
                      <Ionicons name='arrow-back-circle' size={50} color={'#222222'} />
                    </TouchableOpacity>
                    
                    <View style={styles.textView}>
                      <Text style={styles.editText}>enter your e-mail/user:</Text>
                    </View>
                    <View style={styles.inputView}>
                      <TextInput 
                        placeholder="mail/user" 
                        value={NewTitle} 
                        onChangeText={SetNewTitle} 
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
                        value={NewPassword}
                        secureTextEntry
                        onChangeText={SetNewPassword} 
                        placeholderTextColor="rgba(172, 172, 172, .30)" 
                        style={styles.editInputs}
                        autoCapitalize="none"
                        clearButtonMode='always'
                      />
                    </View>
                    <TouchableOpacity style={styles.confirmButton} onPress={CheckCreateable}>
                      <Text style={styles.editText}>Create</Text>
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