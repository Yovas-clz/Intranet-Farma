import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import SatisfaccionForm from "../components/encuesta/SatisfaccionForm";
import ResumenEncuesta from "../components/encuesta/ResumenEncuesta";

import "../styles/encuesta.css";

export default function Encuesta() {
  const [surveyResponses, setSurveyResponses] = useState([]);

  const handleSurveySubmit = (value) => {
    setSurveyResponses((prev) => [...prev, value]);
  };

  return (
    <div className="main-container">

      <Sidebar active="encuesta" />

      <div className="content">

        <Navbar title="Encuesta" />

        <h1 className="title">Encuesta</h1>

        <div className="survey-container">

          <SatisfaccionForm onSubmit={handleSurveySubmit} />

          <ResumenEncuesta surveyResponses={surveyResponses} />

        </div>

      </div>
    </div>
  );
}