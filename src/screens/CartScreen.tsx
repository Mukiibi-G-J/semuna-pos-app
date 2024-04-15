import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS, PRODUCTS } from "../constants";
import { Product } from "../dto";
import { PrimaryButton } from "../components";
//   import foods from '../../consts/food';
//   import {PrimaryButton} from '../components/Button';
//   import {COLORS} from '../../consts';

export const CartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const CartCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
      <View style={style.cartCard}>
        <Image source={product.image} style={{ height: 80, width: 80 }} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {product.name}
          </Text>
          {/* <Text style={{ fontSize: 13, color: COLORS.grey }}>
            {item.ingredients}
          </Text> */}
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            ${product.price}
          </Text>
        </View>
        <View style={{ marginRight: 20, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#000" }}>
            3
          </Text>
          <View style={style.actionBtn}>
            <Icon name="remove" size={25} color={COLORS.white} />
            <Icon name="add" size={25} color={COLORS.white} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          onPress={navigation.goBack}
          color="black"
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}>
          Cart
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={PRODUCTS}
        renderItem={({ item }) => <CartCard product={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 15,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Total Price
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>$50</Text>
            </View>
            <View style={{ marginHorizontal: 30 }}>
              <PrimaryButton title="CHECKOUT" />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
 
