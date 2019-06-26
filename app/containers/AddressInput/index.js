import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FormattedMessage, intlShape } from 'react-intl';
import messages from './messages';
import { Button, TextField } from '@datapunt/asc-ui';
import { getSuggestionsAction } from '../App/actions';
import './style.scss';

class AddressInput extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.state = {
      originalQuery: '',
      showSuggestions: false,
    };
  }

  componentDidMount() {
    const { onGetSuggestions, typedQuery } = this.props;
    console.log('TYPEDQUERY', typedQuery);
  }

  onFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log('submit');
  }

  onInput(event) {
    console.log('onInput:', event.target.value);
    const { onGetSuggestions } = this.props;
    //
    // event.persist();
    // if (activeSuggestion.index > -1) {
    //   this.resetActiveSuggestion();
    // }
    onGetSuggestions(event.target.value);

    this.setState({
      showSuggestions: true,
    });
  }

  render() {
    const { intl, onGetSuggestions, typedQuery } = this.props;
    const { showSuggestions } = this.state;

    return (
      <div className="address-input">
        <h3>
          <FormattedMessage {...messages.title} />
        </h3>
        <form className="address-input__form" onSubmit={this.onFormSubmit}>
          <TextField
            className="address-input__input"
            label={intl.formatMessage(messages.postcode)}
            onChange={this.onInput}
          />
          <TextField className="address-input__input" label={intl.formatMessage(messages.huisnummer)} />
          <Button className="address-input__submit">{intl.formatMessage(messages.submit)}</Button>
        </form>

        {showSuggestions && (
          <div className="address-input__results">
            <h4 className="address-input__results__title">{intl.formatMessage(messages.resultaat)}</h4>
            {typedQuery}
          </div>
        )}
      </div>
    );
  }
}

AddressInput.defaultProps = {};

AddressInput.propTypes = {};

const mapStateToProps = state => {
  const { typedQuery } = state.global;
  return {
    typedQuery,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onGetSuggestions: getSuggestionsAction,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressInput);
