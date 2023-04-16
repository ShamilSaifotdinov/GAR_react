import React, { Component } from 'react';
import { RegionTable } from './AddressTable/RegionTable';

export class Home extends Component {
  static displayName = Home.name;
  // constructor(props) {
  //   super(props);
  //   this.state = { addresses: [], loading: true };
  // }

  // componentDidMount() {
  //   this.getAddresses();
  // }

  render() {
    // let contents = this.state.loading
    //   ? <p><em>Loading...</em></p>
    //   : <AddressTable addresses={this.state.addresses}/>

    return (
      <div>
        <h1 id="tableLabel">Адресообразующие элементы</h1>
        <RegionTable />
      </div>
    );
  }
}
