import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddDataService from '../../services/data'
import styles from '../marketplace/marketplace.module.css'
import PaypalButton from '../buyData/PayPalButton';

const CLIENT = {
  sandbox: process.env.PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.PAYPAL_CLIENT_ID_PRODUCTION,
};

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

class Detail extends Component {
  state={
    data: []
  }

  componentDidMount(){
    const service = new AddDataService()
    service.getDetail()
    .then(oneData => {
      const id = this.props.match.params.id
      const allData = oneData.data
      allData.filter(data => {
      if( data._id === id ) {
        return(
          this.setState({data: data})
        )
      } else {
        return 'Error'
      }
    })
   })
   .catch(err => err)
  }

  render() {
    const onSuccess = (payment) =>
      console.log('Successful payment!', payment);

    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);

    const onCancel = (data) =>
      console.log('Cancelled payment!', data);
    const data = this.state.data
    return (
      <div>
        <div className={styles.marketplace}>
          <h1 style={{marginLeft: '20.2%', paddingTop: '2%', color: 'white'}}>DATA DETAIL</h1>  
          <div key={data._id} className="card mb-3 mt-3" style={{maxWidth: '840px', marginLeft: '20%'}}>
            <div className="row no-gutters">
              <div className="col-md-15">
                <div className="card-body"> 
                  <h2 className="card-title">{data.name}</h2>
                  <div className="row">
                    <p className="card-text px-2 ml-2"><small className="text-muted">Format:  {data.format}</small></p>
                    <p className="card-text px-2"><small>Type: {data.type}</small></p>
                    <p className="card-text px-2"><small>Licence: {data.license}</small></p>
                  </div>
                  <h6 className="card-text mt-2">Description:</h6>
                  <p>{data.description}</p>
                  <h6 className="mt-3">Time Frame:</h6>
                  <div className="row" style={{marginLeft: '0%'}}>
                    <p className="card-text mr-2">From: {data.timeFrameFrom}</p>
                    <p className="card-text">To: {data.timeFrameTo}</p>
                  </div>
                  <h6 className="card-text mt-2">Source:</h6>
                  <p>{data.source}</p>
                  <h6 className="card-text">Industry:</h6>
                  <p>{data.industry}</p>
                  <h5 className="card-text" style={{marginLeft: '90%'}}>{data.value}$</h5>
                </div>
               </div>
              </div>
            </div>
          <div style={{marginLeft: '40%', width: "20%"}}>
          <PaypalButton {...this.props}
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={'USD'}
          total={data.value}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
        </div>
          </div>
      </div>
    )
  }
}

export default Detail


