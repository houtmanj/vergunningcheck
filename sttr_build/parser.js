const hash = require('object-hash');

const parser = require('fast-xml-parser');
const get = require('lodash.get');

/**
 * Convert field-types from 'feel'-spec to our representation
 *
 * @param {string} feel the string according to feel spec
 * @returns {string} the resulting type string
 */
function feel2js(feel) {
  return feel.replace('feel:', '');
}

/**
 * A parser for STTR-XML files
 */
class Parser {
  /**
   * @param {string} xml - STTR-XML
   */
  constructor(xml) {
    const parsed = parser.parse(xml, {
      ignoreAttributes: false,
      arrayMode: true,
    });

    const definitions = parsed['dmn:definitions'][0];
    this.name = definitions['@_name'];
    this.id = definitions['@_id'];

    this.xmlInputs = definitions['dmn:inputData'];
    this.xmlDecisions = definitions['dmn:decision'];
    [this.xmlExtensionElements] = definitions['dmn:extensionElements'];
  }

  /**
   * Get decisions configuration
   *
   * @returns {any} a configuration object for decisions
   */
  get decisions() {
    return this.xmlDecisions.reduce((xmlDecisions, xmlDecision) => {
      // console.log(xmlDecision);
      const res = xmlDecision['dmn:informationRequirement'].reduce((acc, ir) => {
        const key = Object.keys(ir)[0]; // get the tagName
        const shortKey = `${key.split(':')[1]}s`;
        const href = ir[key][0]['@_href'];

        const result = acc;
        result[shortKey] = (result[shortKey] || []).concat(href);
        return result;
      }, {});

      const table = xmlDecision['dmn:decisionTable'][0];
      const rules = table['dmn:rule'].reduce((acc, rule) => {
        const $oe = get(rule, 'dmn:outputEntry.0');
        const description = get($oe, 'dmn:extensionElements.0.content:conclusieToelichting.0.content:toelichting');
        acc.push({
          inputs: rule['dmn:inputEntry'].reduce((inputEntry, ie) => {
            inputEntry.push(ie['dmn:text']);
            return inputEntry;
          }, []),
          output: $oe['dmn:text'],
          description,
        });
        return acc;
      }, []);
      res.decisionTable = {
        rules,
      };
      const copy = xmlDecisions;
      copy[xmlDecision['@_id']] = res;
      return copy;
    }, {});
  }

  /**
   * Get input configuration
   *
   * @returns {any} a configuration object for inputs
   */
  get inputs() {
    return this.xmlInputs.reduce((acc, curr) => {
      const el = curr['dmn:extensionElements'][0];
      const href = el['uitv:uitvoeringsregelRef'][0]['@_href'];
      acc[curr['@_id']] = {
        href,
        type: feel2js(curr['dmn:variable'][0]['@_typeRef']),
      };
      return acc;
    }, {});
  }

  /**
   * Get questions configuration
   *
   * @returns {any} a configuration object for questions
   */
  get questions() {
    const rules = this.xmlExtensionElements['uitv:uitvoeringsregels'][0];
    const questions = rules['uitv:uitvoeringsregel'];

    return questions.reduce((acc, curr) => {
      let result;
      if (curr['uitv:geoVerwijzing']) {
        const q = curr['uitv:geoVerwijzing'][0];
        result = {
          identification: q['uitv:locatie'][0]['@_identificatie'],
          type: 'geo',
        };
      } else {
        const question = curr['uitv:vraag'][0];
        const desc = curr['content:uitvoeringsregelToelichting'];
        let description;
        if (desc && desc.length > 0) {
          description = desc[0]['content:toelichting'].trim();
        }
        result = {
          text: question['uitv:vraagTekst'],
          type: question['uitv:gegevensType'],
          description,
        };
      }
      result.id = curr['@_id'];
      const sha = hash(result);
      acc[sha] = result;
      return acc;
    }, {});
  }

  /**
   * Bundle all configuration for Checker implementation
   *
   * @returns {any} a configuration object for Checker
   */
  getClientConfig() {
    return {
      name: this.name,
      questions: this.questions,
      inputs: this.inputs,
      decisions: this.decisions,
    };
  }
}

module.exports = xml => new Parser(xml).getClientConfig();
