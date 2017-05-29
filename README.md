# [Pushover](https://pushover.net/) plugin for [WatchMen](https://github.com/iloire/WatchMen)

> Notifies you about outages over Pushover. Outage notifications are by default high priority (`2`) and have to be acknowledged by the recipient.

## Installation
Run the following command in your [WatchMen](https://github.com/iloire/WatchMen) installation's root folder:
```bash
npm i --save watchmen-plugin-pushover
```

## Configuration (environment variables)
- `WATCHMEN_PUSHOVER_USER`: Login at [Pushover](https://pushover.net/) and copy "Your User Key"
- `WATCHMEN_PUSHOVER_TOKEN`: Head to "You Applications" in the Pushover interface (create an application if necessary) and copy the "API Token/Key"

## Contributions
- Feel free to open an issue or PR, if you are missing a feature, config option, etc.
- Coding style is adapted from StandardJS.

## History

**0.1.0**

- Initial release
