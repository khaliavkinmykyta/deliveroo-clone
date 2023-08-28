import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ListBulletIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
} from "../../features/basketSlice";
import BasketIcon from "../../components/Basket/BasketIcon";
import BackButton from "../../components/BackButton";
import ImageModal from "./ImageModal";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const FoodScreen = () => {
  const [catName, setCatName] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState(null);
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
    // params: { id, imgUrl, nameFood, descFood, price },
    params: { item, id },
  } = useRoute();

  //clear header
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const dispatch = useDispatch();
  const [isBuy, setIsBuy] = useState(false);


  const handlePress = () => {
    navigation.navigate("BasketScreen");
  };

  const addItemToBasket = () => {
    dispatch(addToBasket(item));

  };

  const removeItemFromBasket = () => {  
    dispatch(removeFromBasket(item));

  };

  const buyNow = () => {
    setIsBuy(true);
    addItemToBasket();
  };

  useEffect(() => {
    console.log(item)
    const categoryDocRef = doc(db, "categories", item.categoryId);

    getDoc(categoryDocRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const categoryData = docSnapshot.data();

          setCatName(categoryData.name);
          const categoryWithId = {
            ...categoryData,
            categoryId: item.categoryId,
          };
          console.log(categoryData.name);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Ошибка при получении категории:", error);
      });
  }, []);

  const goToFoodCategory = () => {
    navigation.navigate("FoodCategory", {
      // set your categotyID
      docName: item.categoryId,
    });
  };

  return (
    <SafeAreaView className="bg-white p-2">
      <View className="bg-white flex-row justify-between items-center px-2">
        <BackButton />

        <Text className="text-xl font-bold text-black">Details</Text>
        <BasketIcon />
      </View>
      <TouchableOpacity className="m-2" onPress={goToFoodCategory}>
        <View className="flex-row gap-1 items-center rounded-sm p-1">
        <ListBulletIcon size={16} color={"black"} />
          <Text className="text-black ">{catName}</Text>
        </View>
      </TouchableOpacity>

      <ScrollView>
        <View className="mx-2">
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
          <View className="flex-row mt-10 space-x-2">
            <View className="bg-gray-200  rounded-xl p-2 w-1/2 m-auto flex-row justify-around ">
              <TouchableOpacity onPress={removeItemFromBasket}>
                <Text className="text-black  font-bold text-lg text-center">
                  -
                </Text>
              </TouchableOpacity>
              <Text className="text-black  font-bold text-lg text-center">
                Add
              </Text>
              
              <TouchableOpacity onPress={addItemToBasket}>
                
                <Text className="text-black  font-bold text-lg text-center">
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className="bg-[#fe6c44] rounded-xl p-2 w-1/2 m-auto"
              onPress={buyNow}
            >
              <Text className="text-white  font-bold text-lg text-center">
                {!isBuy ? `Buy now $${item.price}` : "Added"}
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
