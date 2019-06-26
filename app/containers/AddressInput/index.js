import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import messages from './messages';
import { Button, TextField } from '@datapunt/asc-ui';
import { getSuggestionsAction } from '../App/actions';
import './style.scss';

const getStreetName = suggestions => {
  if (suggestions.length < 1) return null;

  const streets = suggestions.reduce(category => {
    if (category.label === 'Straatnamen') return category.content;
  });

  const { content = [] } = streets;
  if (content.length > 0) {
    return content.map(street => <div key={street.label}>{street.label}</div>);
  }

  return null;
};

class AddressInput extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onPostcodeInput = this.onPostcodeInput.bind(this);
    this.onStreetNumberInput = this.onStreetNumberInput.bind(this);
    this.state = {
      originalQuery: '',
      showSuggestions: false,
      postalCode: '',
      streetNumber: '',
    };
  }

  componentDidMount() {
    const { onGetSuggestions, suggestions } = this.props;
  }

  onFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onPostcodeInput(event) {
    const { onGetSuggestions } = this.props;
    const { streetNumber } = this.state;

    this.setState({
      showSuggestions: true,
      postalCode: event.target.value,
    });

    const query = streetNumber ? event.target.value + ' ' + streetNumber : event.target.value;
    onGetSuggestions(query);
  }

  onStreetNumberInput(event) {
    const { onGetSuggestions } = this.props;
    const { postalCode } = this.state;

    this.setState({
      streetNumber: event.target.value,
    });

    const query = postalCode + ' ' + event.target.value;
    onGetSuggestions(query);
  }

  render() {
    const { intl, onGetSuggestions, suggestions } = this.props;
    const { showSuggestions, streetNumber } = this.state;
    const streetName = getStreetName(suggestions);

    return (
      <div className="address-input">
        <h3>
          <FormattedMessage {...messages.title} />
        </h3>
        <form className="address-input__form" onSubmit={this.onFormSubmit}>
          <TextField
            className="address-input__input"
            label={intl.formatMessage(messages.postcode)}
            onChange={this.onPostcodeInput}
          />
          <TextField
            className="address-input__input"
            label={intl.formatMessage(messages.huisnummer)}
            onInput={this.onStreetNumberInput}
          />

          {showSuggestions && streetName && (
            <div className="address-input__results">
              <h4 className="address-input__results__title">{intl.formatMessage(messages.resultaat)}</h4>
              {streetName}
            </div>
          )}

          <Button className="address-input__submit">{intl.formatMessage(messages.submit)}</Button>
        </form>
      </div>
    );
  }
}

AddressInput.defaultProps = {};

AddressInput.propTypes = {};

const mapStateToProps = state => {
  const { suggestions = [] } = state.global;
  return {
    suggestions,
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
