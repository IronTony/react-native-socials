import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { getPostData } from "./api";
import Video from "react-native-video";

export const Twitter = () => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    getPostData("1251537219594133505").then((response) => {
      setData(response);
    });
  }, []);
  console.log(data);
  return (
    <View style={styles.container}>
      {data ? (
        <>
          <View style={styles.topRow}>
            <View style={styles.profileBanner}>
              <Image
                source={{ uri: data.posterImageUrl }}
                style={styles.profilePicture}
              />
              <View style={styles.nameContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.displayNameText}>
                    {data.posterDisplayName}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {data.isPosterVerified ? (
                      <Image
                        source={require("./assets/verified.png")}
                        style={{
                          width: 22,
                          height: 22,
                          tintColor: "#2EA1F2",
                          marginLeft: 2,
                        }}
                      />
                    ) : null}
                    <Image
                      source={require("./assets/logo.png")}
                      style={{ height: 18, width: 18 }}
                    />
                  </View>
                </View>
                <Text style={styles.uniqueNameText}>
                  @{data.posterUniqueName}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.headerSeparator} />
          <View>
            <Text style={styles.mainContentText}>{data.textContent}</Text>
          </View>
          {data?.media?.[0]?.type === "video" ? (
            <Video
              source={{ uri: data.media[0].url }}
              style={{
                width: "100%",
                aspectRatio: data.media[0].aspectRatio,
                borderRadius: 4,
                marginTop: 10,
              }}
              resizeMode={"contain"}
            />
          ) : data?.media?.[0]?.type === "photo" ? (
            <View
              style={{
                borderColor: "rgb(204, 214, 221)",
                borderWidth: 1,
                borderRadius: 12,
                marginTop: 10,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: data.media[0].url }}
                style={{
                  width: "100%",
                  aspectRatio: data.media[0].aspectRatio,
                }}
                resizeMode={"contain"}
              />
            </View>
          ) : null}
          <View style={styles.metadataRowContainer}>
            <Image
              source={require("./assets/heart.png")}
              style={{
                width: 18,
                height: 18,
                tintColor: "rgb(105, 120, 130)",
                marginRight: 4,
              }}
            />
            <Text style={styles.metadataRowText}>
              {data?.likeNumber + "    "} 1:31 PM - Apr 6, 2020
            </Text>
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  profilePicture: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  profileBanner: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  displayNameText: {
    color: "rgb(28, 32, 34)",
    fontSize: 16,
    fontWeight: "700",
  },
  uniqueNameText: {
    color: "rgb(105, 120, 130)",
    fontSize: 14,
    fontWeight: "400",
  },
  nameContainer: {
    marginLeft: 10,
    justifyContent: "space-between",
  },
  headerSeparator: {
    height: 12,
  },
  mainContentText: {
    color: "rgb(28, 32, 34)",
    fontSize: 16,
    fontWeight: "500",
  },
  metadataRowText: {
    color: "rgb(105, 120, 130)",
    fontSize: 14,
    fontWeight: "500",
  },
  metadataRowContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
