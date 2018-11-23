// @flow
import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Marker } from "react-native-amap3d";

const style = StyleSheet.create({
    cluster: {
        borderWidth: 4,
        borderColor: "rgba(245,83,61,0.5)",
        backgroundColor: "rgba(245,83,61,0.9)",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "#fff",
        fontWeight: "600"
    }
});

export default class ClusterView extends PureComponent {
    onPress = () => {
        const { onPress, cluster } = this.props;

        if (onPress) {
            onPress(cluster);
        }
    };

    renderClusterView = () => {
        const { cluster, clusterStyle } = this.props;
        const { count } = cluster;
        const size = 36 + Math.log2(count);

        // console.log("clusterStyle", clusterStyle);

        const clusterStyles = {
            ...clusterStyle,
            width: size,
            height: size,
            borderRadius: size / 2
        };

        return (
            <TouchableWithoutFeedback>
                <View style={[style.cluster, clusterStyles]}>
                    <Text style={[style.text]}>{count}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    render() {
        const { cluster } = this.props;

        return (
            <Marker
                coordinate={cluster.coordinate}
                // flat
                icon={this.renderClusterView}
                infoWindowDisabled={false}
                onPress={this.onPress}
            >
                <View />
            </Marker>
        );
    }
}
