import React, { useState, useEffect, useContext } from 'react';
import WeekFinanceTable from './weekFinance/WeekFinanceTable';
import WeekFinanceHeader from './weekFinance/WeekFinanceHeader';
import { Grid, makeStyles } from '@material-ui/core';
import { startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { makeJSDateObject } from '../../helpers/helpers';
import { ApiContext } from '../../Routes';
import { calculateRoutes } from './calcRoutes';
import { calculateFinance } from './calculateFinance';
import { calculateParcels } from './calcParcels';
import xlsExport  from 'xlsexport';

function calculateFinance() {
  let dataArray = [];
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
  console.log('packagesIds =====  ', packagesIds);
  console.log('parcels =====  ', parcels);

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

  const  = calculateRoutes(
    cars,
    cities,
    citiesName,
    currentRoutes,
    dataArray,
    finances,
    financesIds,
    notStandard,
    ownersId,
    payCard,
    payCash,
    payOffice,
    payNot,
    payToDrivers,
    selectedDay,
    totalPerDayRoutes
  );

  dataArray.push(...dataArray, calculatedRoutes);

  dataArray.push({
    Тип: 'Итоги по рейсам',
    НужнаЕщеСтрока: '',
    Номер_машины: '',
    Владелец: '',
    Водитель: '',
    Направление: '',
    Пассажиров: totalPerDayRoutes.count,
    Карта: totalPerDayRoutes.card,
    Наличные: totalPerDayRoutes.cash,
    Офис: totalPerDayRoutes.office,
    Корректировка: totalPerDayRoutes.correction,
    Всего: totalPerDayRoutes.total,
    Начислено: totalPerDayRoutes.earned,
    Выдача: totalPerDayRoutes.pay,
    Фирма: totalPerDayRoutes.firm
  });

  //посылки
  const calulatedParcels = calculateParcels();
  dataArray.push();
  dataArray.push({
    Тип: 'Итоги для посылок',
    НужнаЕщеСтрока: '',
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
  });
  daySum.count += +totalPerDayRoutes.count + +cargos.length;
  daySum.card += +totalPerDayRoutes.card + +totalPerDayPackages.card;
  daySum.cash += +totalPerDayRoutes.cash + +totalPerDayPackages.cash;
  daySum.office += +totalPerDayRoutes.office + +totalPerDayPackages.office;
  daySum.correction +=
    +totalPerDayRoutes.correction + +totalPerDayPackages.correction;
  daySum.total += +totalPerDayRoutes.total + +totalPerDayPackages.total;
  daySum.earned += +totalPerDayRoutes.earned + +totalPerDayPackages.earned;
  daySum.pay += +totalPerDayRoutes.pay + +totalPerDayPackages.pay;
  daySum.firm += +totalPerDayRoutes.firm + +totalPerDayPackages.firm;
  dataArray.push({
    Тип: 'Итоги за день',
    НужнаЕщеСтрока: '',
    Номер_машины: '',
    Владелец: '',
    Водитель: '',
    Направление: '',
    Пассажиров: daySum.count,
    Карта: daySum.card,
    Наличные: daySum.cash,
    Офис: daySum.office,
    Корректировка: daySum.correction,
    Всего: daySum.total,
    Начислено: daySum.earned,
    Выдача: daySum.pay,
    Фирма: daySum.firm
  });
  return dataArray;
}
// const comp = () => {
//   useEffect(() =>
//     makeApiCall().then(() => setState(calc(2333)))
//   )
//   return (
//     <div></div>
//   )
// }
const useStyles = makeStyles(theme => ({
  gridMargin: {
    marginTop: '30px'
  }
}));

function WeekFinance() {
  const { api } = useContext(ApiContext);
  const currentWeekStart = startOfWeek(makeJSDateObject(new Date()), {
    weekStartsOn: 1
  });
  const [selectedWeekStart, setSelectedWeekStart] = useState(currentWeekStart);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [routes, setRoutes] = useState([]);
  const [finances, setFinances] = useState([]);
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exportData, setExportData] = useState([]);
  const classes = useStyles();
  const [checkState, setCheckState] = React.useState({
    checkedCar: false,
    checkedOwner: false,
    checkedDriver: false,
    checkedDirection: false,
    checkedPassengers: false,
    checkedCard: false,
    checkedCash: false,
    checkedOffice: false,
    checkedCorrection: false,
    checkedSum: false,
    checkedAccrued: false,
    checkedPayment: false,
    checkedProfit: false,
    checkedAll: true
  });

  useEffect(() => {
    api
      .getRoutes(
        selectedWeekStart,
        endOfWeek(selectedWeekStart, { weekStartsOn: 1 })
      )
      .then(res => {
        console.log('getRoutes');
        setRoutes(res.data);
        const params = {
          ids: res.data.map(({ id }) => id)
        };
        api
          .getFinances(params)
          .then(res => {
            console.log('getFinances');
            const { finances } = res.data;
            setFinances(finances);
          })
          .catch(e => console.log(JSON.stringify(e)));
      })
      .catch(e => console.log(JSON.stringify(e)));
    api
      .getPackages(
        selectedWeekStart,
        endOfWeek(selectedWeekStart, { weekStartsOn: 1 })
      )
      .then(res => {
        console.log('getPackages');
        setParcels(res.data.packages);
      })
      .catch(e => console.log(JSON.stringify(e)));

    setExportData(calculateFinance());
  }, [selectedWeekStart]);

  console.log('export data', exportData);
  const xls = new xlsExport(exportData, 'test.xls');


  return (
    <Grid className={classes.gridMargin} container direction="row">
      <Grid item xs={12}>
        <WeekFinanceHeader
          checkState={checkState}
          loading={loading}
          selectedDay={selectedDay}
          selectedWeekStart={selectedWeekStart}
          setCheckState={setCheckState}
          setLoading={setLoading}
          setSelectedDay={setSelectedDay}
          setSelectedWeekStart={setSelectedWeekStart}
        />
      </Grid>
      <Grid className={classes.gridMargin} item xs={12}>
        <WeekFinanceTable
          checkState={checkState}
          daySum={daySum}
          exportToExcel={exportToExcel}
          finances={finances}
          loading={loading}
          localDataParcels={localDataParcels}
          localDataRoutes={localDataRoutes}
          parcels={parcels}
          routes={routes}
          selectedDay={selectedDay}
          selectedWeekStart={selectedWeekStart}
          setExportData={setExportData}
          setFinances={setFinances}
          setParcels={setParcels}
          setSelectedWeekStart={setSelectedWeekStart}
          totalPerDayPackages={totalPerDayPackages}
          totalPerDayRoutes={totalPerDayRoutes}
        />
      </Grid>
    </Grid>
  );
}

export default WeekFinance;
