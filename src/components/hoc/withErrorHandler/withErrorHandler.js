import React, { Component } from 'react';

import Modal from '../../UI/Modal/Modal';

const withErrorHandler = (WrappedCompenent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentDidMount() {
      axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });

      axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error });
        }
      );
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : ''}
          </Modal>
          <WrappedCompenent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
