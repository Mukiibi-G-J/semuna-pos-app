import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS, PRODUCTS } from "../constants";
import { Product } from "../dto";
import { PrimaryButton } from "../components";
import { useContext } from "react";
import { Store } from "../context/Store";
import axiosInstance from "../helpers/axios";
import { handlePrint } from "../components/PrintReciept";
import { showMessage, hideMessage } from "react-native-flash-message";

//   import foods from '../../consts/food';
//   import {PrimaryButton} from '../components/Button';
//   import {COLORS} from '../../consts';

export const CartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [productQuantity, setProductQuantity] = React.useState(1);
  const [total, setTotal] = React.useState();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartProducts },
  } = state;
  const incrementQuantity: (args: Product) => void = (product_single) => {
    const existItem = cartProducts.find(
      (x: Product) => x.id === product_single.id
    )
      ? true
      : false;
    const my_product = cartProducts.find(
      (x: Product) => x.id === product_single.id
    );

    const quantity = existItem ? my_product.quantity + 1 : 1;
    setProductQuantity(quantity);
    dispatch({
      type: "CART_ADD_PRODUCT",
      payload: { ...product_single, quantity },
    });
  };
  const decrementQuantity: (args: Product) => void = (product_single) => {
    const existItem = cartProducts.find(
      (x: Product) => x.id === product_single.id
    )
      ? true
      : false;

    if (!existItem) {
      return;
    }
    const my_product = cartProducts.find(
      (x: Product) => x.id === product_single.id
    );
    const quantity = existItem ? my_product.quantity - 1 : 0;
    // quantity should not be less than 1
    if (quantity < 1) return;
    setProductQuantity(quantity);
    dispatch({
      type: "CART_ADD_PRODUCT",
      payload: { ...product_single, quantity },
    });
  };

  // const decrementQuantity = (product_single) => {
  //   const existItem = cartProducts.find(
  //     (x) => x.id === product_single.id
  //   )
  //     ? true
  //     : false;
  //   const my_product = cartProducts.find(
  //     (x) => x.id === product_single.id
  //   );
  //   const quantity = existItem && my_product.quantity - 1;
  //   // quantity should not be less than 1
  //   if (quantity < 1) return;
  //   setProductQuantity(quantity);
  //   dispatch({
  //     type: "CART_ADD_ITEM",
  //     payload: { ...product_single, quantity },
  //   });
  // };

  const CartCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
      <View style={style.cartCard}>
        <Image
          source={{ uri: `${product.product_image}` }}
          style={{ height: 80, width: 80 }}
        />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {product.product_name}
          </Text>
          {/* <Text style={{ fontSize: 13, color: COLORS.grey }}>
            {item.ingredients}
          </Text> */}
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            UGX {product.price.toLocaleString()}
          </Text>
        </View>
        <View style={{ marginRight: 20, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#000" }}>
            {product.quantity}
          </Text>
          <View style={style.actionBtn}>
            <TouchableOpacity onPress={() => decrementQuantity(product)}>
              <Icon name="remove" size={25} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => incrementQuantity(product)}>
              <Icon name="add" size={25} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const handleSubmit = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    try {
      const updatedCartProducts = cartProducts.map((product: Product) => {
        return {
          ...product,
          price: 2000,
          sales_price: product.price,
          discount: 0,
          user: "admin",
          date_sold: formattedDate,
        };
      });

      // console.log(data);
      const response = await axiosInstance.post(
        "/products/sales/",
        updatedCartProducts
      );
      console.log(response);

      handlePrint(updatedCartProducts, total);
      
      setTimeout(() => {
        showMessage({
          message: "Completed sucessfully",
          description: "This is our second message",
          type: "success",
        });
        dispatch({
          type: "REMOVE_ALL",
        });
        navigation.navigate("HomeScreen");
      }, 2000);
    } catch (e) {}
  };

  return (
    <>
      {cartProducts.length > 0 ? (
        <>
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
              data={cartProducts}
              renderItem={({ item }) => <CartCard product={item} />}
              ListFooterComponentStyle={{
                paddingHorizontal: 20,
                marginTop: 20,
              }}
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
                      Total Quantity
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {cartProducts.reduce(
                        (a: Number, c: any) => a + c.quantity,
                        0
                      )}
                    </Text>
                  </View>
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
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {cartProducts
                        .reduce(
                          (a: number, c: Product) => a + c.quantity * c.price,
                          0
                        )
                        .toLocaleString()}
                      {setTotal(
                        cartProducts
                          .reduce(
                            (a: number, c: Product) => a + c.quantity * c.price,
                            0
                          )
                          .toLocaleString()
                      )}
                    </Text>
                  </View>

                  <View style={{ marginHorizontal: 30 }}>
                    <PrimaryButton
                      title="CHECKOUT"
                      onPress={() => handleSubmit()}
                    />
                  </View>
                </View>
              )}
            />
          </SafeAreaView>
        </>
      ) : (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
          <View style={style.emptyCart}>
            <Icon name="shopping-cart" size={80} />
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "black",
              }}
            >
              Cart is Empty{" "}
            </Text>
          </View>
        </SafeAreaView>
      )}
    </>
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
  emptyCart: { alignItems: "center", justifyContent: "center", flex: 1 },
});
