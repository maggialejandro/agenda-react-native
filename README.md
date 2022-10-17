# React Native Agenda 📆

![BuildStatus](https://github.com/maggialejandro/agenda-react-native/actions/workflows/lint.yml/badge.svg)
[![NPM version](https://img.shields.io/npm/v/agenda-react-native.svg)](https://www.npmjs.com/package/agenda-react-native)
[![npm](https://img.shields.io/npm/dm/agenda-react-native.svg)](https://github.com/maggialejandro/agenda-react-native)
[![CodeFactor](https://www.codefactor.io/repository/github/maggialejandro/agenda-react-native/badge)](https://www.codefactor.io/repository/github/maggialejandro/agenda-react-native)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

## Installation

```console
npm install agenda-react-native --save
```

Using yarn

```console
yarn add agenda-react-native
```

<p align="center">
  <img alt="Screenshot" src="https://github.com/maggialejandro/agenda-react-native/blob/main/screenshot.png?raw=true" width="400" />
</p>

## Usage

## API

| Prop                 | Description                              | Required? | Default | Type                   |
| -------------------- | ---------------------------------------- | --------- | ------- | ---------------------- |
| **`onDayPress`**     | Callback called when a day is pressed.   | no        |         | (date: Date) => void   |
| **`onEventPress`**   | Callback called when a event is pressed. | no        |         | (event: Event) => void |
| **`selectedDay`**    | Selected day                             | no        | today   | Date                   |
| **`events`**         | Events                                   | no        |         | Event[]                |
| **`monthTheme`**     | Month component theme                    | no        |         | MonthThemeType         |
| **`theme`**          | Agenda theme                             | no        |         | ThemeType              |
| **`locale`**         | Locale                                   | no        |         | LocaleType             |
| **`firstDayMonday`** | Monday as first day of the week          | no        | false   | boolean                |

## License

MIT
