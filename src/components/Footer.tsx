import { Ionicons } from "@react-native-vector-icons/ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type FooterProps = {
  openCreateModal: () => void;
  openEditModal: () => void;
};

export default function Footer({ openCreateModal, openEditModal }: FooterProps) {
    return (
        <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.newItemButton}
              onPress={openCreateModal}  
            >
                <Text style={styles.newItemButtonText}>Create new password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={openEditModal}
                >
                <Ionicons name='cog' size={50} color={'#222222'} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
}) 