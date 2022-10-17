import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import Divider from "react-native-divider";
import colors from "./colors.js";
import TempData from "./TempData.js";
import { AntDesign } from "@expo/vector-icons";
import TodoList from "./components/Todolist.js";
import AddListModal from "./components/AddListModal.js";

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
  };
  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }
  renderList = (list) => {
    return <TodoList list={list} />;
  };
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModal closeModal={() => this.toggleAddTodoModal()} />
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <Divider style={styles.divider} />
          <Text style={styles.title}>
            Todo
            <Text style={{ fontWeight: "300", color: colors.blue }}>Lists</Text>
          </Text>
          <Divider style={styles.divider} />
        </View>

        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}
          >
            <AntDesign name="plus" size={16} color={colors.blue}></AntDesign>
          </TouchableOpacity>
          <Text style={styles.add}>Add list</Text>
        </View>
        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={TempData}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 3,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    alignItems: "center",
    padding: 16,
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});
