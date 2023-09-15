import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowUturnLeftIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../../features/basketSlice";
import BasketIcon from "../../components/Basket/BasketIcon";
import BackButton from "../../components/BackButton";
import ImageModal from "./ImageModal";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Easing } from "react-native-reanimated";

const FoodScreen = () => {
  const navigation = useNavigation();

  const [catName, setCatName] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState(null);

  const [isPressedAdd, setIsPressedAdd] = useState(false);
  const [isPressedRemove, setIsPressedRemove] = useState(false);

  const colorValueAdd = useRef(new Animated.Value(0)).current;
  const colorValueRemove = useRef(new Animated.Value(0)).current;

  const handlePressInAdd = () => {
    setIsPressedAdd(true);

    // const colorChange = Animated.timing(colorValueAdd, {
    //   toValue: 1,
    //   duration: 250,
    //   useNativeDriver: false,
    // });

    // const colorReset = Animated.timing(colorValueAdd, {
    //   toValue: 0,
    //   duration: 250,
    //   useNativeDriver: false,
    // });

    // Animated.sequence([colorChange, colorReset]).start(() => {
    //   setIsPressedAdd(false);
    // });
  };

  const handlePressInRemove = () => {
    setIsPressedRemove(true);

    const colorChange = Animated.timing(colorValueRemove, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    });

    const colorReset = Animated.timing(colorValueRemove, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    });

    Animated.sequence([colorChange, colorReset]).start(() => {
      setIsPressedRemove(false);
    });
  };

  const shadowAdd = colorValueAdd.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e5e7eb", "rgba(254, 108, 68, 0.5)"],
  });

  const shadowRemove = colorValueRemove.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e5e7eb", "rgba(107, 114, 128, 0.5)"],
  });

  const openImageModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setModalImageUrl(null);
  };

  //import root props
  const {
    params: { item },
  } = useRoute();

  const dispatch = useDispatch();
  const [isBuy, setIsBuy] = useState(false);

  const totalQuantityForFoodItem = useSelector((state) =>
    selectBasketItemsWithId(state, item.docName)
  );

  const addItemToBasket = () => {
    dispatch(addToBasket(item));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket(item));
  };


  useEffect(() => {
    const categoryDocRef = doc(db, "categories", item.categoryId);

    getDoc(categoryDocRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const categoryData = docSnapshot.data();

          setCatName(categoryData.name);
         
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error category:", error);
      });
  }, []);

  const goToFoodCategory = () => {
    navigation.navigate("FoodCategory", {
      docName: item.categoryId,
    });
  };

  return (
    <SafeAreaView className="bg-white px-4 py-2 flex-1">
      <View className="bg-white flex-row justify-between items-center">
        <BackButton />
        <Text className="text-xl font-bold text-black">Details</Text>
        <BasketIcon />
      </View>
      <TouchableOpacity className="my-2" onPress={goToFoodCategory}>
        <View className="flex-row gap-1 items-center rounded-sm p-1">
          <ArrowUturnLeftIcon size={16} color={"black"} />
          <Text className="text-black ">
            {catName}/
            {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}
          </Text>
        </View>
      </TouchableOpacity>

      <ScrollView>
        <View className="">
          <View className="my-10">
            <TouchableOpacity onPress={() => openImageModal(item.img)}>
              <Image
                className="h-52 w-full rounded-2xl"
                source={{
                  uri: item.img,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text className="text-2xl  font-bold">{item.name}</Text>
          <Text className="text-gray-600 pt-4">{item.description}</Text>
          <View className="flex-row mt-10 space-x-2 mx-4">
            <Animated.View
              className="bg-gray-200  rounded-xl p-2 w-1/2 m-auto flex-row justify-around shadow-lg "
              style={{
                shadowColor: isPressedRemove ? shadowRemove : shadowAdd,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  handlePressInRemove();
                  removeItemFromBasket();
                }}
              >
                <Text className="text-black  font-bold text-lg text-center">
                  -
                </Text>
              </TouchableOpacity>

              <Text className="text-black  font-bold text-lg text-center">
                Add{" "}
                {totalQuantityForFoodItem > 0
                  ? `(${totalQuantityForFoodItem}х)`
                  : ""}
              </Text>

              <TouchableOpacity
                // onPress={addItemToBasket}
                onPress={() => {
                  handlePressInAdd();
                  addItemToBasket();
                }}
              >
                <Text className="text-black  font-bold text-lg text-center">
                  +
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity
              className="bg-[#fe6c44] rounded-xl p-2 w-1/2 m-auto"
              onPress={() => {
                handlePressInAdd();
                addItemToBasket();
              }}
            >
              <Text className="text-white  font-bold text-lg text-center">
                Buy now ${parseFloat(item.price).toFixed(2)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <ImageModal imageUrl={modalImageUrl} onClose={closeImageModal} />
    </SafeAreaView>
  );
};

export default FoodScreen;
