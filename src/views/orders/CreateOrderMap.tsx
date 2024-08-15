import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Input } from 'antd';



export function useDebounce(value: string, delay: any) {
    const [debouncedValue, setDebouncedValue] = useState<string>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}


interface MapComponentsProps {
    setCurrentLocation: any;
    setMapPosition: (position: { lat: number; lng: number }) => void;
    mapPosition: any
}


const MapComponents: React.FC<MapComponentsProps> = ({ setCurrentLocation, setMapPosition, mapPosition }) => {

    const [inputFokus, setInputFokus] = useState(false);
    const [inputLoading, setInputLoading] = useState(false);
    const [search, setSearch] = useState('');
    const debunce = useDebounce(search, 800)
    const [locationData, setLocationData] = useState([]);
    

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const currentPosition = { lat: latitude, lng: longitude };
                    setCurrentLocation(currentPosition);

                    try {
                        const response = await axios.get(
                            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=uz`
                        );
                         console.log(response);
                         
                        const address = response.data.display_name;
                        setCurrentLocation(address);
                    } catch (error) {
                        console.error('Error getting address:', error);
                    }
                },
                (error) => {
                    console.error('Error getting the current location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const locationSearch = async () => {
        try {
            setInputLoading(true);
            const formattedAddress = debunce.replace(/\s+/g, '+');
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search.php?q=${formattedAddress}&format=json&accept-language=uz&countrycodes=uz`
            );
            const results = response.data;
            setLocationData(results);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setInputLoading(false);
        }
    };

    const legalIcon = new Icon({
        iconUrl:
            'https://cdn.glitch.me/81738bae-ea58-400c-afd5-ab9f832d09c8%2Fdepositphotos_210484206-stock-illustration-taxi-car-top-view-icon_edited.png',
        iconSize: [60, 45],
        iconRetinaUrl:
            'https://cdn.glitch.me/81738bae-ea58-400c-afd5-ab9f832d09c8%2Fdepositphotos_210484206-stock-illustration-taxi-car-top-view-icon_edited.png',
    });

    function LocationMarker() {
        const map = useMapEvents({
            click() {
                map.locate();
            },
            locationfound(e) {
                setMapPosition(e.latlng);
                map.flyTo(e.latlng, map.getZoom());
            },
        });

        useEffect(() => {
            if (mapPosition) {
                map.flyTo(mapPosition, map.getZoom(), {
                    animate: true,
                    duration: 3,
                });
            }
        }, [mapPosition, map]);

        return mapPosition === null ? null : (
            <Marker position={mapPosition} icon={legalIcon}>
                <Popup>You are here</Popup>
            </Marker>
        );
    }

    useEffect(() => {
        getCurrentLocation();
    }, []);

    useEffect(() => {
        if (search !== '') {
            locationSearch();
        }
    }, [debunce]);


    return (
        <div className="w-100">
            <div style={{ position: "relative" }}>
                <Input
                    onFocus={() => setInputFokus(true)}
                    onBlur={() =>
                        setTimeout(() => {
                            setInputFokus(false)
                        }, 800)
                    }
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-100'
                    style={{ height: "47px" }}
                    placeholder="Joylashuvni qidirish"
                />

                {search !== '' && inputFokus && (
                    <div
                        className="bg-white shadow w-100 p-3"
                        style={{
                            position: "absolute",
                            top: "50px",
                            zIndex: "99999",
                        }}
                    >
                        {!inputLoading ? (
                            locationData?.length > 0 &&
                            locationData?.map((item: any) => (
                                <p
                                    key={item?.place_id}
                                    style={{
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                    onClick={() => {
                                        setMapPosition({
                                            lat: parseFloat(item?.lat),
                                            lng: parseFloat(item?.lon),
                                        });
                                        setCurrentLocation(item?.display_name);
                                        setInputFokus(false);
                                    }}
                                    className="border-bottom hover"
                                >
                                    {item?.display_name}
                                </p>
                            ))
                        ) : (
                            <div>
                                <p>Loading...</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className='my-3'>
                <MapContainer
                    center={mapPosition}
                    zoom={15}
                    style={{ height: '700px', width: '100%' }}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                </MapContainer>
            </div>
        </div>
    );
}

export default MapComponents;
