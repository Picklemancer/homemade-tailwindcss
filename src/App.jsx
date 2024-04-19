import './style/main';
import COMBUSTIBLES from './combustibles.json';
import GASOLINERAS from './gasolineras.json';
import React, { useEffect, useState } from 'react';
import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import { between, distanceInKmBetweenEarthCoordinates } from './utils';
import Box from './components/Box';
import Text from './components/Text';
import Button from './components/Button';
import Select from './components/Select';
import Card, { CardBody } from './components/Card';
import language from './language';
import Chip from './components/Chip';
import Loading from './components/Loading';
import Image from './components/Image';
import useGeolocation from './hooks/useGeolocation';
import { useEffectOnce } from './hooks/useEffect';
import View from './components/View';
import Slider from './components/Slider';

// pendiente
// el select de ordenar deberian ser botones
// el input number deberia ser un stepper o un input mas rapido

// para hacer peticiones en el navegador: https://restninja.io
// obtener datos de precios: https://geoportalgasolineras.es/geoportal-instalaciones/DescargarFicheros

// type OpenStreetMapResponse = {
//   place_id: 287590979;
//   licence: 'Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright';
//   osm_type: 'way';
//   osm_id: 211738938;
//   lat: '36.42970413095955';
//   lon: '-5.171452774735122';
//   class: 'highway';
//   type: 'residential';
//   place_rank: 26;
//   importance: 0.10000999999999993;
//   addresstype: 'road';
//   name: 'Calle Edison';
//   display_name: 'Calle Edison, El Polígono, Urbanización Puerto Estepona (Seghers), Estepona, Costa del Sol Occidental, // Málaga, Andalucía, 29680, España';
//   address: {
//     borough: 'Teatinos-Universidad';
//     city: 'Málaga';
//     neighbourhood: 'Hacienda Bizcochero';
//
//     road: 'Calle Edison';
//     industrial: 'El Polígono';
//     suburb: 'Urbanización Puerto Estepona (Seghers)';
//     town: 'Estepona';
//     county: 'Costa del Sol Occidental';
//     state_district: 'Málaga';
//     'ISO3166-2-lvl6': 'ES-MA';
//     state: 'Andalucía';
//     'ISO3166-2-lvl4': 'ES-AN';
//     postcode: '29680';
//     country: 'España';
//     country_code: 'es';
//   };
//   boundingbox: ['36.4277796', '36.4313213', '-5.1715457', '-5.1708436'];
// };
//
// type Municipio = {
//   IDMunicipio: '4505';
//   IDProvincia: '29';
//   IDCCAA: '01';
//   Municipio: 'Estepona'; // "Málaga",
//   Provincia: 'MÁLAGA';
//   CCAA: 'Andalucia';
// };
//
// type Provincia = {
//   IDPovincia: '29';
//   IDCCAA: '01';
//   Provincia: 'MÁLAGA';
//   CCAA: 'Andalucia';
// };
//
// type Estacion = {
//   'C.P.': '29680';
//   Dirección: 'CALLE GRAHAM BELL, 13';
//   Horario: 'L-D: 24H';
//   Latitud: '36,429667';
//   Localidad: 'ESTEPONA';
//   'Longitud (WGS84)': '-5,171306';
//   Margen: 'D';
//   Municipio: 'Estepona';
//   'Precio Biodiesel': '';
//   'Precio Bioetanol': '';
//   'Precio Gas Natural Comprimido': '';
//   'Precio Gas Natural Licuado': '';
//   'Precio Gases licuados del petróleo': '';
//   'Precio Gasoleo A': '1,429';
//   'Precio Gasoleo B': '';
//   'Precio Gasoleo Premium': '1,449';
//   'Precio Gasolina 95 E10': '';
//   'Precio Gasolina 95 E5': '1,529';
//   'Precio Gasolina 95 E5 Premium': '';
//   'Precio Gasolina 98 E10': '';
//   'Precio Gasolina 98 E5': '';
//   'Precio Hidrogeno': '';
//   Provincia: 'MÁLAGA';
//   Remisión: 'dm';
//   Rótulo: 'BALLENOIL';
//   'Tipo Venta': 'P';
//   '% BioEtanol': '0,0';
//   '% Éster metílico': '0,0';
//   IDEESS: '14843';
//   IDMunicipio: '4505';
//   IDProvincia: '29';
//   IDCCAA: '01';
// };
//
// type CarburantesResponse = {
//   Fecha: '06/02/2024 11:32:05';
//   ListaEESSPrecio: Estacion[];
//   Nota: 'Archivo de todos los productos en todas las estaciones de servicio. La actualización de precios se realiza cada // media hora, con los precios en vigor en ese momento.';
//   ResultadoConsulta: 'OK';
// };

