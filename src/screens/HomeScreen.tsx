import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, PRODUCTS } from "../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;
import { Product, cartProduct } from "../dto";
import { Store } from "../context/Store";
import axiosInstance from "../helpers/axios";

const Card: React.FC<{
  product: Product;
  navigation: any;
  quantity: any;
}> = ({ product, navigation, quantity }) => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartProducts },
  } = state;

  // cartProducts;
  const addToCart: (args: cartProduct) => void = ({ product }) => {
    const existItem = cartProducts.find((x: any) => x.id === product.id)
      ? true
      : false;
    const my_product = cartProducts.find((x: any) => x.id === product.id);
    const quantity = existItem ? my_product.quantity + 1 : 1;
    dispatch({
      type: "CART_ADD_PRODUCT",
      payload: { ...product, quantity },
    });
  };

  // dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  // console.log(product)
  return (
    <TouchableHighlight
      underlayColor={COLORS.white}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("DetailsScreen", product)}
    >
      <View style={style.card}>
        <View style={{ alignItems: "center" }}>
          {/* <Image
            source={product.product_image}
            style={{ height: 120, width: 120 }}
          /> */}
          <Image
            style={{ height: 120, width: 120 }}
            source={{
              uri: `${product.product_image}`,
            }}
          />
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {product.product_name}
          </Text>
          <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
            {product.description}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>
            UGX {product.price.toLocaleString()}
          </Text>
          <TouchableOpacity
            onPress={() =>
              addToCart({
                product,
                quantity: 1,
              })
            }
          >
            <View style={style.addToCartBtn}>
              <Icon name="add" size={20} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  );
};
export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [productQuantity, setProductQuantity] = useState(1);
  const [searchData, setSearchData] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Store);
  const {
    getProducts: { products },
  } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/products/");
        dispatch({
          type: "GET_PRODUCTS",
          payload: res.data.slice(0, 10),
        });
        // console.log(res.data);
        // console.log(products);
      } catch (error) {
        // console.log(error.response?.data);
        // console.log("Error fetching data:", error.message);
        // console.error("Axios error:", error.message);
        // console.error("Axios request:", error.config);
      }
    };

    fetchData();
  }, []);

  const searchProduct = async (text: any) => {
    setLoading(true);
    console.log(text);
    try {
      const res = await axiosInstance.get(`/products/filter/?q=${text}`);

      if (res.data) {
        setSearchData(res.data);
        console.log(searchData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={style.header}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 28, color: "black" }}>Hello,</Text>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  marginLeft: 10,
                  color: "black",
                }}
              >
                Joseph
              </Text>
            </View>
            <Text style={{ marginTop: 5, fontSize: 22, color: COLORS.grey }}>
              What do you want today
            </Text>
          </View>
          {/* <Image
            source={require("../../assets/person.png")}
            style={{ height: 50, width: 50, borderRadius: 25 }}
          /> */}
        </View>
        <View
          style={{
            marginTop: 40,
            flexDirection: "row",
            paddingHorizontal: 20,
          }}
        >
          <View style={style.inputContainer}>
            <Icon name="search" size={28} color="grey" />
            <TextInput
              style={{ flex: 1, fontSize: 18 }}
              placeholder="Search for products"
              onChangeText={(text) => setSearchText(text)}
            />
          </View>
          {/* {searchData.map((item) => (
            <View key={item.id}>
              <Text>{item.product_name}</Text>
            </View>
          ))} */}
          <TouchableOpacity onPress={() => searchProduct(searchText)}>
            <View style={style.sortBtn}>
              <Icon name="tune" size={28} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </View>
        <View>{/* <ListCategories /> */}</View>
        <View style={style.productColumn}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            searchData?.map((item) => (
              <Card
                key={item.id}
                product={item}
                navigation={navigation}
                quantity={productQuantity}
              />
            ))
          )}
        </View>
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={PRODUCTS}
          renderItem={({ item }) => (
            <Card
              product={item}
              navigation={navigation}
              quantity={productQuantity}
            />
          )}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.light,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: 250,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  productColumn: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
