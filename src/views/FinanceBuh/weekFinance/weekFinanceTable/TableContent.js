import React, { useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { isSameDay } from 'date-fns';
import Row from './Row';
import Summary from './Summary';
import PackageRow from './Package';
import { payToDrivers, cities, citiesName, notStandard, isPassenger, payNot,
  payCard, payCash, payOffice, delivered, ownersId, isCargo } from '../../../../helpers/constants';

function TableContent(props) {
  const { routes, finances, setFinances, parcels, setParcels, selectedDay, checkState, exportData, setExportData } = props;
  let dataArray = [];
  let localDataRoutes = [];
  let localDataParcels = [];
  const financesIds = new Set(finances.map(({ startRouteId }) => startRouteId));
  const currentRoutes = routes.filter(route => isSameDay(new Date(route.fromTime), selectedDay));
  const cargos = currentRoutes.reduce((acc, route) => {
    route.passengers.forEach(passenger => {
      if (passenger.type === isCargo && passenger.state === delivered) {
        acc.push({
          ...passenger,
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
        })
      }
    })
    return acc;
  }, []);

  const cars = currentRoutes.reduce((acc, route) => {
    if (route.carId && !acc.includes(route.carId)) {
      acc.push(route.carId);
    }
    return acc;
  }, []);
  
  const packagesIds = new Set(parcels.map(({ packageId }) => packageId))
  const totalPerDayRoutes = {
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

  const totalPerDayPackages = {
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

  const daySum = {
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
  
  cars.map((carId, i) => {
    const carRoutes = currentRoutes.filter(route => route.carId === carId);
    const carNumber = carRoutes[0].car.number;
    const carOwner = carRoutes[0].car.owner;
    const carDriver = carRoutes[0].driver.user;
    const carOwnerString = `${carOwner.surname} ${carOwner.name[0]} ${carOwner.patronymic[0]}`;
    const carDriverString = `${carDriver.surname} ${carDriver.name[0]} ${carDriver.patronymic[0]}`;
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
    return resultRoutes.map((route, k) => {
      const startRouteId = route[0].id;
      let rowdata = {};

      if (financesIds.has(startRouteId)) {
        const financeRoute = finances
          .filter(finance => finance.startRouteId === startRouteId)
          .slice(-1)[0];
        const direction = `${cities[financeRoute.fromCityId]} -> ${cities[financeRoute.toCityId]}`;
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
        totalPerDayRoutes.passengers += +financeRoute.passengersTotal;
        totalPerDayRoutes.cash += +financeRoute.cash;
        totalPerDayRoutes.card += +financeRoute.card;
        totalPerDayRoutes.office += +financeRoute.office;
        totalPerDayRoutes.correction += +financeRoute.correction;
        totalPerDayRoutes.tripSum += +financeRoute.totalSum;
        totalPerDayRoutes.toDriver += +financeRoute.earned;
        totalPerDayRoutes.giveToDriver += +financeRoute.pay;
        totalPerDayRoutes.firm += +financeRoute.firm;

      } else {
        const passengers = route.reduce((acc, r) => {
          const { passengers } = r;
          return acc.concat(
            passengers.filter(
              passenger =>
                passenger.state === delivered &&
                passenger.type === isPassenger
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
              default: return acc;
            }
          },
          { cash: 0, card: 0, office: 0 }
        );
        const { cash, card, office } = passengersIncome;
        const passengersIncomeSum =
          card + cash + office + currentCorrection;
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
        totalPerDayRoutes.count += +totalPassengers;
        totalPerDayRoutes.cash += +cash;
        totalPerDayRoutes.card += +card;
        totalPerDayRoutes.office += +office;
        totalPerDayRoutes.correction += +currentCorrection;
        totalPerDayRoutes.total += +passengersIncomeSum;
        totalPerDayRoutes.earned += +payToDriver;
        totalPerDayRoutes.pay += +totalToDriver;
        totalPerDayRoutes.firm += +firmIncome;
      }
      dataArray.push({
        Тип: rowdata.isSingleRoute ? 'Одиночный' : 'Парный',
        Номер_машины: rowdata.carTitle,
        Владелец: rowdata.carOwner,
        Водитель: rowdata.carDriver,
        Направление: `${citiesName[rowdata.fromCityId]} - ${citiesName[rowdata.toCityId]}`,
        Пассажиров: rowdata.totalPassengers,
        Карта: rowdata.card,
        Наличные: rowdata.cash,
        Офис: rowdata.office,
        Корректировка: rowdata.currentCorrection,
        Всего: rowdata.passengersIncomeSum,
        Начислено: rowdata.payToDriver,
        Выдача: rowdata.totalToDriver,
        Фирма: rowdata.firmIncome
      });
      localDataRoutes.push({
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
  dataArray.push({
    Тип: 'Итоги по рейсам',
    Номер_машины: '',
    Владелец: '',
    Водитель: '',
    Направление: '',
    Пассажиров: totalPerDayRoutes.passengers,
    Карта: totalPerDayRoutes.card,
    Наличные: totalPerDayRoutes.cash,
    Офис: totalPerDayRoutes.office,
    Корректировка: totalPerDayRoutes.correction,
    Всего: totalPerDayRoutes.tripSum,
    Начислено: totalPerDayRoutes.toDriver,
    Выдача: totalPerDayRoutes.giveToDriver,
    Фирма: totalPerDayRoutes.firm
  });
  cargos.map(cargo => {
    if (packagesIds.has(cargo.packageId)) {
      const currentPackage = parcels.filter(packageInstance => packageInstance.packageId === cargo.packageId).slice(-1)[0];
      const time = {
        hours: new Date(currentPackage.dateTime).getHours().toString(),
        minutes: new Date(currentPackage.dateTime).getMinutes().toString()
      };
      const dateTimeStr = `0${time.hours}`.slice(-2) + ':' + `0${time.minutes}`.slice(-2);
      const directionStr = `${cities[currentPackage.fromCityId]} -> ${cities[currentPackage.toCityId]}`;
      const ownerStr = currentPackage.ownerStr;
      const senderStr = currentPackage.senderStr;
      totalPerDayPackages.cash += +currentPackage.cash;
      totalPerDayPackages.earned += +currentPackage.earned;
      totalPerDayPackages.pay += +currentPackage.pay;
      totalPerDayPackages.firm += +currentPackage.firm;
      dataArray.push({
        Тип: 'Посылка',
        Номер_машины: '',
        Владелец: ownerStr,
        Водитель: senderStr,
        Направление: `${citiesName[cargo.fromCityId]} - ${citiesName[cargo.toCityId]}`,
        Пассажиров: cargo.dateTime,
        Карта: cargo.card,
        Наличные: cargo.cash,
        Офис: cargo.office,
        Корректировка: '',
        Всего: cargo.total,
        Начислено: cargo.earned,
        Выдача: cargo.pay,
        Фирма: cargo.firm
      });
      localDataParcels.push({
        dateTimeStr: dateTimeStr,
        directionStr: directionStr,
        packageId: cargo.packageId,
        routeId: cargo.routeId,
        dateTime: cargo.dateTime,
        ownerId: cargo.ownerId,
        phone: cargo.phone,
        phone_2: cargo.phone_2,
        sender: cargo.sender,
        owner: cargo.owner,
        card: cargo.card,
        cash: cargo.cash,
        office: cargo.office,
        total: cargo.total,
        earned: cargo.earned,
        pay: cargo.pay,
        firm: cargo.firm,
        fromCityId: cargo.fromCityId,
        toCityId: cargo.toCityId
      });
    } else {
      const time = {
        hours: new Date(cargo.dateTime).getHours().toString(),
        minutes: new Date(cargo.dateTime).getMinutes().toString()
      };
      const dateTimeStr = `0${time.hours}`.slice(-2) + ':' + `0${time.minutes}`.slice(-2);
      const directionStr = `${cities[cargo.fromCityId]} -> ${cities[cargo.toCityId]}`;
      const ownerStr = `${cargo.owner.surname} ${cargo.owner.name[0]}. ${cargo.owner.patronymic[0]}.`;
      const senderStr = `${cargo.surname ? cargo.surname : ''} ${cargo.name ? cargo.name[0] + '.' : ''} ${cargo.patronymic ? cargo.patronymic[0] + '.' : ''}`;
      cargo.sender = senderStr;
      cargo.owner = ownerStr;
      cargo.total = cargo.cash + cargo.card + cargo.office;
      cargo.earned = cargo.cash - cargo.firm;
      cargo.pay = cargo.earned - cargo.cash;
      totalPerDayPackages.cash += +cargo.cash;
      totalPerDayPackages.card += +cargo.card;
      totalPerDayPackages.office += +cargo.office;
      totalPerDayPackages.total += +cargo.total;
      totalPerDayPackages.earned += +cargo.earned;
      totalPerDayPackages.pay += +cargo.pay;
      totalPerDayPackages.firm += +cargo.firm;
      dataArray.push({
        Тип: 'Посылка',
        Номер_машины: '',
        Владелец: ownerStr,
        Водитель: senderStr,
        Направление: `${citiesName[cargo.fromCityId]} - ${citiesName[cargo.toCityId]}`,
        Пассажиров: cargo.dateTime,
        Карта: cargo.card,
        Наличные: cargo.cash,
        Офис: cargo.office,
        Корректировка: '',
        Всего: cargo.total,
        Начислено: cargo.earned,
        Выдача: cargo.pay,
        Фирма: cargo.firm
      })
      localDataParcels.push({
        dateTimeStr: dateTimeStr,
        directionStr: directionStr,
        packageId: cargo.packageId,
        routeId: cargo.routeId,
        dateTime: cargo.dateTime,
        ownerId: cargo.ownerId,
        ownerStr: ownerStr,
        senderStr: senderStr,
        phone: cargo.phone,
        phone_2: cargo.phone_2,
        sender: cargo.sender,
        owner: cargo.owner,
        card: cargo.card,
        cash: cargo.cash,
        office: cargo.office,
        total: cargo.total,
        earned: cargo.earned,
        pay: cargo.pay,
        firm: cargo.firm,
        fromCityId: cargo.fromCityId,
        toCityId: cargo.toCityId
      })
    }
  })
  dataArray.push({
    Тип: 'Итоги для посылок',
    Номер_машины: '',
    Владелец: '',
    Водитель: '',
    Направление: '',
    Пассажиров: cargos.length,
    Карта: totalPerDayPackages.card,
    Наличные: totalPerDayPackages.cash,
    Офис: totalPerDayPackages.office,
    Корректировка: '',
    Всего: totalPerDayPackages.total,
    Начислено: totalPerDayPackages.earned,
    Выдача: totalPerDayPackages.pay,
    Фирма: totalPerDayPackages.firm
  })
  daySum.count += +totalPerDayRoutes.count + +cargos.length;
  daySum.card += +totalPerDayRoutes.card;
  daySum.cash += +totalPerDayRoutes.cash + +totalPerDayPackages.cash;
  daySum.office += +totalPerDayRoutes.office;
  daySum.correction += +totalPerDayRoutes.correction;
  daySum.total += +totalPerDayRoutes.total;
  daySum.earned += +totalPerDayRoutes.earned + +totalPerDayPackages.earned;
  daySum.pay += +totalPerDayRoutes.pay + +totalPerDayPackages.pay;
  daySum.firm += +totalPerDayRoutes.firm + +totalPerDayPackages.firm;
  dataArray.push({
    Тип: 'Итоги за день',
    Номер_машины: '',
    Владелец: '',
    Водитель: '',
    Направление: '',
    Пассажиров: daySum.count,
    Карта: daySum.card,
    Наличные: daySum.cash,
    Офис: daySum.office,
    Корректировка: '',
    Всего: daySum.total,
    Начислено: daySum.earned,
    Выдача: daySum.pay,
    Фирма: daySum.firm
  });
  useEffect(() => {
    setExportData(dataArray);
  }, [])
  return (
    <Grid container spacing={1}>
      {localDataRoutes.map((row, i) => 
        <Row 
          cash={row.cash}
          checkState={checkState}
          card={row.card}
          carDriver={row.carDriver}
          carTitle={row.carTitle}
          carOwner={row.carOwner}
          currentCorrection={row.currentCorrection}
          direction={row.direction}
          totalPassengers={row.totalPassengers}
          payToDriver={row.payToDriver}
          key={i}
          office={row.office}
          
          fromCityId={row.fromCityId}
        />
      )}
      <Summary 
        card={totalPerDayRoutes.card}
        cash={totalPerDayRoutes.cash}
        correction={totalPerDayRoutes.correction}
        count={totalPerDayRoutes.count}
        earned={totalPerDayRoutes.earned}
        firm={totalPerDayRoutes.firm}
        message="Итоги по рейсам"
        office={totalPerDayRoutes.office}
        pay={totalPerDayRoutes.pay}
        total={totalPerDayRoutes.total}
      />
      {localDataParcels.map((parcel, i) => 
        <PackageRow
          cargo={parcel}
          checkState={checkState}
          dateTimeStr={parcel.dateTimeStr}
          directionStr={parcel.directionStr}
          index={i}
          ownerStr={parcel.ownerStr}
          senderStr={parcel.senderStr}
          parcels={parcels}
          setParcels={setParcels}
        />
      )}
      <Summary 
        card={totalPerDayPackages.card}
        cash={totalPerDayPackages.cash}
        correction={totalPerDayPackages.correction}
        count={totalPerDayPackages.count}
        earned={totalPerDayPackages.earned}
        firm={totalPerDayPackages.firm}
        message="Итоги для посылок"
        office={totalPerDayPackages.office}
        pay={totalPerDayPackages.pay}
        total={totalPerDayPackages.total}
      />
      <Summary 
        card={daySum.card}
        cash={daySum.cash}
        correction={daySum.correction}
        count={daySum.count}
        earned={daySum.earned}
        firm={daySum.firm}
        message="Итоги за день"
        office={daySum.office}
        pay={daySum.pay}
        total={daySum.total}
      />
    </Grid>
  );
}

export default TableContent;
