import { cities, citiesName } from '../../../helpers/constants';

export function calculateParcels(cargos, packagesIds, parcels) {
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

  cargos.map(cargo => {
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
      totalPerDay.cash += +currentPackage.cash;
      totalPerDay.earned += +currentPackage.earned;
      totalPerDay.pay += +currentPackage.pay;
      totalPerDay.firm += +currentPackage.firm;
      dataToExport.push({
        Тип: 'Посылка',
        Номер_машины: cargo.carNumber,
        Время_рейса: new Date(cargo.dateTime).toLocaleString(),
        Владелец: ownerStr,
        Водитель: senderStr,
        Направление: `${citiesName[cargo.fromCityId]} - ${
          citiesName[cargo.toCityId]
        }`,
        Пассажиров: cargo.dateTime,
        Карта: cargo.card,
        Наличные: cargo.cash,
        Офис: cargo.office,
        Корректировка: '',
        Всего: cargo.total,
        Начислено: cargo.earned,
        Выдача: cargo.pay,
        Фирма: cargo.firm,
        startRouteId: cargo.routeId,
        packageId: cargo.packageId
      });
      localData.push({
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
      totalPerDay.cash += +cargo.cash;
      totalPerDay.card += +cargo.card;
      totalPerDay.office += +cargo.office;
      totalPerDay.total += +cargo.total;
      totalPerDay.earned += +cargo.earned;
      totalPerDay.pay += +cargo.pay;
      totalPerDay.firm += +cargo.firm;
      dataToExport.push({
        Тип: 'Посылка',
        Время_рейса: new Date(cargo.dateTime).toLocaleString(),
        Номер_машины: cargo.carNumber,
        Владелец: ownerStr,
        Водитель: senderStr,
        Направление: `${citiesName[cargo.fromCityId]} - ${
          citiesName[cargo.toCityId]
        }`,
        Пассажиров: 1,
        Карта: cargo.card,
        Наличные: cargo.cash,
        Офис: cargo.office,
        Корректировка: '',
        Всего: cargo.total,
        Начислено: cargo.earned,
        Выдача: cargo.pay,
        Фирма: cargo.firm,
        startRouteId: cargo.routeId,
        packageId: cargo.packageId
      });
      localData.push({
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
      });
    }
  });
  return { localData, totalPerDay, dataToExport };
}
