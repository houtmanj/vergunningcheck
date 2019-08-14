import React from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import {
  Button,
  // TextField,
} from '@datapunt/asc-ui';

import config from './config';

class Questionarnaire extends React.Component {
  constructor(props) {
    super(props);

    this.onGoToQuestion = this.onGoToQuestion.bind(this);
    this.onGoToNext = this.onGoToNext.bind(this);
    this.onGoToPrev = this.onGoToPrev.bind(this);

    this.state = {
      // hasError: false,
      questionIndex: 0,
      // currentQuestion: 0,
      // currentQuestionId: 0,
      userAnswers: {},

      // debug: true,
    };
  }

  onGoToQuestion(questionId) {
    let questionIndex = 0;
    // Used for() instead of findIndex(), because of https://stackoverflow.com/a/15998003
    for (let i = 0; i < config.uitvoeringsregels.length; i += 1) {
      if (config.uitvoeringsregels[i].id === questionId) {
        questionIndex = i;
        break;
      }
    }
    this.setState({
      questionIndex,
    });
  }

  onGoToNext(questionId, answerId) {
    this.setState(prevState => ({
      questionIndex: prevState.questionIndex + 1,
      userAnswers: {
        ...prevState.userAnswers,
        [questionId]: answerId,
      },
    }));
  }

  onGoToPrev() {
    this.setState(prevState => ({
      questionIndex: prevState.questionIndex - 1,
    }));
  }

  render() {
    const { questionIndex, userAnswers } = this.state;
    // console.log(userAnswers);

    const { uitvoeringsregels } = config;

    if (questionIndex > 0 && questionIndex >= uitvoeringsregels.length) {
      return (
        <div>
          <h3>Overzicht</h3>
          <div>
            {uitvoeringsregels.map((regel, index) => {
              const userAnswer = userAnswers[regel.id];
              const answer = regel.vraag.antwoordOpties
                .filter(antwoord => antwoord.id === userAnswer)
                .map(antwoord => antwoord.optieText);
              return (
                <div key={regel.id} style={{ columnCount: '3' }}>
                  <div key={regel.vraag.vraagTekst}>
                    {index}: {regel.vraag.vraagTekst}
                  </div>
                  <div key={answer}>{answer}</div>
                  <button
                    onClick={() => this.onGoToQuestion(regel.id)}
                    type="button"
                    href="#"
                    key={regel.content.toelicht}
                  >
                    Wijzig
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (questionIndex < 0 || !uitvoeringsregels[questionIndex]) {
      return null;
    }

    const currentObject = uitvoeringsregels[questionIndex];
    // console.log('CURRENTOBJECT', currentObject);

    const {
      id: questionId,
      vraag: { vraagTekst, antwoordOpties },
      content: { toelichting },
    } = currentObject;

    if (userAnswers[questionId]) {
      // console.log('has already answer!');
      // console.log(userAnswers[questionId]);
    }
    const userAnswer = userAnswers[questionId] || null;

    return (
      <div className="address-input">
        <h2>Questionarnaire:</h2>
        <div>
          <h3 data-id={questionId}>{vraagTekst}</h3>
          <p>{toelichting}</p>
          <div>
            {antwoordOpties.map(answer => {
              let prefilled = answer.waarde ? { background: 'LimeGreen' } : {};
              if (userAnswer) {
                prefilled = {};
                if (userAnswer === answer.id) {
                  prefilled = { background: 'green' };
                }
              }
              return (
                <Button
                  onClick={() => this.onGoToNext(questionId, answer.id)}
                  question-id={questionId}
                  answer-id={answer.id}
                  type="submit"
                  key={answer.id}
                  style={prefilled}
                  data-id={answer.id}
                >
                  {answer.optieText}
                </Button>
              );
            })}
          </div>
        </div>
        <br />
        <br />
        {questionIndex > 0 && (
          <button type="button" onClick={this.onGoToPrev}>
            Vorige vraag
          </button>
        )}
      </div>
    );
  }
}

Questionarnaire.defaultProps = {
  // bagStatus: {
  //   geometrie: {},
  //   _display: '',
  //   _gemeente: {
  //     _display: '',
  //   },
  //   _buurtcombinatie: {
  //     naam: '',
  //   },
  //   _gebiedsgerichtwerken: {
  //     naam: '',
  //   },
  // },
  // monumentStatus: '',
  // noResults: false,
};

Questionarnaire.propTypes = {
  // streetName: PropTypes.string,
  // streetNameLoading: PropTypes.bool,
  // bagLoading: PropTypes.bool,
  // bagFetch: PropTypes.bool,
  // bagStatus: PropTypes.shape({
  //   _display: PropTypes.string,
  //   _buurtcombinatie: PropTypes.shape({
  //     naam: PropTypes.string,
  //   }),
  //   _gebiedsgerichtwerken: PropTypes.shape({
  //     naam: PropTypes.string,
  //   }),
  //   geometrie: PropTypes.object,
  //   _gemeente: PropTypes.object,
  // }),
  // monumentStatus: PropTypes.string,
  // monumentLoading: PropTypes.bool,
  // stadsgezichtStatus: PropTypes.string,
  // stadsgezichtLoading: PropTypes.bool,
  // beperkingStatus: PropTypes.arrayOf(PropTypes.object),
  // beperkingLoading: PropTypes.bool,
  // bestemmingsplanStatus: PropTypes.arrayOf(PropTypes.object),
  // bestemmingsplanLoading: PropTypes.bool,
  // onFetchStreetname: PropTypes.func.isRequired,
  // onFetchBagData: PropTypes.func.isRequired,
  // noResults: PropTypes.bool,
};

// const mapStateToProps = state =>
//   // const {
//   // // streetNameLoading,
//   // } = state;
//   ({
//     // streetNameLoading,
//   });
// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       // onFetchBagData: fetchBagData,
//       // onFetchStreetname: fetchStreetname,
//     },
//     dispatch,
//   );

export default Questionarnaire;

// export default connect(
//   // mapStateToProps,
//   {},
//   mapDispatchToProps,
// )(Questionarnaire);
