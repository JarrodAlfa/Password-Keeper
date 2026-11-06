import { Ionicons } from "@react-native-vector-icons/ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { darkColors, lightColors } from "../constants/colors";

type FooterProps = {
  Colors: typeof darkColors | typeof lightColors;
  openCreateModal: () => void;
  openEditModal: () => void;
};

export default function Footer({ Colors, openCreateModal, openEditModal }: FooterProps) {
    return (
        <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.newItemButton, { backgroundColor: Colors.item }]}
              onPress={openCreateModal}  
            >
                <Text style={[styles.newItemButtonText, { color: Colors.text }]}>Create new password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={openEditModal}
                >
                <Ionicons name='cog' size={50} color={Colors.icon} />
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