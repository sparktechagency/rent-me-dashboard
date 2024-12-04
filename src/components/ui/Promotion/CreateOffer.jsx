import React from "react";
import { Button, DatePicker, Form, Input, Upload } from "antd";
import { BiUpload } from "react-icons/bi";

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    span: 24, // Full width for label
  },
  wrapperCol: {
    span: 24, // Full width for input
  },
};

const onFinish = (values) => {
  console.log("Success:", values);
};

const props = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      console.log(`${info.file.name} file upload failed.`);
    }
  },
};

const CreateOffer = () => {
  return (
    <Form
      className="bg-white border p-5 rounded-2xl"
      {...formItemLayout}
      style={{
        maxWidth: 600,
      }}
      onFinish={onFinish}
    >
      {/* Input Field */}
      <Form.Item label="Title" name="title">
        <Input placeholder="Place a Name" />
      </Form.Item>

      {/* RangePicker and Upload on Same Line */}
      <Form.Item>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          {/* RangePicker with Label */}
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Validity
            </label>
            <Form.Item
              name="Validity"
              style={{
                marginBottom: 0,
              }}
            >
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>

          {/* Upload Input */}
          <Form.Item
            name="Upload"
            label="Upload Promotion Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            style={{
              marginBottom: 0,
              marginTop: 25, // To align properly
            }}
          >
            <Upload {...props}>
              <Button icon={<BiUpload />} title="Click to Upload">
                Upload File
              </Button>
            </Upload>
          </Form.Item>
        </div>
      </Form.Item>

      {/* TextArea */}
      <Form.Item label="Description" name="TextArea">
        <Input.TextArea placeholder="11/5/24 -          22/8/24" />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button
          type="primary"
          className="w-full bg-[#FFD900] text-black py-5"
          htmlType="submit"
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateOffer;
