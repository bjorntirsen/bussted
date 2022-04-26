import { Box } from "@mui/material";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import { processedTopTenBuslineObj } from "../pages/api/topTenBusLines";

mapboxgl.accessToken = process.env.MAPBOX_TOKEN as string;

interface Props {
    busline: processedTopTenBuslineObj;
}

export default function MapBox({ busline }: Props) {
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: "my-map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [18.1101, 59.2972],
            zoom: 7,
            pitch: 45,
        });

        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
            })
        );

        let bounds = new mapboxgl.LngLatBounds();

        busline.stops.map((stop) => {
            const northing = parseFloat(
                stop.locationNorthingCoordinate as string
            );
            const easting = parseFloat(
                stop.locationEastingCoordinate as string
            );
            bounds.extend([easting, northing]);
            return new mapboxgl.Marker()
                .setLngLat([easting, northing])
                .addTo(map);
        });

        map.fitBounds(bounds);
    }, [busline.stops]);

    return (
        <div
            id="my-map"
            style={{
                height: 500,
                maxWidth: "100%",
                width: 500,
                margin: "0 auto",
            }}
        />
    );
}