const NO_ICON = 'https://cdn-icons-png.flaticon.com/512/2933/2933939.png';

const getItem = (key) => JSON.parse(localStorage.getItem(key));
const setItem = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const getLocation = async (latitude, longitude) => {
  const location = await wretch('https://nominatim.openstreetmap.org/reverse')
    .addon(QueryStringAddon)
    .query({ format: 'json', lat: latitude, lon: longitude })
    .get()
    .json();

  return location;
};

const BASE_URL =
  'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes';

const getProvincias = async () => {
  const municipios = await wretch(BASE_URL + '/Listados/Provincias')
    .get()
    .json();

  return municipios;
};

const getMunicipios = async () => {
  const municipios = await wretch(BASE_URL + '/Listados/Municipios')
    .get()
    .json();

  return municipios;
};

const getEstacionesPorProvincia = async (IDProvincia) => {
  const estaciones = await wretch(
    BASE_URL + '/EstacionesTerrestres/FiltroProvincia/' + IDProvincia
  )
    .get()
    .json();

  return estaciones.ListaEESSPrecio;
};

const getEstacionesPorMunicipio = async (IDMunicipio) => {
  const estaciones = await wretch(
    BASE_URL + '/EstacionesTerrestres/FiltroMunicipio/' + IDMunicipio
  )
    .get()
    .json();

  return estaciones.ListaEESSPrecio;
};

const filterEstacionesPorPrecioCombustible = (estaciones, combustibles) =>
  estaciones.filter((estacion) =>
    combustibles.some((combustible) =>
      estacion[combustible.combustible]
        ? between(
            parsePrice(estacion[combustible.combustible]),
            combustible.min,
            combustible.max
          )
        : false
    )
  );

const parsePrice = (price) => +price.replace(',', '.');

const getCoords = (estacion) => ({
  lat: +estacion['Latitud'].replaceAll(',', '.'),
  lng: +estacion['Longitud (WGS84)'].replaceAll(',', '.'),
});

const getURL = (estacion) => {
  return `https://maps.google.com/?q=${estacion._lat},${estacion._lng}`;
};

const formatDistance = (distance) => {
  if (distance > 1) return 'A ' + distance.toFixed(1) + ' kilometros';
  return 'A ' + Math.floor(distance * 1000) + ' metros';
};

// litros gastados trayecto * 2 (ida y vuelta)
const litrosGastados = (distanciaKm, avg) => (avg / 100) * distanciaKm * 2;

const litrosRepostados = (precioLitro, importe) => importe / precioLitro;

const totalRepostado = (precioLitro, importe, distanciaKm, avg) =>
  litrosRepostados(precioLitro, importe) - litrosGastados(distanciaKm, avg);

const handleEstaciones = (estaciones, geolocation, combustibleKey, importe) => {
  const combustible = COMBUSTIBLES.find(
    (option) => option.key === combustibleKey
  );

  const mas = {
    cercana: null,
    barata: null,
    mejor: null,
  };

  estaciones.forEach((estacion) => {
    estacion._mas_cercana = null;
    estacion._mas_barata = null;
    estacion._la_mejor = null;

    const gasolinera = GASOLINERAS.find((gasolinera) =>
      estacion['Rótulo'].includes(gasolinera.key)
    );

    estacion._icon = gasolinera ? gasolinera.icon : NO_ICON;

    const coords = getCoords(estacion);

    estacion._lat = coords.lat;
    estacion._lng = coords.lng;

    estacion._distance = geolocation.timestamp
      ? distanceInKmBetweenEarthCoordinates(
          geolocation.latitude,
          geolocation.longitude,
          coords.lat,
          coords.lng
        )
      : null;

    if (estacion._distance) {
      if (!mas.cercana) mas.cercana = estacion;
      if (estacion._distance < mas.cercana._distance) mas.cercana = estacion;
    }

    estacion._price = estacion[combustibleKey]
      ? parsePrice(estacion[combustibleKey])
      : null;

    if (estacion._price) {
      if (!mas.barata) mas.barata = estacion;
      if (estacion._price < mas.barata._price) mas.barata = estacion;
    }

    estacion._litros =
      estacion._price && estacion._distance
        ? totalRepostado(
            estacion._price,
            importe,
            estacion._distance,
            combustible.avg
          )
        : null;

    if (estacion._litros) {
      if (!mas.mejor) mas.mejor = estacion;
      if (estacion._litros > mas.mejor._litros) mas.mejor = estacion;
    }
  });

  if (mas.cercana) mas.cercana._mas_cercana = true;
  if (mas.barata) mas.barata._mas_barata = true;
  if (mas.mejor) mas.mejor._la_mejor = true;

  return estaciones;
};

