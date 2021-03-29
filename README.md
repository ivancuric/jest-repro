In this repo, running `yarn test` will throw "not wrapped in act(...)" warnings unlike https://github.com/ivancuric/jest-repro-2

Solution is to use `testRunner: 'jest-circus/runner',`
