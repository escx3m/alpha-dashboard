import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { isSameDay } from 'date-fns';
import Row from './Row';
import Summary from './Summary';
import PackageRow from './Package';
import {
  payToDrivers,
  cities,
  notStandard,
  isPassenger,
  payNot,
  payCard,
  payCash,
  payOffice,
  delivered,
  ownersId,
  isCargo
} from '../../../../helpers/constants';

function TableContent(props) {
  const {
    routes,
    finances,
    setFinances,
    parcels,
    setParcels,
    selectedDay,
    checkState
  } = props;

  const [totalPerDay, setTotalPerDay] = useState([]);
  const [totalPerDayObject, setTotalPerDayObject] = useState({});
  let passengersRows = [];
  const financesIds = new Set(finances.map(({ startRouteId }) => startRouteId));
  const currentRoutes = routes.filter(route =>
    isSameDay(new Date(route.fromTime), selectedDay)
  );

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

  // const totalPerDay = {
  //   passengers: 0,
  //   card: 0,
  //   cash: 0,
  //   office: 0,
  //   correction: 0,
  //   tripSum: 0,
  //   toDriver: 0,
  //   giveToDriver: 0,
  //   firm: 0
  // };

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

  return (
    <Grid
      container
      spacing={1}
    >
      {/* {cars.map((carId, i) => {
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
        return resultRoutes.map((route, k) => {
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
            // totalPerDay.passengers += +financeRoute.passengersTotal;
            // totalPerDay.cash += +financeRoute.cash;
            // totalPerDay.card += +financeRoute.card;
            // totalPerDay.office += +financeRoute.office;
            // totalPerDay.correction += +financeRoute.correction;
            // totalPerDay.tripSum += +financeRoute.totalSum;
            // totalPerDay.toDriver += +financeRoute.earned;
            // totalPerDay.giveToDriver += +financeRoute.pay;
            // totalPerDay.firm += +financeRoute.firm;
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
                  default:
                    return acc;
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

            // totalPerDay.passengers += +totalPassengers;
            // totalPerDay.cash += +cash;
            // totalPerDay.card += +card;
            // totalPerDay.office += +office;
            // totalPerDay.correction += +currentCorrection;
            // totalPerDay.tripSum += +passengersIncomeSum;
            // totalPerDay.toDriver += +payToDriver;
            // totalPerDay.giveToDriver += +totalToDriver;
            // totalPerDay.firm += +firmIncome;
          }
          passengersRows = passengersRows.concat(rowdata);
          console.log('passengers Rows = ', passengersRows);
          // return (
          //   <Grid
          //     container
          //     direction="row"
          //     item
          //     key={k}
          //     spacing={1}
          //     style={route.length === 1 ? { backgroundColor: 'orange' } : {}}
          //     wrap="nowrap"
          //     xs="auto">
          //     <Row
          //       checkState={checkState}
          //       finances={finances}
          //       rowdata={rowdata}
          //       setFinances={setFinances}
          //       setTotalPerDay={setTotalPerDay}
          //     />
          //   </Grid>
          // );
        });
      })} */}
      {useEffect(() => {
        cars.map((carId, i) => {
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
          return resultRoutes.map((route, k) => {
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
              // totalPerDay.passengers += +financeRoute.passengersTotal;
              // totalPerDay.cash += +financeRoute.cash;
              // totalPerDay.card += +financeRoute.card;
              // totalPerDay.office += +financeRoute.office;
              // totalPerDay.correction += +financeRoute.correction;
              // totalPerDay.tripSum += +financeRoute.totalSum;
              // totalPerDay.toDriver += +financeRoute.earned;
              // totalPerDay.giveToDriver += +financeRoute.pay;
              // totalPerDay.firm += +financeRoute.firm;
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
                    default:
                      return acc;
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
  
              // totalPerDay.passengers += +totalPassengers;
              // totalPerDay.cash += +cash;
              // totalPerDay.card += +card;
              // totalPerDay.office += +office;
              // totalPerDay.correction += +currentCorrection;
              // totalPerDay.tripSum += +passengersIncomeSum;
              // totalPerDay.toDriver += +payToDriver;
              // totalPerDay.giveToDriver += +totalToDriver;
              // totalPerDay.firm += +firmIncome;
            }
            passengersRows = passengersRows.concat(rowdata);
            // return (
            //   <Grid
            //     container
            //     direction="row"
            //     item
            //     key={k}
            //     spacing={1}
            //     style={route.length === 1 ? { backgroundColor: 'orange' } : {}}
            //     wrap="nowrap"
            //     xs="auto">
            //     <Row
            //       checkState={checkState}
            //       finances={finances}
            //       rowdata={rowdata}
            //       setFinances={setFinances}
            //       setTotalPerDay={setTotalPerDay}
            //     />
            //   </Grid>
            // );
          });
        })
        setTotalPerDay(passengersRows)
      }, [])}
      {useEffect(() => {
        setTotalPerDayObject(totalPerDay.reduce((acc, row) => 
          ({  
            card: acc.card + row.card, 
            cash: acc.cash + row.cash,
            office: acc.office + row.office,
            correction: acc.correction + row.currentCorrection,
            count: acc.count + row.totalPassengers,
            earned: acc.earned + row.payToDriver,
            pay: acc.pay + row.totalToDriver,
            total: acc.total + row.passengersIncomeSum,
            firm: acc.firm + row.firmIncome
          }), 
        {
          card: 0,
          cash: 0,
          correction: 0,
          count: 0,
          earned: 0,
          firm: 0,
          office: 0,
          pay: 0,
          total: 0
        }))
      }, [totalPerDay])}
      {totalPerDay.map((row, i) => {
        console.log('totalPerDay map row === ', row)
        return (
          <Grid
            container
            direction="row"
            item
            key={i}
            spacing={1}
            style={row.isSingleRoute ? { backgroundColor: 'orange' } : {}}
            wrap="nowrap"
            xs="auto"
          >
            <Row
              checkState={checkState}
              finances={finances}
              rowdata={row}
              setFinances={setFinances}
            />
          </Grid>
        );
      })}
      <Summary
        card={totalPerDayObject.card}
        cash={totalPerDayObject.cash}
        correction={totalPerDayObject.correction}
        count={totalPerDayObject.count}
        earned={totalPerDayObject.earned}
        firm={totalPerDayObject.firm}
        message={'Итоги по пассажирам'}
        office={totalPerDayObject.office}
        pay={totalPerDayObject.pay}
        total={totalPerDayObject.total}
      />
      {cargos.map((cargo, index) => {
        if (packagesIds.has(cargo.packageId)) {
          const currentPackage = parcels
            .filter(
              packageInstance => packageInstance.packageId === cargo.packageId
            )
            .slice(-1)[0];
          const time = {
            hours: new Date(currentPackage.dateTime).getHours().toString(),
            minutes: new Date(currentPackage.dateTime).getMinutes().toString()
          };
          const dateTimeStr =
            `0${time.hours}`.slice(-2) + ':' + `0${time.minutes}`.slice(-2);
          const directionStr = `${cities[currentPackage.fromCityId]} -> ${
            cities[currentPackage.toCityId]
          }`;
          const ownerStr = currentPackage.ownerStr;
          const senderStr = currentPackage.senderStr;
          totalPerDayPackages.cash += currentPackage.cash;
          totalPerDayPackages.earned += currentPackage.earned;
          totalPerDayPackages.pay += currentPackage.pay;
          totalPerDayPackages.firm += currentPackage.firm;
          return (
            <PackageRow
              cargo={currentPackage}
              checkState={checkState}
              dateTimeStr={dateTimeStr}
              directionStr={directionStr}
              index={index}
              ownerStr={ownerStr}
              parcels={parcels}
              senderStr={senderStr}
              setParcels={setParcels}
            />
          );
        } else {
          const time = {
            hours: new Date(cargo.dateTime).getHours().toString(),
            minutes: new Date(cargo.dateTime).getMinutes().toString()
          };
          const dateTimeStr =
            `0${time.hours}`.slice(-2) + ':' + `0${time.minutes}`.slice(-2);
          const directionStr = `${cities[cargo.fromCityId]} -> ${
            cities[cargo.toCityId]
          }`;
          const ownerStr = `${cargo.owner.surname} ${cargo.owner.name[0]}. ${
            cargo.owner.patronymic[0]
          }.`;
          const senderStr = `${cargo.surname ? cargo.surname : ''} ${
            cargo.name ? cargo.name[0] + '.' : ''
          } ${cargo.patronymic ? cargo.patronymic[0] + '.' : ''}`;
          cargo.sender = senderStr;
          cargo.owner = ownerStr;
          cargo.total = cargo.cash + cargo.card + cargo.office;
          cargo.earned = cargo.cash - cargo.firm;
          cargo.pay = cargo.earned - cargo.cash;
          totalPerDayPackages.total += cargo.total;
          totalPerDayPackages.card += cargo.card;
          totalPerDayPackages.office += cargo.office;
          totalPerDayPackages.cash += cargo.cash;
          totalPerDayPackages.earned += cargo.earned;
          totalPerDayPackages.pay += cargo.pay;
          totalPerDayPackages.firm += cargo.firm;
          return (
            <PackageRow
              cargo={cargo}
              checkState={checkState}
              dateTimeStr={dateTimeStr}
              directionStr={directionStr}
              index={index}
              ownerStr={ownerStr}
              parcels={parcels}
              senderStr={senderStr}
              setParcels={setParcels}
            />
          );
        }
      })}
      {cargos.length > 0 ? (
        <Summary
          card={totalPerDayPackages.card}
          cash={totalPerDayPackages.cash}
          count={cargos.length}
          earned={totalPerDayPackages.earned}
          firm={totalPerDayPackages.firm}
          message={'Итоги для посылок'}
          office={totalPerDayPackages.office}
          pay={totalPerDayPackages.pay}
          total={totalPerDayPackages.total}
        />
      ) : (
        ''
      )}
      {((daySum.count += +totalPerDay.passengers + +cargos.length),
      (daySum.card += +totalPerDay.card),
      (daySum.cash += +totalPerDay.cash + +totalPerDayPackages.cash),
      (daySum.office += +totalPerDay.office),
      (daySum.correction += +totalPerDay.correction),
      (daySum.total += +totalPerDay.tripSum),
      (daySum.earned += +totalPerDay.toDriver + +totalPerDayPackages.earned),
      (daySum.pay += +totalPerDay.giveToDriver + +totalPerDayPackages.pay),
      (daySum.firm += +totalPerDay.firm + +totalPerDayPackages.firm)) && (
        <Summary
          card={daySum.card}
          cash={daySum.cash}
          correction={daySum.correction}
          count={daySum.count}
          earned={daySum.earned}
          firm={daySum.firm}
          message={'Итоги за день'}
          office={daySum.office}
          pay={daySum.pay}
          total={daySum.total}
        />
      )}
    </Grid>
  );
}

export default TableContent;
