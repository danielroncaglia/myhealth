import React, { Component } from 'react'
import api from './api'
import { ProgressBar } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class App extends Component {

  state = {
    records: []
  };

  componentDidMount() {
    api.readAll().then((records) => {
      this.setState({
        records: records
      });
    });
  }

  saveExam = e => {
    e.preventDefault();
    const {records} = this.state;
    const nameLabExam = this.inputExam.value;
    const examResult = this.inputResult.value;
    const examData = this.inputDate.value;

    const labexamInfo = {
      labexam: nameLabExam,
      result: examResult,
      date: examData
    };

    if (!nameLabExam) {
      alert("Write a test name");
      return false;
    }

    if (!examData) {
      alert("Define a date");
      return false;
    }

    if (!examResult) {
      alert("Inform a result");
      return false;
    }

    this.inputExam.value = "";
    this.inputDate.value = "";
    this.inputResult.value = "";

    api
      .create(labexamInfo)
      .then(response => {
        const persistedState = removeOptimistic(records).concat(response);
        this.setState({
          records: persistedState
        });
      })
  };

  labexamsRead() {
    const {records} = this.state;
    const recordsByDate = records.sort().reverse();

    return recordsByDate.map((exam, i) => {
      const {data} = exam;

      return (
        <div key={i} className="labexam-read" >
          <div className="labexam-read-content">
            <p><b>{data.labexam}:</b> {data.result} mg/dL </p>
            <p><b>Date:</b> {data.date}</p>
            <p><b>Normal Results:</b> 60 a 99 mg/dL</p>
          </div>
          <div className="labexam-read-progress">
            <ProgressBar variant="success" now={data.result}/>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>    
        <header className="header">
            <div>            
              <h1 className="header-title">My Health</h1>
              <h2 className="header-subtitle">Safely organize medical records</h2>
            </div>
        </header>
        <div className="labexam-body">
          <form className="labexam-create" onSubmit={this.saveExam}>
            <input 
              className="labexam-create_input"
              placeholder="Test"
              name="labexame"
              ref={el => (this.inputExam = el)}            
            />
            <input
            className="labexam-create_input"
            placeholder="Result"
              name="result"
              ref={rt => (this.inputResult = rt)}
            />
            <input
              className="labexam-create_input"
              type="date"
              ref={dt => (this.inputDate = dt)}
            />
            <button className="labexam-create_button" ></button>
          </form>
          </div>
          {this.labexamsRead()}
      </div>
    );
  }
}

function removeOptimistic(records) {
  return records.filter(exam => {
    return exam.ref;
  });
}