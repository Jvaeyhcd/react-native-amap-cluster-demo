/* eslint-disable camelcase */
// @flow
import React, { PureComponent } from "react";
import SuperCluster from "supercluster";
import ClusterView from "./ClusterView";

export default class Cluster extends PureComponent {
    static defaultProps = { radius: 200 };

    constructor(props) {
        super(props);
        this.state = {
            clusters: []
        };
    }

    componentDidMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(props) {
        this.init(props);
    }

    init(props) {
        const { radius } = props;
        this.cluster = SuperCluster({ radius, minZoom: 3, maxZoom: 10 }).load(
            props.markers.map(marker => ({
                geometry: {
                    coordinates: [
                        marker.coordinate.longitude,
                        marker.coordinate.latitude
                    ],
                    properties: marker.extra
                }
            }))
        );
    }

    update({ zoomLevel, region }) {
        this.setState({
            clusters: this.cluster.getClusters(
                [
                    region.longitude - region.longitudeDelta / 2,
                    region.latitude - region.latitudeDelta / 2,
                    region.longitude + region.longitudeDelta / 2,
                    region.latitude + region.latitudeDelta / 2
                ],
                Math.round(zoomLevel)
            )
        });
    }

    renderCluster = cluster => {
        // console.log("renderCluster");
        const { onPress, clusterStyle, clusterTextStyle } = this.props;

        return (
            <ClusterView
                key={cluster.id}
                cluster={cluster}
                onPress={onPress}
                clusterStyle={clusterStyle}
                textStyle={clusterTextStyle}
            />
        );
    };

    render() {
        // console.log("props", this.props);
        const { clusters } = this.state;

        return clusters.map(cluster => {
            const { geometry, properties } = cluster;
            const { renderCluster, renderMarker } = this.props;
            const coordinate = {
                latitude: geometry.coordinates[1],
                longitude: geometry.coordinates[0]
            };
            if (properties) {
                const { cluster_id, point_count } = cluster.properties;
                const render = renderCluster || this.renderCluster;

                return render({
                    coordinate,
                    id: cluster_id,
                    count: point_count
                });
            }

            return renderMarker({ coordinate, extra: geometry.properties });
        });
    }
}