const sortEstaciones = (estaciones, by, direction) => {
  estaciones.sort((a, b) => {
    if (!a[by]) return 1;
    if (!b[by]) return -1;
    return direction === 'ASC' ? a[by] - b[by] : b[by] - a[by];
  });

  return estaciones;
};

const orderByOptions = [
  { label: 'Precio', value: '_price', abbr: '€' },
  { label: 'Distancia', value: '_distance', abbr: 'Km' },
];

const filters = {
  combustible: getItem('@combustible') || COMBUSTIBLES.at(0).key,
  importe: getItem('@importe') || 30,
  orderBy: orderByOptions.at(0).value,
  direction: 'ASC',
};

const ListaEstaciones = ({ estaciones }) => {
  return (
    <Box className="space-y-3">
      {estaciones.map((estacion) => {
        return (
          <Card key={estacion['IDEESS']}>
            <CardBody className="space-y-3">
              <Box className="flex items-center gap-5">
                {estacion._icon && (
                  <Box className="size-16 p-1 bg-slate-300 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                    <Image
                      className="max-h-full max-w-full"
                      src={estacion._icon}
                    />
                  </Box>
                )}
                <Box className="flex-1 space-y-3">
                  <Box className="flex justify-between">
                    <Text className="font-semibold">{estacion['Rótulo']}</Text>
                    <Box className="flex gap-2 flex-wrap justify-end">
                      {estacion._la_mejor && (
                        <Chip color="warning">La mejor</Chip>
                      )}

                      {estacion._mas_barata && (
                        <Chip color="primary">La + barata</Chip>
                      )}

                      {estacion._mas_cercana && (
                        <Chip color="primary">La + cercana</Chip>
                      )}
                    </Box>
                  </Box>

                  <Box className="flex flex-wrap gap-2">
                    {COMBUSTIBLES.map((combustible) => {
                      const value = estacion[combustible.key];
                      if (!value) return;

                      const focusIt = combustible.key === filters.combustible;

                      return (
                        <Chip
                          key={combustible.key}
                          color={focusIt ? 'primary' : 'default'}
                          variant={focusIt ? 'shadow' : 'bordered'}
                        >
                          {combustible.abbr}: {value}
                        </Chip>
                      );
                    })}
                  </Box>

                  {estacion._distance && (
                    <Box>
                      <Text>{formatDistance(estacion._distance)}</Text>
                    </Box>
                  )}
                </Box>
              </Box>

              <Button
                className="w-full"
                onClick={() => window.open(getURL(estacion))}
              >
                Navegar
              </Button>
            </CardBody>
          </Card>
        );
      })}
    </Box>
  );
};

