import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from "react-native-web";
import { Link } from "react-router";
import { createContainer, query } from "@phenomic/preset-react-app/lib/client";

const ShowcaseList = (props: Object) => (
  <View>
    {props.isLoading && <ActivityIndicator />}
    {!props.isLoading &&
      <View style={styles.page}>
        <Text style={styles.title}>
          {"Showcase"}
        </Text>
        <View style={styles.list}>
          {props.showcase.node.list.map(site => (
            <TouchableOpacity style={styles.item} key={site.id} href={site.url}>
              <View>
                <Image
                  source={{ uri: `/assets/showcase/${site.id}-large.png` }}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.siteName}>
                  {site.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.paginationRow}>
          <View style={styles.paginationColumn}>
            {props.showcase.node &&
              props.showcase.node.hasPreviousPage &&
              <Link
                to={
                  props.showcase.node.previousPageIsFirst
                    ? `/showcase`
                    : `/showcase/after/${props.showcase.node.previous}`
                }
              >
                {"Previous"}
              </Link>}
          </View>
          <View style={styles.paginationColumn}>
            {props.showcase.node &&
              props.showcase.node.hasNextPage &&
              <Link to={`/showcase/after/${props.showcase.node.next}`}>
                {"Next"}
              </Link>}
          </View>
        </View>
      </View>}
  </View>
);

const styles = StyleSheet.create({
  page: {
    padding: 10,
    maxWidth: 800,
    width: "100%",
    alignSelf: "center"
  },
  title: {
    fontSize: 40,
    fontWeight: "900"
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  item: {
    width: "50%",
    padding: 10
  },
  image: {
    width: 300,
    height: 200,
    maxWidth: "100%",
    minWidth: "100%"
  },
  siteName: {
    fontWeight: "700",
    fontSize: 18
  },
  paginationRow: {
    flexDirection: "row"
  },
  paginationColumn: {
    width: "50%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default createContainer(ShowcaseList, props => ({
  showcase: query({
    collection: "showcase",
    limit: 10,
    after: props.params.after
  })
}));
