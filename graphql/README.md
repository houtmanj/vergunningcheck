# Install / run

```bash
npm i
npm run dev
```

To override local configuration, ie. changing the api's you use, please
copy `./config/local.dist.js` to `./config/local.js`.

# Requests / data needs

adresseerbaar_object_id": "0363010000783024
betreft_pand=0363100012182894

bag-verblijfsobject (adresseerbaar_object_id)

- pand (landelijk_id)

* 0 Gebruik postalCode en houseNumber user input voor `/atlas/search/adres/?q=${postalCode}+${houseNumber}` ([0-bagsearch.json](./src/loaders/__mocks__/0-bagsearch.json))
  - 1 Gebruik `adresseerbaar_object_id` voor requests naar `/bag/verblijfsobject/${adresseerbaar_object_id}/` ([1-verblijfsobject.json](./src/loaders/__mocks__/1-verblijfsobject.json))
    - 1a gebruik `geometrie.coordinates` voor `afnemers.ruimtelijkeplannen.nl/...` voor bestemmingsplannen (bijv. Winkeldiversiteit Centrum)
    - 1b gebruik `geometrie.coordinates` voor `/geosearch/search/?item=unesco&x=121876&y=487744` voor stadsgezicht obv `features.properties.display` (bijv. Bufferzone)
  - 2 Gebruik `adresseerbaar_object_id` voor requests naar `/bag/pand/?verblijfsobjecten__id=${adresseerbaar_object_id}`
    - 2a gebruik `landelijk_id` voor request naar `/monumenten/monumenten/?betreft_pand=${landelijk_id}` voor `monumentstatus` (bijv. Rijksmonument)
  - 3 Gebruik `adresseerbaar_object_id` voor request naar `/brk/object/?verblijfsobjecten__id=${adresseerbaar_object_id}` (kadaster-data)
    - 3a gebruik `id` voor request naar `/wkpb/beperking/?kadastrale_objecten__id=${id}` voor ????

- welstand / address.wellbeing??

```dsl

type Address {
    id: ID!
    streename: String!
    housenumber: Number!
    addition: String
    geolocation: GEO / polygoon
    monuments: [Monument]!
    cityScapes: [CityScape]!
    zoninigPlans: [ZoningPlan]!
    limitations: ???
    wellbeing: ??
}

type ZoningPlan {
    name
}

type CityScape {
    name: String!
}

type Monument {
    status: String!
}

type Activity {
    id: ID!
    name: String!
    permits: [Permit]!
}

type Permit {
    id: ID!
    name: String
    questions: [Question!]!
    decisions: [Decision!]!
}

union Question = BooleanQuestion | ListQuestion | GEOQuestion | RegisterQuestion

type Decision {
    id: ID!
    inputs: [Question!]!
    conclusion: Conclusion
    rules: [Rule!]!
}

type Conclusion {
    id: ID!
    decisions: [ID!]!
    rules: [Rule!]!
}

type Rule {
    inputConditions: [SimpleType!]!
    outputValue: String!
}

union SimpleType = String | Number | Boolean

type BooleanQuestion {
    text: String!
    description: String!
    longDescription: String!
}

type ListQuestion {
    options: ???
    text: String!
    description: String!
    longDescription: String!
}

type GEOQuestion {
    lat
    lon
    text: String!
    description: String!
    long_description: String!
}

type RegisterQuestion { }

type Query {
    searchAddress(streetname, housenumber, limit) {
        matches: [Address]!
        exactMatch: Address
    }

    activities: [Activity]!
    activity(id): Activity
}
```

```graphql
query ComplextQuery {
    fragment basicAddress on Address {
        streename
        housenumber
        addition
    }
    searchAddress(street_name: "basisweg", house_number: "40", limit: 10) {
        matches {
            ...basicAddress
        }
        exactMatch {
            ... basicAddress
            geolocation
            isMonument
            wellbeing { }
        }
    }
    activity(id: "dakkapel") {
        permits {
            name
            inputs {
                id
                ... on GeoInput { }
                ... on ListInput {
                    text
                    options { }
                }
                ... on BooleanInput {
                    text
                }
            }
            decisions {
                id
                requiredInputs {
                    ... on QuestionInput { }
                    ... on DecisionInput { }
                }
                rules {
                    outputValue
                    inputValues { }
                }
            }
            conclusion {

            }
        }
    }
}
```
