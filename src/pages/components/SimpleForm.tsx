import React, { useState } from "react";
import MyForm from "./MyForm/MyForm";

interface FormData {
  attendance: string;
  age: string;
  workbookCompletion: string;
  workbookScore: string;
  appScore: string;
  appCompletion: string;
  lessonOutcome: string;
}

interface MyFormData {
  unitTestScore: number;
  levelFit: string;
  progressCheck: string;
  passPrediction: string;
  recommendation: string;
  teacherCommentENG: string;
  teacherCommentVIE: string;
  parentsPartnership: string;
}

interface CombinedFormData extends FormData, MyFormData {}

interface ValidationError {
  message?: string;
  stack?: string;
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

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isFormValid, setIsFormValid] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);

  const [myFormData, setMyFormData] = useState<MyFormData>({
    unitTestScore: 0,
    levelFit: "",
    progressCheck: "",
    passPrediction: "",
    recommendation: "",
    teacherCommentENG: "",
    teacherCommentVIE: "",
    parentsPartnership: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMyFormChange = (data: MyFormData) => {
    setMyFormData(data);
  };

  const handleValidation = (isValid: boolean, errors: ValidationError[]) => {
    setIsFormValid(isValid);
  };

  const handleSubmit = () => {
    const combinedData: CombinedFormData = {
      ...formData,
      ...myFormData,
    };
    console.log("Combined Form Data:", combinedData);

    if (combinedData) {
      // Reset MyForm data
      setMyFormData({
        unitTestScore: 0,
        levelFit: "",
        progressCheck: "",
        passPrediction: "",
        recommendation: "",
        teacherCommentENG: "",
        teacherCommentVIE: "",
        parentsPartnership: "",
      });

      // Trigger reset in MyForm component
      setResetCounter((prev) => prev + 1);
      setIsFormValid(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "500" as const,
    color: "#374151",
    fontSize: "14px",
  };

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "auto",
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "4px",
      }}
    >
      <style>{`
        .form-row-4-col {
          width: 23%;
          display: inline-block;
          margin-right: 2.66%;
          vertical-align: top;
          margin-bottom: 16px;
          background-color: #f9fafb;
        }
        .form-row-4-col:nth-child(4n) {
          margin-right: 0;
        }
        .form-row-3-col {
          width: 31.33%;
          display: inline-block;
          margin-right: 3%;
          vertical-align: top;
          margin-bottom: 16px;
        }
        .form-row-3-col:nth-child(3n) {
          margin-right: 0;
        }
        .form-single-col {
          width: 100%;
          margin-bottom: 20px;
        }
        .form-textarea-left {
          width: 48%;
          display: inline-block;
          margin-right: 4%;
          vertical-align: top;
          margin-bottom: 16px;
        }
        .form-textarea-right {
          width: 48%;
          display: inline-block;
          vertical-align: top;
          margin-bottom: 16px;
        }
        .char-counter {
          font-size: 12px;
          color: #6b7280;
          text-align: right;
          margin-top: 4px;
        }
        .char-counter.warning {
          color: #ef4444;
          font-weight: 500;
        }
      `}</style>

      <div>
        {/* Top row - 4 columns */}
        <div style={{ marginBottom: "16px" }}>
          <div className="form-row-4-col">
            <label style={labelStyle}>
              Attendance <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={formData.attendance}
              onChange={(e) => handleInputChange("attendance", e.target.value)}
              style={inputStyle}
              disabled={true}
            />
          </div>
          <div className="form-row-4-col">
            <label style={labelStyle}>
              Age <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              style={inputStyle}
              disabled={true}
            />
          </div>
          <div className="form-row-4-col">
            <label style={labelStyle}>
              Workbook Completion <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={formData.workbookCompletion}
              onChange={(e) =>
                handleInputChange("workbookCompletion", e.target.value)
              }
              style={inputStyle}
              disabled={true}
            />
          </div>
          <div className="form-row-4-col">
            <label style={labelStyle}>
              Workbook Score <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={formData.workbookScore}
              onChange={(e) =>
                handleInputChange("workbookScore", e.target.value)
              }
              style={inputStyle}
              disabled={true}
            />
          </div>
        </div>

        {/* Second row - 3 columns */}
        <div style={{ marginBottom: "16px" }}>
          <div className="form-row-4-col">
            <label style={labelStyle}>
              App Score <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={formData.appScore}
              onChange={(e) => handleInputChange("appScore", e.target.value)}
              style={inputStyle}
              disabled={true}
            />
          </div>
          <div className="form-row-4-col">
            <label style={labelStyle}>
              App Completion <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={formData.appCompletion}
              onChange={(e) =>
                handleInputChange("appCompletion", e.target.value)
              }
              style={inputStyle}
              disabled={true}
            />
          </div>
          <div className="form-row-4-col">
            <label style={labelStyle}>
              Lesson Outcome <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={formData.lessonOutcome}
              onChange={(e) =>
                handleInputChange("lessonOutcome", e.target.value)
              }
              style={inputStyle}
              disabled={true}
            />
          </div>
        </div>

        <MyForm
          onFormChange={handleMyFormChange}
          onValidation={handleValidation}
          resetTrigger={resetCounter}
        />

        {/* Submit button */}
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <button
            type="button"
            style={{
              padding: "12px 30px",
              backgroundColor: "#fff",
              color: "black",
              border: "1px solid black",
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
            }}
            onClick={() => setFormData(initialFormData)}
          >
            Cancel
          </button>
          <button
            type="button"
            style={{
              padding: "12px 30px",
              backgroundColor: isFormValid ? "#3b82f6" : "#d1d5db",
              color: isFormValid ? "white" : "#6b7280",
              border: "none",
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: isFormValid ? "pointer" : "not-allowed",
              opacity: isFormValid ? 1 : 0.8,
              transition: "all 0.2s ease",
            }}
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
