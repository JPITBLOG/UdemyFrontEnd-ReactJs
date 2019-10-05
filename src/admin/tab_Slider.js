import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import {Input} from 'reactstrap';
import {bindActionCreators} from 'redux';
import * as instructorDetailAction from '../action/instructorDetail';
import Courses from "./courses";



class TabSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key:null,
            instructor : null
        };
        this.instructorArray = [];
        this.handleSelect = this.handleSelect.bind(this);
        this.getAllInstructor = this.getAllInstructor.bind(this);
        this.instructorSelect = this.instructorSelect.bind(this);
    }
    handleSelect(key) {
        if(key != this.state.key){
            this.setState({key});
        }
    }

    getAllInstructor = () => {
        const that = this;
        console.log(this.props.instructor.AllInstructor.length);
            if (this.props.instructor.AllInstructor.length > 0) {
                this.props.instructor.AllInstructor.map(function (instructor, index) {
                    that.instructorArray.push(<option key={index}>
                        {instructor.name}</option>);
                })
            }
            return this.instructorArray;
    }

    getAllcategory(){
        let categoryFilter = [];
        let Allfilteredtopic = [];
        let categoryTab = [];
        const that = this;
        try {
            this.props.categorydetail.Allcategory.map(function (category, index) {

                let subcategoryFilter = category.subcategory.filter((subcategory) => {
                    return subcategory.subcategory.length > 0;
                })
                if (subcategoryFilter.length > 0) {
                    categoryFilter.push(category.name);
                    let ctgryTopic = [];
                    subcategoryFilter.map(function (subtopic, index) {
                        subtopic.subcategory.map(function (topic, index) {
                            ctgryTopic.push(topic.name);
                        })
                    });
                    Allfilteredtopic.push(ctgryTopic);
                }
            });
            if(that.state.key == null){
                that.setState({key:categoryFilter[0]})
            }

            categoryFilter.map(function (category, index) {
                categoryTab.push(<Tab key={category} eventKey={category} title={category}>{category}</Tab>);
            });

            return categoryTab;
        }
        catch (e) {
            console.log("there is an error while fetching subcategory data: ",e);
        }
    }

    instructorSelect = async (e) => {
        e.preventDefault();
        console.log("event triggered",e.target.value);
        if(e.target.value == 'Select Instructor')
            await this.setState({instructor:null})
        else
            await this.setState({instructor:e.target.value});
    }

    render () {
        return(
            <div>{this.state.instructor == null ? (
                <Tabs onSelect={this.handleSelect}
                      id="controlled-tab-example">
                    {this.getAllcategory()}
                </Tabs>
            ) : null}
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-8'>
                        <Courses topic={this.state.key} instructor={this.state.instructor}/>
                    </div>
                    <div className='col-md-4 instructor'>
                        <Input type="select" name="instructorSelect" id="instructorSelect" onChange={(event) => this.instructorSelect(event)}>
                            <option value={null}>Select Instructor</option>
                            {this.getAllInstructor()}
                        </Input>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { categorydetail,courses,instructor}  = state;
    return {
        categorydetail : categorydetail,
        courses : courses,
        instructor:instructor
    }
};

const mapDispatchToProps = dispatch => ({
    action:{
        instructorDetail : bindActionCreators(instructorDetailAction,dispatch)
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(TabSlider);
