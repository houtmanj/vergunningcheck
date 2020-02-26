const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const getChecker = require("../");

const readdir = promisify(fs.readdir);

const buildDir = path.join(__dirname, "../../.build");

const randbool = () => Math.random() >= 0.5;
const getConfigFromFile = filename => {
  const filepath = path.join(buildDir, filename);
  const buffer = fs.readFileSync(filepath);
  return JSON.parse(buffer.toString());
};

const getCheckerFromFile = filename => getChecker(getConfigFromFile(filename));

const play = checker => {
  let question = checker.next();
  while (question) {
    if (question.type === "boolean") {
      question.setAnswer(randbool());
    } else {
      question.setAnswer("sure! why not.");
    }
    question = checker.next();
  }
};

describe("sttr client", () => {
  test("getChecker", () => {
    expect(() => {
      getChecker({
        decisions: [],
        questions: []
      });
    }).toThrow("'decisions' should not be empty.");
    expect(() => {
      getChecker({
        decisions: [{ a: 1 }],
        questions: []
      });
    }).toThrow("'questions' should not be empty.");
    expect(() => {
      getChecker({
        questions: [{ a: 1 }],
        decisions: [{ b: 2 }]
      });
    }).toThrow("Unsupported type for Question (undefined)");

    expect(() => {
      getChecker({
        questions: [
          {
            id: "abc",
            type: "boolean",
            text:
              "Gaat u met de aanbouw meer dan 50% van het perceel bebouwen dat binnen de bestemming &#39;tuin&#39;?"
          }
        ],
        decisions: [{ b: 2 }]
      });
    }).toThrow("Either 'requiredInputs' or 'requiredDecisions' are needed");
  });
  test("getChecker", async done => {
    const config = await getConfigFromFile("MtNRm9GhSkdPavHJa.json");
    const checker = getChecker(config);

    expect(checker._decisions.length).toBe(8); // in the future we want to have dummy-conclusion too

    // need JSON.parse(JSON.stringify to bypass Rule vs Object in 'toEqual'
    expect(JSON.parse(JSON.stringify(checker._decisions[6]))).toEqual({
      _id: "_e3129e92-795c-434e-a145-04f6e746c9bd",
      _inputs: [
        {
          // because JSON.parse(JSON.stringify leaves out undefined values we comment these out
          // _answer: undefined,
          // _description: undefined,
          _id: "uitv__041564fd-7ab5-45b5-b5bb-96d531af5846",
          _text:
            "Krijgt de aanbouw een groen dak met een waterbergend vermogen van ten minste 60 mm?",
          _type: "boolean"
        }
      ],
      _rules: [
        { _inputConditions: [false], _outputValue: '"Vergunningplicht"' },
        { _inputConditions: [true], _outputValue: '"no hit"' }
      ]
    });

    /*
		expect(checker._decisions[7]).toEqual({
			_id: "dummy",
			_inputs: [
				"#_f6e3ccd7-28d5-436d-9e4c-f7fb6be8ecc7",
				"#_0738d987-6183-4e1f-9ae0-8bb6b20a9bce",
				"#_af7ca4ca-bbfa-4465-9e54-03ef5b667438",
				"#_595a4afb-f8b8-400b-9e62-04083f0e38f7",
				"#_b24e1769-e068-441e-9ff3-1cbcd354b06e",
				"#_54dcd8cc-5fb2-4c4f-820f-b9c083f16935",
				"#_e3129e92-795c-434e-a145-04f6e746c9bd"
			],
			_rules: [
				{
					_description: undefined,
					_inputConditions: [
						'"Vergunningplicht"',
						"-",
						"-",
						"-",
						"-",
						"-",
						"-"
					],
					_outputValue: '"Vergunningplicht"'
				},
				{
					_description: undefined,
					_inputConditions: [
						"-",
						'"Vergunningplicht"',
						"-",
						"-",
						"-",
						"-",
						"-"
					],
					_outputValue: '"Vergunningplicht"'
				},
				{
					_description: undefined,
					_inputConditions: [
						"-",
						"-",
						'"Vergunningplicht"',
						"-",
						"-",
						"-",
						"-"
					],
					_outputValue: '"Vergunningplicht"'
				},
				{
					_description: undefined,
					_inputConditions: [
						"-",
						"-",
						"-",
						'"Vergunningplicht"',
						"-",
						"-",
						"-"
					],
					_outputValue: '"Vergunningplicht"'
				},
				{
					_description: undefined,
					_inputConditions: [
						"-",
						"-",
						"-",
						"-",
						'"Vergunningplicht"',
						"-",
						"-"
					],
					_outputValue: '"Vergunningplicht"'
				},
				{
					_description: undefined,
					_inputConditions: [
						"-",
						"-",
						"-",
						"-",
						"-",
						'"Vergunningplicht"',
						"-"
					],
					_outputValue: '"Vergunningplicht"'
				},
				{
					_description: undefined,
					_inputConditions: [
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						'"Vergunningplicht"'
					],
					_outputValue: '"Vergunningplicht"'
				},
				{
					_description: undefined,
					_inputConditions: [
						'"no hit"',
						'"no hit"',
						'"no hit"',
						'"no hit"',
						'"no hit"',
						'"no hit"',
						'"no hit"'
					],
					_outputValue: '"Toestemmingsvrij"'
				}
			]
		}); // in the future we want to have dummy-conclusion too
		*/
    done();
  });

  test("run all", async () => {
    const files = await readdir(buildDir);
    expect(files.length > 0).toBe(true);

    files
      .filter(
        file => file.indexOf("topics") === -1 && file.indexOf(".json") !== -1
      )
      // .map(e => {
      // 	debug("starting file", new Date(), e);
      // 	return e;
      // })
      .map(getCheckerFromFile)
      .forEach(checker => {
        // debug(checker);
        expect(() => play(checker)).not.toThrow();
      });
  });
});
