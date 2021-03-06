var fs = require('fs')
var path = require('path')
var _ = require('lodash')

var CodeGen = require('../lib/codegen').CodeGen;

var testCases = [
  {
    desc: 'Should resolve protected api',
    fixture: 'protected',
  },
  {
    desc: 'Should resolve references',
    fixture: 'ref',
  },
  {
    desc: 'Real world: Uber',
    fixture: 'uber',
  },
  {
    desc: 'Real world: users',
    fixture: 'users',
  },
  {
    desc: 'Real world: petshop',
    fixture: 'petshop',
  }
]

testCases.forEach(function(testCase) {
    test(testCase.desc, function() {
        var sourcePath = path.join(__dirname, 'fixtures', testCase.fixture, 'swagger.json')
        var swagger = JSON.parse(fs.readFileSync(sourcePath, 'UTF-8'));
        var expectedPath = path.join(__dirname, 'fixtures', testCase.fixture, 'expected.ts')

        var actual = CodeGen.getTypescriptCode({
            moduleName: testCase.fixture,
            className: _.capitalize(testCase.fixture) + 'Api',
            swagger: swagger,
            lint: false,
            beautify: true
        });

        if (fs.existsSync(expectedPath)) {
            var expected = fs.readFileSync(expectedPath, 'UTF-8');
            expect(actual).toBe(expected)
        } else {
            fs.writeFileSync(expectedPath, actual)
        }
    })
})