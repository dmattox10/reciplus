import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { enter } from '../actions/enter'
import Ingredient from './Ingredient'
import Instruction from './Instruction'

class Entry extends Component {
    
    constructor() {
        super();
        this.state = {
            title: '',
            ingredient: '',
            ingredients: [],
            ingredientText: '',
            instruction: '',
            instructions: [],
            instructionText: ''
        }
        this.updateIngredientText = this.updateIngredientText.bind(this)
        this.createIngredient = this.createIngredient.bind(this)
        this.updateInstructionText = this.updateInstructionText.bind(this)
        this.createInstruction = this.createInstruction.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const recipe = {
            title: this.state.title,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions
        }
        this.props.enter(recipe);
    }

    updateIngredientText(e)
    {
        this.setState({
        ingredientText: e.target.value });

    }

    createIngredient(e)
    {
        e.preventDefault();
        this.setState({
        ingredients: [...this.state.ingredients, this.state.ingredientText],
        ingredientText: '' });

    }

    updateInstructionText(e)
    {
        this.setState({
        instructionText: e.target.value });

    }

    createInstruction(e)
    {
        e.preventDefault();
        this.setState({
        instructions: [...this.state.instructions, this.state.instructionText],
        instructionText: '' });

    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.setState({
                user: this.props.auth.user
            })
        }
    }

  render() {
    const { isAuthenticated, user } = this.props.auth
    const { ingredients, instructions } = this.state
    if (isAuthenticated) {
    return (
        <div className="container-fluid">
            <div className="bg">
            <h2 style={{marginBottom: '40px'}}>Add Recipe</h2>
                <div className="form-group">
                    <form onSubmit={ this.handleSubmit }>
                        <input
                            placeholder="Catchy Title"
                            className="form-control"  
                            name="title"
                            onChange={ this.handleInputChange }
                            value={ this.state.title }
                            /><br />
                            <input className="form-control"
                            id="ingredient" 
                            placeholder="Single ingredient, click add"
                            name="ingredient"
                            onChange={ this.updateIngredientText }
                            value={ this.state.ingredient }
                            /><br />
                            <input className="form-control"
                            id="instruction" 
                            placeholder="Single step, click add"
                            name="instruction"
                            onChange={ this.updateInstructionText }
                            value={ this.state.instruction }
                            />                        
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '20px'}}> Add Recipe as { user.name }</button>
                    </form>
                </div>
                <div className="box">
                    <ul>
                        {ingredients.map((ingredient, id) =>
                        <div><Ingredient key={ id } ingredient={ ingredient }></Ingredient> <br/ > </div>)}
                    </ul>
                </div>
                <div className="box">
                    <ul>
                        {instructions.map((instruction, id) =>
                            <div><Instruction key={ id } instruction={ instruction }></Instruction> <br/ > </div>)}
                    </ul>
                </div>
            </div>
        </div>
    )
    }
    else {
        return (
            <div>
                <h2>Please Log in to use this feature.</h2>
            </div>
        )
    }
  }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user,
})


export default connect(mapStateToProps,{ enter })(withRouter(Entry))