export const App = () => {
  const geolocation = useGeolocation();

  const [municipios, setMunicipios] = useState([]);
  const [Municipio, setMunicipio] = useState(null);
  const [estaciones, setEstaciones] = useState([]);

  const fetchEstaciones = async (municipio) => {
    if (Municipio === municipio) return;

    setMunicipio(municipio);

    const estaciones = await getEstacionesPorMunicipio(municipio.IDMunicipio);

    handleEstaciones(
      estaciones,
      geolocation,
      filters.combustible,
      filters.importe
    );

    sortEstaciones(estaciones, filters.orderBy, filters.direction);

    setEstaciones(estaciones);
  };

  //const resultados = sortEstacionesPorCombustible(
  //  // filterEstacionesPorCombustible(estaciones, ["Precio Gases licuados del petróleo"]),
  //  filterEstacionesPorPrecioCombustible(estaciones, [
  //    { combustible: 'Precio Gasoleo Premium', min: 0, max: 5 },
  //    { combustible: 'Precio Gases licuados del petróleo', min: 0, max: 5 },
  //  ]),
  //  'Precio Gasoleo Premium'
  //);

  const onChangeCombustible = (option) => {
    if (filters.combustible === option.key) return;

    filters.combustible = option.key;
    setItem('@combustible', filters.combustible);
    setEstaciones((prev) => {
      handleEstaciones(prev, geolocation, filters.combustible, filters.importe);
      sortEstaciones(prev, filters.orderBy, filters.direction);
      return [...prev];
    });
  };

  const changeImporte = (value) => {
    filters.importe = +value;
    setItem('@importe', filters.importe);
    setEstaciones((prev) => {
      handleEstaciones(prev, geolocation, filters.combustible, filters.importe);
      sortEstaciones(prev, filters.orderBy, filters.direction);
      return [...prev];
    });
  };

  const onChangeOrderBy = (option) => {
    if (filters.orderBy === option.value) return;

    filters.orderBy = option.value;
    setEstaciones((prev) =>
      sortEstaciones([...prev], filters.orderBy, filters.direction)
    );
  };

  useEffectOnce(() => {
    const init = async () => {
      const municipios = await getMunicipios();

      setMunicipios(
        municipios.sort((a, b) => (a.Municipio > b.Municipio ? 1 : -1))
      );
    };
    init();
  });

  useEffect(() => {
    console.log('geolocation', geolocation);

    if (geolocation.error) return;

    if (Municipio) return;

    const fn = async () => {
      const location = await getLocation(
        geolocation.latitude,
        geolocation.longitude
      );

      console.log('location', location);

      const municipio = municipios.find((municipio) => {
        const Municipio =
          location.address.village ||
          location.address.town ||
          location.address.city;

        return municipio ? Municipio === municipio.Municipio : false;
      });

      console.log('municipio', municipio);

      if (municipio) fetchEstaciones(municipio);
    };
    fn();
  }, [geolocation]);

  if (geolocation.loading)
    return (
      <View className="flex justify-center items-center">
        <Loading />
      </View>
    );

  return (
    <View className="flex flex-col gap-3 sm:flex-row sm:justify-center">
      <Box className="space-y-3 min-w-80">
        <Box>
          <Text className="font-medium">{language('town')}:</Text>
          <Select
            className="mt-2"
            getOptionLabel={(option) => option.Municipio}
            getOptionValue={(option) => option.IDMunicipio}
            options={municipios}
            value={Municipio}
            onChange={fetchEstaciones}
          >
            {({ data }) => (
              <Box className="flex justify-between">
                <Text className="truncate">{data.Municipio}</Text>
                <Text className="text-slate-500 truncate">{data.CCAA}</Text>
              </Box>
            )}
          </Select>
        </Box>

        <Box>
          <Text className="font-medium">{language('fuel')}:</Text>
          <Select
            className="mt-2"
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.key}
            options={COMBUSTIBLES}
            value={COMBUSTIBLES.find(
              (option) => option.key === filters.combustible
            )}
            onChange={onChangeCombustible}
          >
            {({ data }) => (
              <Box className="flex justify-between">
                <Text className="truncate">{data.label}</Text>
                <Text className="text-slate-500 truncate">{data.abbr}</Text>
              </Box>
            )}
          </Select>
        </Box>

        <Box>
          <Box className="flex justify-between mb-2">
            <Text className="font-medium">{language('amount')}:</Text>
            <Text className="text-slate-500">{filters.importe}€</Text>
          </Box>
          <Slider
            step={5}
            max={100}
            min={5}
            isDisabled={!geolocation.timestamp}
            value={filters.importe}
            onChange={changeImporte}
          />
        </Box>

        <Box>
          <Text className="font-medium">{language('order')}:</Text>
          <Box className="flex gap-2 mt-2">
            {orderByOptions.map((option) => (
              <Button
                key={option.value}
                className="w-1/2"
                isDisabled={
                  geolocation.timestamp ? false : option.value === '_distance'
                }
                variant={
                  option.value === filters.orderBy ? 'solid' : 'bordered'
                }
                onClick={() => onChangeOrderBy(option)}
              >
                <Text className="truncate">{option.label}</Text>
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className="space-y-2 sm:max-w-lg">
        <Box className="flex justify-between">
          <Text className="font-medium">{language('stations')}</Text>
          {!!estaciones.length && <Text>{estaciones.length} resultados</Text>}
        </Box>

        <Box>
          {!!estaciones.length ? (
            <ListaEstaciones estaciones={estaciones} />
          ) : (
            <Card>
              <CardBody>
                {Municipio ? (
                  <Text>No hay estaciones en esta zona.</Text>
                ) : (
                  <Text>Debe seleccionar un municipio primero.</Text>
                )}
              </CardBody>
            </Card>
          )}
        </Box>
      </Box>
    </View>
  );
};

export default App;
