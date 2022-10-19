import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
} from "react-native";
import Divider from "react-native-divider";
import colors from "./colors.js";
import TempData from "./TempData.js";
import { AntDesign } from "@expo/vector-icons";
import TodoList from "./components/Todolist.js";
import AddListModal from "./components/AddListModal.js";
import Fire from "./Fire.js";
import firebase from "firebase";

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true,
  };

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  componentDidMount() {
    let fire = new Fire((error, user) => {
      if (error) {
        return alert(error);
      }
      fire.getLists((lists) => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });
      this.setState({ user });
    });
  }

  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  componentWillUnmount(){
    firebase.detach()
  }

  addList = (list) => {
    this.setState({
      lists: [
        ...this.state.lists,
        { ...list, id: this.state.lists.length + 1, todos: [] },
      ],
    });
  };
  updateList = (list) => {
    this.setState({
      lists: this.state.lists.map((item) => {
        return item.id === list.id ? list : item;
      }),
    });
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            size="large"
            color={colors.blue}
          ></ActivityIndicator>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModal
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>
        <View>
          <Text>User: {this.state.user.uid}</Text>
        </View>
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
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
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
