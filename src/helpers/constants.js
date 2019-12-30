export const ownersId = new Set([7, 38, 52]);
export const isPassenger = 1;
export const wrongPricePassengerColor = '#8C8C8C';
export const notStandardTripColor = '#8C8C8C';
export const delivered = 3;
export const canceledState = 5;
export const payNot = 1;
export const payCash = 4;
export const payCard = 2;
export const payOffice = 3;
export const minPrice700 = 700;
export const maxPrice900 = 900;
export const minPrice900 = 900;
export const maxPrice1000 = 1000;
export const notStandard = 5000;
export const cities = {
  '10': 'В',
  '23': 'А',
  '52': 'Ес',
  '67': 'КВ',
  '72': 'Кдр',
  '90': 'Н',
  '119': 'Р',
  '133': 'Сч',
  '134': 'Став',
  '166': 'Э',
  '1797': 'МВ',
  '8748': 'Зим',
  '3462': 'Афип',
  '1042266': 'Ольг',
  '1014887': 'Солод'
};
export const cityShortNames = {
  '10': 'ВЛГ',
  '23': 'АСТ',
  '52': 'ЕСТ',
  '67': 'КСВ',
  '72': 'КДР',
  '90': 'НЛЧ',
  '119': 'РНД',
  '133': 'СОЧ',
  '134': 'СТВ',
  '166': 'ЭЛС',
  '1797': 'МВД',
  '8748': 'ЗМВ',
  '1042266': 'ОЛГ',
  '1014887': 'СОЛ'
};
export const citiesName = {
  '1': 'Москва',
  '10': 'Волгоград',
  '21': 'Армавир',
  '23': 'Астрахань',
  '38': 'Владикавказ',
  '40': 'Волжский',
  '44': 'Геленджик',
  '52': 'Ессентуки',
  '53': 'Жуковский',
  '62': 'Калуга',
  '67': 'Кисловодск',
  '72': 'Краснодар',
  '90': 'Нальчик',
  '98': 'Новороссийск',
  '103': 'Обнинск',
  '119': 'Ростов-на-Дону',
  '133': 'Сочи',
  '134': 'Ставрополь',
  '139': 'Таганрог',
  '143': 'Тольятти',
  '155': 'Химки',
  '160': 'Грозный',
  '164': 'Шахты',
  '166': 'Элиста',
  '354': 'Анапа',
  '355': 'Лагань',
  '669': 'Железноводск',
  '818': 'Ялта',
  '1261': 'Михайловск',
  '1449': 'Буденновск',
  '1797': 'Минеральные Воды',
  '3060': 'Ипатово',
  '3462': 'Афипский',
  '3700': 'Волгодонск',
  '3978': 'Цимлянск',
  '6310': 'Троицкое',
  '6356': 'Цаган-Аман',
  '7188': 'Судак',
  '8748': 'Зимовники',
  '8963': 'Кетченеры',
  '12895': 'Ики-Бурул',
  '14209': 'Заветное',
  '17290': 'Витязево',
  '17472': 'Малые Дербеты',
  '20320': 'Архипо-Осиповка',
  '1014402': 'Дальний',
  '1031866': 'Шин-Мер',
  '1042266': 'Ольгинка',
  '1042272': 'Пляхо',
  '1079156': 'Дмитриадовка',
  '1030609': 'Аушигер',
  '1031804': 'Городовиковск',
  '1053557': 'Внуково',
  '1054308': 'Домодедово',
  '1014887': 'Солодушино'
};
export const payToDrivers = {
  'no passengers': {
    all: 0,
    owner_id: 0
  },
  'Э-МВ 4 1': {
    all: 4000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },

  'Э-В 4 1': {
    all: 4000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 4 2': {
    all: 4000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 4 3': {
    all: 4000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 4 4': {
    all: 4000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 4 5': {
    all: 4000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 4 6': {
    all: 4000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 4 7': {
    all: 4200,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 4 8': {
    all: 4800,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 5 1': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 5 2': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 5 3': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 5 4': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 5 5': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 5 6': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 5 7': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 5 8': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 5 9': {
    all: 5400,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 5 10': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 6 1': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 6 2': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 6 3': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 6 4': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 6 5': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 6 6': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 6 7': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 6 8': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 6 9': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 6 10': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 6 11': {
    all: 6600,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 6 12': {
    all: 7200,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 7 1': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 7 2': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 7 3': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 7 4': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 7 5': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 7 6': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 7 7': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 7 8': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 7 9': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 7 10': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 7 11': {
    all: 6600,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 7 12': {
    all: 7200,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 7 13': {
    all: 7800,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 7 14': {
    all: 8400,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-В 8 1': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-В 8 2': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-В 8 3': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-В 8 4': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-В 8 5': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-В 8 6': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-В 8 7': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-В 8 8': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-В 8 9': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-В 8 10': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-В 8 11': {
    all: 6600,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-В 8 12': {
    all: 7200,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-В 8 13': {
    all: 7800,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7800
  },
  'Э-В 8 14': {
    all: 8400,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 8400
  },
  'Э-В 8 15': {
    all: 9000,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 9000
  },
  'Э-В 8 16': {
    all: 9600,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 9600
  },
  'Э-А 4 1': {
    all: 4000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 4 2': {
    all: 4000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 4 3': {
    all: 4000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 4 4': {
    all: 4000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 4 5': {
    all: 4000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 4 6': {
    all: 4000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 4 7': {
    all: 4200,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 4 8': {
    all: 4800,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 5 1': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 5 2': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 5 3': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 5 4': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 5 5': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 5 6': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 5 7': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 5 8': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 5 9': {
    all: 5400,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 5 10': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 6 1': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 6 2': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 6 3': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 6 4': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 6 5': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 6 6': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 6 7': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 6 8': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 6 9': {
    all: 5500,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 6 10': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 6 11': {
    all: 6600,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 6 12': {
    all: 7200,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 7 1': {
    all: 5900,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 7 2': {
    all: 5900,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 7 3': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 7 4': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 7 5': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 7 6': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 7 7': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 7 8': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 7 9': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 7 10': {
    all: 6000,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 7 11': {
    all: 6600,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 7 12': {
    all: 7200,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 7 13': {
    all: 7800,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 7 14': {
    all: 8400,
    minPrice: minPrice700,
    maxPrice: maxPrice900
  },
  'Э-А 8 1': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-А 8 2': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-А 8 3': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-А 8 4': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-А 8 5': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-А 8 6': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-А 8 7': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-А 8 8': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-А 8 9': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-А 8 10': {
    all: 6500,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-А 8 11': {
    all: 6600,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-А 8 12': {
    all: 7200,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7500
  },
  'Э-А 8 13': {
    all: 7800,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 7800
  },
  'Э-А 8 14': {
    all: 8400,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 8400
  },
  'Э-А 8 15': {
    all: 9000,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 9000
  },
  'Э-А 8 16': {
    all: 5000,
    minPrice: minPrice700,
    maxPrice: maxPrice900,
    owner_id: 9600
  },
  'Э-Р 4 1': {
    all: 5500,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 4 2': {
    all: 5500,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 4 3': {
    all: 5500,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 4 4': {
    all: 5500,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 4 5': {
    all: 5500,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 4 6': {
    all: 5500,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 4 7': {
    all: 5600,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 4 8': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 5 1': {
    all: 6000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 5 2': {
    all: 6000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 5 3': {
    all: 6000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 5 4': {
    all: 6000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 5 5': {
    all: 6000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 5 6': {
    all: 6000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 5 7': {
    all: 6000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 5 8': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 5 9': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 5 10': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 6 1': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 6 2': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 6 3': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 6 4': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 6 5': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 6 6': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 6 7': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 6 8': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 6 9': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 6 10': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 6 11': {
    all: 8800,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 6 12': {
    all: 9600,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 7 1': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 7 2': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 7 3': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 7 4': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 7 5': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 7 6': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 7 7': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 7 8': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 7 9': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 7 10': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 7 11': {
    all: 8800,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 7 12': {
    all: 9600,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 7 13': {
    all: 10400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 7 14': {
    all: 11200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'Э-Р 8 1': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'Э-Р 8 2': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'Э-Р 8 3': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'Э-Р 8 4': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'Э-Р 8 5': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'Э-Р 8 6': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'Э-Р 8 7': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'Э-Р 8 8': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'Э-Р 8 9': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'Э-Р 8 10': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'Э-Р 8 11': {
    all: 8800,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'Э-Р 8 12': {
    all: 9600,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9600
  },
  'Э-Р 8 13': {
    all: 10400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 10400
  },
  'Э-Р 8 14': {
    all: 11200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 11200
  },
  'Э-Р 8 15': {
    all: 12000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 12000
  },
  'Э-Р 8 16': {
    all: 12800,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 12800
  },
  'А-В 4 1': {
    all: 5500,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 4 2': {
    all: 5500,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 4 3': {
    all: 5500,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 4 4': {
    all: 5500,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 4 5': {
    all: 5500,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 4 6': {
    all: 5500,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 4 7': {
    all: 5600,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 4 8': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 5 1': {
    all: 6000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 5 2': {
    all: 6000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 5 3': {
    all: 6000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 5 4': {
    all: 6000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 5 5': {
    all: 6000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 5 6': {
    all: 6000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 5 7': {
    all: 6000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 5 8': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 5 9': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 5 10': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 6 1': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 6 2': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 6 3': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 6 4': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 6 5': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 6 6': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 6 7': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 6 8': {
    all: 6400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 6 9': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 6 10': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 6 11': {
    all: 8800,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 6 12': {
    all: 9600,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 7 1': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 7 2': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 7 3': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 7 4': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 7 5': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 7 6': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 7 7': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 7 8': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 7 9': {
    all: 7200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 7 10': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 7 11': {
    all: 8800,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 7 12': {
    all: 9600,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 7 13': {
    all: 10400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 7 14': {
    all: 11200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000
  },
  'А-В 8 1': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'А-В 8 2': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'А-В 8 3': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'А-В 8 4': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'А-В 8 5': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'А-В 8 6': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'А-В 8 7': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'А-В 8 8': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'А-В 8 9': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'А-В 8 10': {
    all: 8000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'А-В 8 11': {
    all: 8800,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9000
  },
  'А-В 8 12': {
    all: 9600,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 9600
  },
  'А-В 8 13': {
    all: 10400,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 10400
  },
  'А-В 8 14': {
    all: 11200,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 11200
  },
  'А-В 8 15': {
    all: 12000,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 12000
  },
  'А-В 8 16': {
    all: 12800,
    minPrice: minPrice900,
    maxPrice: maxPrice1000,
    owner_id: 12800
  }
};
