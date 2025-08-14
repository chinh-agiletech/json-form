"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Model } from "survey-react-ui";

interface FormData {
  attendance: string;
  age: string;
  workbookCompletion: string;
  workbookScore: string;
  appScore: string;
  appCompletion: string;
  lessonOutcome: string;
}

export default function SimpleForm() {
  const initialFormData: FormData = {
    attendance: "99.9%",
    age: "6",
    workbookCompletion: "99.9%",
    workbookScore: "99.9%",
    appScore: "99.9%",
    appCompletion: "99.9%",
    lessonOutcome: "97.5",
  };

  const surveyRef = useRef<Model | null>(null);

  const SurveyComponent = dynamic(() => import("./SurveyComponent"), { ssr: false });

  const handleSubmit = () => {
    const surveyData = surveyRef.current?.data || {};
    const combinedData = { ...initialFormData, ...surveyData };
    console.log("Data sent to server:", combinedData);
  };

  return (
    <div style={{ maxWidth: 1000, margin: "auto", padding: 0 }}>
      <div
        style={{
          border: "1px solid #d1d5db",
          borderRadius: 10,
          padding: 10,
          marginBottom: 20,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 4 cột đều nhau
          gap: 16, // khoảng cách giữa các ô
        }}
      >
        {Object.entries(initialFormData).map(([key, value]) => (
          <div
            key={key}
          >
            <label
              style={{ display: "block", marginBottom: 6, fontWeight: 500 }}
            >
              {key}
            </label>
            <input
              type="text"
              value={value}
              disabled
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 6,
                border: "1px solid #d1d5db",
              }}
            />
          </div>
        ))}
      </div>

      <SurveyComponent surveyRef={surveyRef} />

      <div
        style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}
      >
        <button
          type="button"
          style={{
            padding: "12px 30px",
            borderRadius: 50,
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
