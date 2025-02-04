import React, { Component,} from 'react';
import './App.css';
import DucksChart from './views/ducksChart.js';
import WareHouseInterface from './core/warehouseInterface.js';


export default class App extends Component {
  constructor(props){
    super(props);

    let whInterface = new WareHouseInterface();
    let warehouse = whInterface.createWarehouse();
    let observer = whInterface.getObserver();

    this.state = {
      activeTab:'warehouse',
      warehouse: warehouse,
      observer: observer,
      interface: whInterface,
    }
    this.setTab = this.setTab.bind(this);
  }

  componentDidMount(){
    const warehouse = this.state.warehouse;
    warehouse.initializeDuckList();
    // Subscribe to observer notifications
    this.state.observer.subscribe((obj) => {
        this.setState({ ...obj });
    });

    // Initialize duck list
   
  }

  setTab(tab) {
    this.setState({ activeTab: tab });
  }

  render(){
    const { activeTab } = this.state
//remember to props pass warehouse
    return (
      <div className="App">
        <nav style={{ display: "flex", marginTop: "18px", width: "100%", justifyContent: "left", marginLeft: "4px" }}>
          
          <button
            className={activeTab === 'warehouse' ? 'button-tab' : 'button-untab'}
            onClick={() => this.setTab('warehouse')}
          >
            Duck Warehouse
          </button>
          <button
            className={activeTab === 'warehouse' ? 'button-untab' : 'button-tab'}
            onClick={() => this.setTab('store')}
          >
            Duck Store
          </button>
        </nav>

        {activeTab === 'warehouse' && <DucksChart mode="warehouse" warehouse={this.state.warehouse} />}
        {activeTab === 'store' && <DucksChart mode="store" warehouse={this.state.warehouse} />}
      </div>
    );
  }
}
