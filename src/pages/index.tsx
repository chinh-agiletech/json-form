import React, { useState } from "react";
import SimpleForm from "../components/SimpleForm";
import Modal from "../components/Modal";
import SchemaInput from "../components/SchemaInput";
import { JSONSchema7 } from 'json-schema';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dynamicSchema, setDynamicSchema] = useState<JSONSchema7 | null>(null);
  const [dynamicUiSchema, setDynamicUiSchema] = useState<any>(null);
  const [initialData, setInitialData] = useState<any>(null); // Thêm state cho dữ liệu khởi tạo

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Reset dynamic schemas when modal is closed
    setDynamicSchema(null);
    setDynamicUiSchema(null);
    setInitialData(null); // Reset dữ liệu khởi tạo
  };

  const handleSchemaGenerated = (schema: JSONSchema7, data: any) => {
    setDynamicSchema(schema);
    setInitialData(data);
    openModal(); // Mở modal ngay khi có schema
  };

  return (
    



<div>
        <SimpleForm 
        />

    </div>
  );
}
