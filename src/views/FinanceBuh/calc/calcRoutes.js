import {
  isPassenger,
  cities,
  citiesName,
  payCard,
  payCash,
  payOffice,
  payNot,
  ownersId,
  payToDrivers,
  notStandard,
  delivered
} from '../../../helpers/constants';

export function calculateRoutes(
  cars,
  currentRoutes,
  finances,
  financesIds,
  selectedDay
) {
  let localData = [];
  let dataToExport = [];
  let totalPerDay = {
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

  cars.map(carId => {
    const carRoutes = currentRoutes.filter(route => route.carId === carId);
    const carNumber = carRoutes[0].car.number;
    const carOwner = carRoutes[0].car.owner;
    const carDriver = carRoutes[0].driver.user;
    const carOwnerString = `${carOwner.surname} ${carOwner.name[0]} ${
      carOwner.patronymic[0]
    }`;
    const carDriverString = `${carDriver.surname} ${carDriver.name[0]} ${
      carDriver.patronymic[0]
    }`;
    const carScheme = carRoutes[0].carScheme.seats;
    const resultRoutes = [];
    const copy = [...carRoutes];
    while (copy.length > 0) {
      const index = copy.slice(1).findIndex(route => {
        return (
          copy[0].fromCityId === route.toCityId &&
          copy[0].toCityId === route.fromCityId
        );
      });
      if (index >= 0) {
        resultRoutes.push([copy[0], copy[index + 1]]);
        copy.splice(index + 1, 1);
        copy.splice(0, 1);
      } else {
        resultRoutes.push([copy[0]]);
        copy.splice(0, 1);
      }
    }
    resultRoutes.map((route, k) => {
      const startRouteId = route[0].id;
      let rowdata = {};

      if (financesIds.has(startRouteId)) {
        const financeRoute = finances
          .filter(finance => finance.startRouteId === startRouteId)
          .slice(-1)[0];
        const direction = `${cities[financeRoute.fromCityId]} -> ${
          cities[financeRoute.toCityId]
        }`;
        rowdata = {
          k: k,
          fromTime: financeRoute.startRouteDate,
          selectedDay: selectedDay,
          carTitle: financeRoute.carTitle,
          carOwner: financeRoute.carOwner,
          carDriver: financeRoute.carDriver,
          totalPassengers: financeRoute.passengersTotal,
          fromCityId: financeRoute.fromCityId,
          toCityId: financeRoute.toCityId,
          direction: direction,
          cash: financeRoute.cash,
          card: financeRoute.card,
          office: financeRoute.office,
          passengersIncomeSum: financeRoute.totalSum,
          currentCorrection: financeRoute.correction,
          payToDriver: financeRoute.earned,
          totalToDriver: financeRoute.pay,
          firmIncome: financeRoute.firm,
          startRouteId: financeRoute.startRouteId,
          isSingleRoute: route.length === 1 ? true : false
        };
        totalPerDay.count += +financeRoute.passengersTotal;
        totalPerDay.cash += +financeRoute.cash;
        totalPerDay.card += +financeRoute.card;
        totalPerDay.office += +financeRoute.office;
        totalPerDay.correction += +financeRoute.correction;
        totalPerDay.total += +financeRoute.totalSum;
        totalPerDay.earned += +financeRoute.earned;
        totalPerDay.pay += +financeRoute.pay;
        totalPerDay.firm += +financeRoute.firm;
      } else {
        const passengers = route.reduce((acc, r) => {
          const { passengers } = r;
          return acc.concat(
            passengers.filter(
              passenger =>
                passenger.state === delivered && passenger.type === isPassenger
            )
          );
        }, []);
        const currentCorrection = 0;
        const totalPassengers = passengers.length;
        const fromCity = cities[route[0].fromCityId]
          ? cities[route[0].fromCityId][0]
          : 'Неизвестно';
        const toCity = cities[route[0].toCityId]
          ? cities[route[0].toCityId][0]
          : 'Неизвестно';
        const direction = `${fromCity} -> ${toCity}`;
        const fromToCityKey = `${fromCity}-${toCity} ${carScheme} ${totalPassengers}`;
        const toFromCityKey = `${toCity}-${fromCity} ${carScheme} ${totalPassengers}`;
        const payObj = payToDrivers.hasOwnProperty(fromToCityKey)
          ? payToDrivers[fromToCityKey]
          : payToDrivers.hasOwnProperty(toFromCityKey)
          ? payToDrivers[toFromCityKey]
          : totalPassengers > 0
          ? notStandard
          : payToDrivers['no passengers'];

        const passengersIncome = passengers.reduce(
          (acc, passenger) => {
            switch (+passenger.price_status) {
              case payCard:
                return {
                  ...acc,
                  card: acc.card + +passenger.price
                };
              case payNot:
              case payCash:
                return {
                  ...acc,
                  cash: acc.cash + +passenger.price
                };
              case payOffice:
                return {
                  ...acc,
                  office: acc.office + +passenger.price
                };
              default:
                return acc;
            }
          },
          { cash: 0, card: 0, office: 0 }
        );
        const { cash, card, office } = passengersIncome;
        const passengersIncomeSum = card + cash + office + currentCorrection;
        const payToDriver = isNaN(payObj.all)
          ? notStandard
          : ownersId.has(+carOwner.id)
          ? payObj.owner_id
          : payObj.all;
        const totalToDriver = payToDriver - cash;
        const firmIncome = passengersIncomeSum - cash - totalToDriver;

        rowdata = {
          k: k,
          fromTime: route[0].fromTime,
          selectedDay: selectedDay,
          carTitle: carNumber,
          carOwner: carOwnerString,
          carDriver: carDriverString,
          fromCityId: +route[0].fromCityId,
          toCityId: +route[0].toCityId,
          totalPassengers: totalPassengers,
          direction: direction,
          cash: cash,
          card: card,
          office: office,
          passengersIncomeSum: passengersIncomeSum,
          currentCorrection: currentCorrection,
          payToDriver: payToDriver,
          totalToDriver: totalToDriver,
          firmIncome: firmIncome,
          startRouteId: startRouteId,
          isSingleRoute: route.length === 1 ? true : false
        };
        totalPerDay.count += +totalPassengers;
        totalPerDay.cash += +cash;
        totalPerDay.card += +card;
        totalPerDay.office += +office;
        totalPerDay.correction += +currentCorrection;
        totalPerDay.total += +passengersIncomeSum;
        totalPerDay.earned += +payToDriver;
        totalPerDay.pay += +totalToDriver;
        totalPerDay.firm += +firmIncome;
      }
      dataToExport.push({
        Тип: rowdata.isSingleRoute ? 'Одиночный' : 'Парный',
        Время_рейса: new Date(rowdata.fromTime).toLocaleString(),
        Номер_машины: rowdata.carTitle,
        Владелец: rowdata.carOwner,
        Водитель: rowdata.carDriver,
        Направление: `${citiesName[rowdata.fromCityId]} - ${
          citiesName[rowdata.toCityId]
        }`,
        Пассажиров: rowdata.totalPassengers || 0,
        Карта: rowdata.card || 0,
        Наличные: rowdata.cash || 0,
        Офис: rowdata.office || 0,
        Корректировка: rowdata.currentCorrection || 0,
        Всего: rowdata.passengersIncomeSum || 0,
        Начислено: rowdata.payToDriver || 0,
        Выдача: rowdata.totalToDriver || 0,
        Фирма: rowdata.firmIncome || 0,
        startRouteId: rowdata.startRouteId
      });
      localData.push({
        carTitle: rowdata.carTitle,
        carOwner: rowdata.carOwner,
        carDriver: rowdata.carDriver,
        card: rowdata.card,
        cash: rowdata.cash,
        selectedDay: rowdata.selectedDay,
        fromCityId: rowdata.fromCityId,
        toCityId: rowdata.toCityId,
        passengersIncomeSum: rowdata.passengersIncomeSum,
        k: rowdata.k,
        direction: rowdata.direction,
        totalPassengers: rowdata.totalPassengers,
        office: rowdata.office,
        startRouteId: rowdata.startRouteId,
        fromTime: rowdata.fromTime,
        firmIncome: rowdata.firmIncome,
        currentCorrection: rowdata.currentCorrection,
        payToDriver: rowdata.payToDriver,
        isSingleRoute: rowdata.isSingleRoute
      });
    });
  });
  return { localData, totalPerDay, dataToExport };
}
