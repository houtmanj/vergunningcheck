import React from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import {
  Button,
  // TextField,
} from '@datapunt/asc-ui';
// import { fetchStreetname, fetchBagData } from './actions';
// import './style.scss';

class Questionarnaire extends React.Component {
  constructor(props) {
    super(props);

    this.onGoToNext = this.onGoToNext.bind(this);
    this.onGoToPrev = this.onGoToPrev.bind(this);

    this.state = {
      // hasError: false,
      currentQuestion: 0,
      userAnswers: {},
      questionsJson: {
        questions: [
          {
            id: 'q1',
            title: 'Is dit vraag 1?',
            answers: [
              {
                id: 'q1a',
                title: 'Ja',
              },
              {
                id: 'q1b',
                title: 'Nee',
              },
            ],
          },
          {
            id: 'q2',
            title: 'Is dit de tweede vraag?',
            subtitle: 'Deze word alleen getoond als q1.q1a',
            condition: 'q1.q1a',
            answers: [
              {
                id: 'q2a',
                title: 'Ja',
              },
              {
                id: 'q2b',
                title: 'Nee',
              },
            ],
          },
          {
            id: 'q3',
            title: 'Is dit de derde vraag?',
            subtitle: 'Deze word alleen getoond als q1.q1b',
            condition: 'q1.q1b',
            answers: [
              {
                id: 'q3a',
                title: 'Ja',
              },
              {
                id: 'q3b',
                title: 'Nee',
              },
            ],
          },
          {
            id: 'q3',
            title: 'We zijn aan het eind gekomen van de vragenlijst',
          },
        ],
      },

      // debug: true,
    };
  }

  onGoToNext(event) {
    const questionId = event.target.getAttribute('question-id');
    const answerId = event.target.getAttribute('answer-id');

    this.setState(prevState => ({
      currentQuestion: prevState.currentQuestion + 1,
      userAnswers: {
        ...prevState.userAnswers,
        [questionId]: answerId,
      },
    }));
  }

  onGoToPrev() {
    this.setState(prevState => ({
      currentQuestion: prevState.currentQuestion - 1,
    }));
  }

  render() {
    // const {
    //
    // } = this.props;

    const { questionsJson, currentQuestion, userAnswers } = this.state;

    const currentQuestionObject = questionsJson.questions[currentQuestion];

    if (!questionsJson.questions[currentQuestion]) {
      return <div>NULL</div>;
    }

    console.log(userAnswers);

    const {
      id: currentQuestionId,
      title: currentQuestionTitle,
      subtitle: currentQuestionSubtitle,
      answers: currentQuestionAnswers = [],
    } = currentQuestionObject;

    return (
      <div className="address-input">
        <h2>Questionarnaire:</h2>
        <p>currentQuestion: {currentQuestion}</p>
        <div>
          <h3>{currentQuestionTitle}</h3>
          <p>{currentQuestionSubtitle}</p>
          <p>ID: {currentQuestionId}</p>
          <div>
            {currentQuestionAnswers.map(answer => (
              <button
                onClick={this.onGoToNext}
                question-id={currentQuestionId}
                answer-id={answer.id}
                type="submit"
                key={answer.id}
              >
                {answer.title} ({answer.id})
              </button>
            ))}
          </div>
        </div>
        <br />
        <br />
        <Button onClick={this.onGoToPrev}>Vorige vraag</Button>
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
