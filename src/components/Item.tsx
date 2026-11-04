import { Ionicons } from "@react-native-vector-icons/ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ItemType = {
  id: string;
  title: string;
  password: string;
};

type ItemProps = {
  item: ItemType;
  isShown: boolean;
  onToggle: (id: string) => void;
  onEdit: (item: ItemType) => void;
  onDelete: (id: string) => void;
}

export default function Item({ 
    item, 
    isShown, 
    onToggle, 
    onEdit, 
    onDelete 
}: ItemProps) {
    return (
      <View style={styles.item}>
        <TouchableOpacity 
          onPress={() => onEdit(item)}
          style={styles.sideButton}  
        >
          <Ionicons name='create' size={24} color={'#222222'} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.mainButton}
          onPress={() => onToggle(item.id)}
        >
          <Text style={styles.itemText}>
            {isShown ? item.password : item.title}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideButton}
          onPress={() => onDelete(item.id)}
          accessibilityRole="button"
          accessibilityLabel={`Delete ${item.title}`}
        >
          <Ionicons name='trash' size={24} color={'#222222'} />
        </TouchableOpacity>
      </View>
    )
  };

  const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#C2D8C4',
        borderRadius: 20,
        marginBottom: 10,
        overflow: 'hidden',
    },
    mainButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 16,
        flex: 1,
    },
    sideButton: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#222222',
    },
  });