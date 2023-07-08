<template>
	<div class="map-container">
		<div ref="map-root" class="map"></div>
	</div>
</template>
<script>
import View from 'ol/View';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZSource from 'ol/source/XYZ';
import { fromLonLat, toLonLat } from 'ol/proj';
import 'ol/ol.css';
import { Icon, Style } from 'ol/style';
import { Modify } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import { Attribution } from 'ol/control';
import 'ol/control';
import LayerGroup from 'ol/layer/Group';

var iconStyle = new Style({
	image: new Icon({
		anchor: [0.5, 62],
        // scale: 0.1,
		anchorXUnits: 'fraction',
		anchorYUnits: 'pixels',
		src: require('../assets/location-pin.png'),
	}),
});
const initLayer = new TileLayer({
	source: new OSM({
		url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
		// attributions: [ OSM.ATTRIBUTION ],
		maxZoom: 18,
	}),
});

const createPoint = (points) => {
    var iconFeature = new Feature({
		geometry: new Point(points),
		name: 'Null Island',
		population: 4000,
		rainfall: 500,
	});
	iconFeature.setStyle(iconStyle);
	var layer = new VectorLayer({
		source: new VectorSource({
			features: [iconFeature],
		}),
	});
    return layer
}
let previusLayer = null;
const initMap = (_this) => {
	var target = _this.$refs['map-root'];
	var attribution = new Attribution({
		collapsible: false,
	});
    const layer = createPoint(_this.coordinates)
    previusLayer = layer;
    const map = new Map({
        controls: [attribution],
        target: target,
        layers: [initLayer, layer],
        view: new View({
            center: _this.coordinates,
            zoom: 17,
        }),
    });

	map.on('singleclick', function(event) {
        const coordinates = event.coordinate;
        const newLayer = createPoint(coordinates);
        map.removeLayer(previusLayer);
        map.addLayer(newLayer)
        previusLayer = newLayer;
        _this.$emit("changeCoordinates", coordinates)
	});
};

export default {
	data() {
		return {
			longitude: 19.845729,
			latitude: 45.255595,
		};
	},
	props: ['restaurant', 'coordinates'],
	mounted() {
		setTimeout(()=>{
			initMap(this);
		}, 700)
	},
	unmounted() {
		console.log('Unmounging locations...');
	},
};
</script>

<style scoped>
.map {
	/* width: 100vw;  */
	/* height: calc(100% + 25px); */
	height: 100%;
	/* margin-top: -15px; */
	/* padding-bottom: -30px; */
}
</style>