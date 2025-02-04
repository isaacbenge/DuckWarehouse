import { Component } from "react";

export default class DucksChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ducks: [],
            selectedDuck: null,
            duckObj: {
                color:"Red",
                size:"XLarge",
                price:0,
                quantity:0
            },
            warningMessage: false,
            color: 'Red',  //  default
            size: 'XLarge',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });

        const updatedValue = (name === 'price' || name === 'quantity') ? parseFloat(value) || 0 : value; //It must be number not string
        this.setState((prevState) => ({
            duckObj: { ...prevState.duckObj, [name]: updatedValue }
        }));
    };

    handleSubmit(e) {
        let warehouse = this.props.warehouse; //let's pass props from app.js
   
        e.preventDefault();
        const { selectedDuck } = this.state;

        let obj = { ...this.state.duckObj, 
            // deleted:false 
        };
        console.log('Submitting duck object:', obj);  // Log the submitted data
        if (selectedDuck) {
            selectedDuck.updateJson(obj, true);

            //refresh the page quickly
            this.setState({});
        } else {
            obj.color = obj.color || "Red";
            obj.size = obj.size || "XLarge";

            warehouse.addDuck(obj);
        }

        this.setState({
            duckObj: {},
            color: 'Red', // Reset to default
            size: 'XLarge',
            warningMessage: false
        })

        this.resetForm()
    }

    resetForm() {
        this.setState({
            selectedDuck: null,
            duckObj: {
                color: 'Red',  //  default
                size: 'XLarge',
                price: 0,  // Clear price input
                quantity: 0  // Clear quantity input
            },
            color: 'Red',
            size: 'XLarge',
            warningMessage: false,
        });
    }

    handleEdit(duck) {
        this.setState({
            selectedDuck: duck,
            duckObj: {
                ...duck.getJson(),
                price: duck.getJson().price,
                quantity: duck.getJson().quantity,
            }
        });
    };

    handleDelete(duck) {
        let warehouse = this.props.warehouse;
        warehouse.removeDuckfromList(duck);

        // this.setState({ warningMessage: true });
        this.resetForm();
    };

    getSoftBackground(color) {
        let softColor = {
            Red:'rgba(196, 74, 74, 0.15)',
            Green:'rgba(36, 168, 36, 0.15)',
            Yellow:'rgba(255, 255, 0, 0.15)',
            Black:'rgba(0, 0, 0, 0.15)',
            default:'#ffffff'
        }

        let finalColor = softColor[color] || softColor.default;

        return finalColor;
    }


    render() {
        let ducks = this.props.warehouse.getDucks();
        let mode = this.props.mode;

        return (
            <div className='page-colored'>

                {mode === 'store' && <h1 className="h1" style={{ marginBottom: "80px" }}>Duck Store</h1>}
                {mode === 'warehouse' && <h1 className="h1">Duck Warehouse</h1>}

                {mode === 'warehouse' && (
                    <form
                        //is this supposed to be a pop up?
                        //the pdf does not say pop up and this is fine
                        onSubmit={this.handleSubmit}
                        style={{
                            marginBottom: '20px',
                            marginTop: '20px',
                            marginLeft: '22px',
                            alignSelf: 'flex-start',
                            display: 'flex'
                        }}
                    >
                        <label className="input1">Color:</label>
                        <select
                            name="color"
                            value={this.state.duckObj.color}
                            onChange={this.handleChange}
                            disabled={!!this.state.selectedDuck}
                        >
                            {['Red', 'Green', 'Yellow', 'Black'].map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>

                        <label className="input1">Size:</label>
                        <select
                            name="size"
                            value={this.state.duckObj.size}
                            onChange={this.handleChange}
                            disabled={!!this.state.selectedDuck}
                        >
                            {['XLarge', 'Large', 'Medium', 'Small', 'XSmall'].map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>

                        <label className="input1">Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={this.state.duckObj.price}
                            onChange={this.handleChange}
                            step="0.01"
                        />

                        <label className="input1">Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={this.state.duckObj.quantity}
                            onChange={this.handleChange}
                        />

                        <button type="submit" className="pointer button2">
                            {this.state.selectedDuck ? 'Update' : 'Add'}
                        </button>

                        {this.state.selectedDuck && (
                            <button
                                className="pointer button3"
                                type="button"
                                onClick={this.resetForm}
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                )}

                <table className="table">
                    <thead className="header-row">
                        <tr className="table-row">
                            {mode === 'warehouse' && <th className="cell">Id</th>}
                            <th className="cell">Color</th>
                            <th className="cell">Size</th>
                            <th className="cell">Price</th>
                            <th className="cell">Quantity</th>
                            <th className="cell">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="main-row">
                        {ducks
                        .sort((a, b) => b.getJson().quantity - a.getJson().quantity)
                        .filter((duck) => !duck.getJson().deleted)
                        .map((duck) => (
                            <tr key={duck.getJson()._id} className="table-row">
                                {mode === 'warehouse' && <td className="cell_small">{duck.getJson()._id}</td>}

                                <td
                                    className="cell"
                                    style={{
                                        fontWeight: '600',
                                        backgroundColor: this.getSoftBackground(duck.getJson().color),
                                    }}
                                >
                                    {duck.getJson().color}
                                </td>
                                <td className="cell">{duck.getJson().size}</td>
                                <td className="cell">${duck.getJson().price}</td>
                                <td className="cell">{duck.getJson().quantity}</td>

                                {mode === 'warehouse' ? (
                                    <td className="cell">
                                        {(this.state.warningMessage && this.state.selectedDuck === duck) ? (
                                            <div style={{ display: "flex", flexDirection: "column", color: "red" }}>
                                                <span>Are you sure you want to delete this duck listing?</span>
                                                <div>
                                                    <button
                                                        className="pointer button3"
                                                        onClick={() => this.handleDelete(duck)}
                                                        style={{ marginTop: '12px' }}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="pointer button2"
                                                        onClick={this.resetForm}
                                                        style={{ marginTop: '12px' }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <button
                                                    className="pointer button1"
                                                    onClick={() => this.handleEdit(duck)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="pointer button3"
                                                    onClick={() =>
                                                        this.setState({ warningMessage: true, selectedDuck: duck })
                                                    }
                                                    style={{ marginLeft: '12px' }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                ) : (
                                    <td className="cell" style={{ textAlign: "center" }}>
                                        <button className="pointer button1">Add to Cart</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
        )
    }

}