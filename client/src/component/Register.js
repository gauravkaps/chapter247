import React, { Component } from 'react';
import countryCode from '../assets/country.json';
import ApolloClient from 'apollo-boost';
import {graphql} from 'react-apollo';
// import { compose } from "recompose";
import { addUserMutation} from "../query/queries";


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            countryStateInfo: {
                "USA": {
                    "California": [
                        "Los Angeles",
                        "San Diego"
                    ],
                    "Texas": [
                        "Dallas",
                        "Austin"
                    ]
                },
                "India": {
                    "Assam": [
                        "Dispur",
                        "Guwahati"
                    ],
                    "Gujarat": [
                        "Vadodara",
                        "Surat"
                    ]
                }
            }, 
            country: ["USA", "India"],
            state: [],
            city: [],
            selectedCountry: "",
            selectedState: "",
            selectedCity: "",
            skills: [],
            selectedCountryCode: countryCode[0].dial_code,
            email: "",
            password: "",
            gender: "",
            contactNumber: "",

        }
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeSkill = this.onChangeSkill.bind(this);
        this.handelChange = this.handelChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }
    onChangeCountry(e){
        var country = e.target.value;
        if(country != ""){
            var state = this.state.countryStateInfo[country];
            var state = Object.keys(state);
            state = state.map((value, index) => {
                return (<option key={index} value={value} >{value}</option>);
            })
            this.setState({
                selectedCountry: country,
                selectedState:"",
                state,
                city: []
            });
        }else{
            console.log('here we are');
            this.setState({
                selectedCountry: "",
                selectedState: "",
                selectedCity: "",
                state: [],
                city: []
            });
        }
    }
    onChangeState(e){
        var state = e.target.value;
        console.log(state);
        if(state != ""){
            var city = this.state.countryStateInfo[this.state.selectedCountry][state];
            city = city.map((value, index) => {
                console.log(value)
                return (<option key={index} value={value}>{value}</option>);
            });
            console.log(state);
            this.setState({
                selectedState: state,
                city
            });
        }else{
            this.setState({
                selectedState: "",
                selectedCity: "",
                city: []
            });
        }
    }
    onChangeSkill(e){
        const options = this.state.skills
        let index
        console.log(e.target.value);
        if (e.target.checked) {
            options.push(e.target.value)
        } else {
            index = options.indexOf(e.target.value)
            options.splice(index, 1)
        }
        this.setState({ skills: options }, () => {
            console.log(this.state.skills)
        })
    }
    handelChange(e){
        if(e.target.name == "email"){
            this.setState({
                email: e.target.value
            })
        }else if(e.target.name == "password"){
            this.setState({
                password: e.target.value
            })
        }else if(e.target.name == "gender"){
            this.setState({
                gender: e.target.value
            })
        }else if(e.target.name == "countryCode"){
            this.setState({
                selectedCountryCode: e.target.value
            })
        }else if(e.target.name == "contactNumber"){
            this.setState({
                contactNumber: this.state.selectedCountryCode+e.target.value
            })
        }else if(e.target.name == "city"){
            this.setState({
                selectedCity: e.target.value
            })
        }
    }

    formSubmit(e){
        e.preventDefault();
        // mutation for add user
        this.props.addUserMutation({
            variables:{
                email: this.state.email,
                password: this.state.password,
                gender: this.state.gender,
                country: this.state.selectedCountry,
                state: this.state.selectedState,
                city: this.state.selectedCity,
                skills: this.state.skills.join(","),
                contactNumber: this.state.contactNumber

            }
        }).then(res => {
            alert("Data save successfully");
            document.getElementById("react-form").reset();
        })
        .catch(err => {
            alert("Data is not save, please try again");
        });

    }
    render() {
        let countryList = this.state.country.map((value, index) => {
            return (<option key={index} value={value}>{value}</option>);
        });
        let countryCodeList = countryCode.map((value, index) => {
            return (<option key={index} value={value.dial_code}>{value.dial_code}</option>);
        })
        return (
            
                <div>
                    <h1>Register</h1>
                    <form onSubmit={this.formSubmit} id="react-form">
                        <div className="form-group form-field md-form">
                            <label>Email</label>
                            <input type="email" name="email" className="form-control" onChange={this.handelChange}/>
                        </div>
                        <div className="form-group form-field md-form">
                            <label>Password</label>
                            <input type="password" name="password" className="form-control" onChange={this.handelChange}/>
                        </div>
                        <div className="form-group form-field md-form">
                            <label>Gender</label>
                            <input type="radio" name="gender" value="male" onChange={this.handelChange}/> Male&nbsp;&nbsp;&nbsp;  
                            <input type="radio" name="gender" value="female" onChange={this.handelChange}/> Female  
                        </div>
                        <div className="form-group form-field md-form">
                            <label>Country</label>
                            <select onChange={this.onChangeCountry} className="mdb-select form-control">
                                <option value="">Select Country</option>
                                {countryList}
                            </select>
                        </div>
                        <div className="form-group form-field md-form">
                            <label>State</label>
                            <select value={this.state.selectedState} onChange={this.onChangeState} className="mdb-select form-control">
                                <option value="">Select State</option>
                                {this.state.state}
                            </select>
                        </div>
                        <div className="form-group form-field md-form">
                            <label>City</label>
                            <select name="city" className="mdb-select form-control" onChange={this.handelChange}>
                                <option value="">Select City</option>
                                {this.state.city}
                            </select>
                        </div>
                        <div className="form-group form-field md-form">
                            <label>Contact no.</label>
                            <div className="country-and-number">
                                <select name="countryCode" className="form-control country-codes" onChange={this.handelChange}>
                                    {countryCodeList}
                                </select>
                                <input type="number" name="contactNumber" className="form-control" onChange={this.handelChange}/>
                            </div>
                        </div>
                        <div className="form-group form-field md-form">
                            <label>Skills</label>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" value="QA" name="skill" onChange={this.onChangeSkill}/> <label className="form-check-label">QA</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="BDE" name="skill" onChange={this.onChangeSkill}/> <label className="form-check-label">BDE</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="BA" name="skill" onChange={this.onChangeSkill}/> <label className="form-check-label">BA</label>  
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="HR" name="skill" onChange={this.onChangeSkill}/> <label className="form-check-label">HR</label>
                            </div>
                        </div>
                        <div className="form-group form-field md-form">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
        )
    }
}

export default graphql(addUserMutation, {
    name: "addUserMutation"
})(Register);