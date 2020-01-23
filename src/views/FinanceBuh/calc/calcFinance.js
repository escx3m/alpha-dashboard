import { calculateParcels } from './calcParcels';
import { calculateRoutes } from './calcRoutes';
import {
  isCargo,
  delivered,
  payCard,
  payCash,
  payOffice
} from '../../../helpers/constants';
import { isSameDay } from 'date-fns';

export function calculateFinance(finances, routes, selectedDay, parcels) {
  let dataToExport = [];
  const financesIds = new Set(finances.map(({ startRouteId }) => startRouteId));
  const currentRoutes = routes.filter(route =>
    isSameDay(new Date(route.fromTime), selectedDay)
  );
  const cargos = currentRoutes.reduce((acc, route) => {
    route.passengers.forEach(passenger => {
      if (passenger.type === isCargo && passenger.state === delivered) {
        acc.push({
          ...passenger,
          carNumber: route.car.number,
          packageId: passenger.id,
          routeId: passenger.route_id,
          dateTime: route.fromTime,
          ownerId: route.car.owner.id,
          owner: route.car.owner,
          phone: passenger.phone,
          phone_2: passenger.phone_2,
          cash: passenger.price_status === payCash ? +passenger.price : 0,
          office: passenger.price_status === payOffice ? +passenger.price : 0,
          card: passenger.price_status === payCard ? +passenger.price : 0,
          firm: +passenger.price > 599 ? 100 : +passenger.price > 149 ? 50 : 0,
          earned: 0,
          fromCityId: route.fromCityId,
          toCityId: route.toCityId
        });
      }
    });
    return acc;
  }, []);

  const cars = currentRoutes.reduce((acc, route) => {
    if (route.carId && !acc.includes(route.carId)) {
      acc.push(route.carId);
    }
    return acc;
  }, []);

  const packagesIds = new Set(parcels.map(({ packageId }) => packageId));

  const dayResult = {
    count: 0,
    card: 0,
    cash: 0,
    office: 0,
    correction: 0,
    total: 0,
    earned: 0,
    pay: 0,
    firm: 0
  };

  const routesCalculations = calculateRoutes(
    cars,
    currentRoutes,
    finances,
    financesIds,
    selectedDay
  );

  const parcelsCalculations = calculateParcels(cargos, packagesIds, parcels);

  const routesData = routesCalculations.localData;
  const parcelsData = parcelsCalculations.localData;
  const routesResult = routesCalculations.totalPerDay;
  const routesResultExport = {
    Тип: 'Итоги по рейсам',
    НужнаЕщеСтрока: '',
    Номер_машины: '',
    Владелец: '',
    Водитель: '',
    Направление: '',
    Пассажиров: routesResult.count,
    Карта: routesResult.card,
    Наличные: routesResult.cash,
    Офис: routesResult.office,
    Корректировка: routesResult.correction,
    Всего: routesResult.total,
    Начислено: routesResult.earned,
    Выдача: routesResult.pay,
    Фирма: routesResult.firm
  };

  const parcelsResult = parcelsCalculations.totalPerDay;
  const parcelsResultExport = {
    Тип: 'Итоги для посылок',
    НужнаЕщеСтрока: '',
    Номер_машины: '',
    Владелец: '',
    Водитель: '',
    Направление: '',
    Пассажиров: cargos.length,
    Карта: parcelsResult.card,
    Наличные: parcelsResult.cash,
    Офис: parcelsResult.office,
    Корректировка: '',
    Всего: parcelsResult.total,
    Начислено: parcelsResult.earned,
    Выдача: parcelsResult.pay,
    Фирма: parcelsResult.firm
  };

  dayResult.count += +routesResult.count + +cargos.length;
  dayResult.card += +routesResult.card + +parcelsResult.card;
  dayResult.cash += +routesResult.cash + +parcelsResult.cash;
  dayResult.office += +routesResult.office + +parcelsResult.office;
  dayResult.correction += +routesResult.correction + +parcelsResult.correction;
  dayResult.total += +routesResult.total + +parcelsResult.total;
  dayResult.earned += +routesResult.earned + +parcelsResult.earned;
  dayResult.pay += +routesResult.pay + +parcelsResult.pay;
  dayResult.firm += +routesResult.firm + +parcelsResult.firm;
  dataToExport.push(
    routesCalculations.dataToExport,
    routesResultExport,
    parcelsCalculations.dataToExport,
    parcelsResultExport,
    {
      Тип: 'Итоги за день',
      НужнаЕщеСтрока: '',
      Номер_машины: '',
      Владелец: '',
      Водитель: '',
      Направление: '',
      Пассажиров: dayResult.count,
      Карта: dayResult.card,
      Наличные: dayResult.cash,
      Офис: dayResult.office,
      Корректировка: dayResult.correction,
      Всего: dayResult.total,
      Начислено: dayResult.earned,
      Выдача: dayResult.pay,
      Фирма: dayResult.firm
    }
  );
  return {
    dataToExport,
    routesData,
    parcelsData,
    routesResult,
    parcelsResult,
    dayResult
  };
}
