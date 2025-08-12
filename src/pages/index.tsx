import React, { useState } from "react";
import SimpleForm from "../components/SimpleForm";
import Modal from "../components/Modal";
import SchemaInput from "../components/SchemaInput";
import { JSONSchema7 } from 'json-schema';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dynamicSchema, setDynamicSchema] = useState<JSONSchema7 | null>(null);
  const [dynamicUiSchema, setDynamicUiSchema] = useState<any>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Reset dynamic schemas when modal is closed
    setDynamicSchema(null);
    setDynamicUiSchema(null);
  };

  const handleSchemaGenerated = (schema: JSONSchema7) => {
    setDynamicSchema(schema);
  };

  const handleUiSchemaGenerated = (uiSchema: any) => {
    setDynamicUiSchema(uiSchema);
    openModal();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div style={{
        textAlign: "center",
        marginBottom: "40px",
        paddingTop: "40px"
      }}>
        <h1 style={{
          fontSize: "36px",
          fontWeight: "700",
          color: "#1f2937",
          marginBottom: "16px"
        }}>
          UI Schema Form Generator
        </h1>
        <p style={{
          fontSize: "18px",
          color: "#6b7280",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          Create dynamic forms with custom UI styling using UI Schema JSON
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        {/* Schema Input Section */}
        <div style={{
          flex: "1",
          minWidth: "400px",
          maxWidth: "600px"
        }}>
          <SchemaInput 
            onSchemaGenerated={handleSchemaGenerated}
            onUiSchemaGenerated={handleUiSchemaGenerated}
          />
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={dynamicSchema ? "Dynamic Form (Generated from UI Schema)" : "Student Assessment Form"}
      >
        <SimpleForm 
          onClose={closeModal} 
          dynamicSchema={dynamicSchema}
          dynamicUiSchema={dynamicUiSchema}
        />
      </Modal>
    </div>
  );
}
