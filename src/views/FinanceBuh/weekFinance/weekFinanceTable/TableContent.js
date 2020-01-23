import React from 'react';
import { Grid } from '@material-ui/core';
import Row from './Row';
import Summary from './Summary';
import PackageRow from './Package';

function TableContent(props) {
  const {
    finances,
    setFinances,
    parcels,
    setParcels,
    checkState,
    exportData,
    setExportData,
    localDataRoutes,
    totalPerDayRoutes,
    localDataParcels,
    totalPerDayPackages,
    daySum
  } = props;

  return (
    <Grid container spacing={1}>
      {localDataRoutes
        ? localDataRoutes.map((row, i) => (
            <Row
              cash={row.cash}
              checkState={checkState}
              card={row.card}
              carDriver={row.carDriver}
              carTitle={row.carTitle}
              carOwner={row.carOwner}
              currentCorrection={row.currentCorrection}
              direction={row.direction}
              exportData={exportData}
              isSingleRoute={row.isSingleRoute}
              totalPassengers={row.totalPassengers}
              payToDriver={row.payToDriver}
              finances={finances}
              fromTime={row.fromTime}
              setExportData={setExportData}
              setFinances={setFinances}
              startRouteId={row.startRouteId}
              key={i}
              office={row.office}
              toCityId={row.toCityId}
              fromCityId={row.fromCityId}
            />
          ))
        : ''}
      {totalPerDayRoutes ? (
        <Summary
          card={totalPerDayRoutes.card}
          cash={totalPerDayRoutes.cash}
          correction={totalPerDayRoutes.correction}
          count={totalPerDayRoutes.count}
          earned={totalPerDayRoutes.earned}
          exportData={exportData}
          firm={totalPerDayRoutes.firm}
          message="Итоги по рейсам"
          office={totalPerDayRoutes.office}
          pay={totalPerDayRoutes.pay}
          setExportData={setExportData}
          total={totalPerDayRoutes.total}
        />
      ) : (
        ''
      )}
      {localDataParcels
        ? localDataParcels.map((parcel, i) => (
            <PackageRow
              cargo={parcel}
              checkState={checkState}
              dateTimeStr={parcel.dateTimeStr}
              directionStr={parcel.directionStr}
              exportData={exportData}
              index={i}
              ownerStr={parcel.ownerStr}
              parcels={parcels}
              senderStr={parcel.senderStr}
              setExportData={setExportData}
              setParcels={setParcels}
            />
          ))
        : ''}
      {totalPerDayPackages ? (
        <Summary
          card={totalPerDayPackages.card}
          cash={totalPerDayPackages.cash}
          correction={totalPerDayPackages.correction}
          count={totalPerDayPackages.count}
          earned={totalPerDayPackages.earned}
          exportData={exportData}
          firm={totalPerDayPackages.firm}
          message="Итоги для посылок"
          office={totalPerDayPackages.office}
          pay={totalPerDayPackages.pay}
          setExportData={setExportData}
          total={totalPerDayPackages.total}
        />
      ) : (
        ''
      )}
      {daySum ? (
        <Summary
          card={daySum.card}
          cash={daySum.cash}
          correction={daySum.correction}
          count={daySum.count}
          earned={daySum.earned}
          exportData={exportData}
          firm={daySum.firm}
          message="Итоги за день"
          office={daySum.office}
          pay={daySum.pay}
          setExportData={setExportData}
          total={daySum.total}
        />
      ) : (
        ''
      )}
    </Grid>
  );
}

export default TableContent;
