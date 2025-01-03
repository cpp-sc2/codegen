# Codegen

![CI Status](https://github.com/cpp-sc2/codegen/workflows/Node.js%20CI/badge.svg)
[![Code Climate](https://codeclimate.com/github/cpp-sc2/codegen/badges/gpa.svg)](https://codeclimate.com/github/cpp-sc2/codegen)
[![Test Coverage](https://codeclimate.com/github/cpp-sc2/codegen/badges/coverage.svg)](https://codeclimate.com/github/cpp-sc2/codegen/coverage)

## About

Code generation utility for StarCraft II. Produces list of type IDs taken from
`stableid.json` for cpp-sc2 API.

## Requirements

* OS X (feel free to send a PR to support other platforms).
* nodejs >= 14
* Starcraft II installation.

## Usage

```bash
# Install dependencies.
$ npm install

# Generate the code using installed game.
$ npm start "/Users/alkurbatov/Library/Application Support/Blizzard/StarCraft II/stableid.json"

# Generate the code using one of saved ID files.
$ npm start ./assets/4.10.2-stableid.json

# Run tests
$ npm test
```

## License

Copyright (c) 2020-2024

Licensed under the [GPL 3.0 license](LICENSE).
