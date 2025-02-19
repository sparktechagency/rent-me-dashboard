import React, { useState } from "react";
import {
  useAddCategoryMutation,
  useAllCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/apiSlices/categorySlice";
import { Table, Button, Modal, Form, Input, Upload, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import whiteBg from "../../assets/whiteBG.png";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import moment from "moment/moment";

const Categories = () => {
  const [imgURL, setImgURL] = useState();
  const [file, setFile] = useState(null);
  const { data: getAllCategories, isLoading } = useAllCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const [form] = Form.useForm();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const categories = getAllCategories?.data;

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const onChangeImage = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const imgUrl = URL.createObjectURL(selectedFile);
      setImgURL(imgUrl);
      setFile(selectedFile);
    }
  };

  const handleAddOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      const data = {
        name: values.name,
      };
      formData.append("data", JSON.stringify(data));
      if (file) {
        formData.append("image", file);
      } else {
        message.error("Please upload an image.");
        return;
      }
      await addCategory(formData).unwrap();
      message.success("Category added successfully!");
      setIsAddModalVisible(false);
      form.resetFields();
      setFile(null);
      setImgURL(null);
    } catch (error) {
      message.error(
        `Failed to add category: ${error.data?.message || error.message}`
      );
    }
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const showEditModal = (category) => {
    setCurrentCategory(category);
    form.setFieldsValue({ name: category.name });
    setImgURL(
      category?.image?.startsWith("http")
        ? category?.image
        : `${import.meta.env.VITE_BASE_URL}${category?.image}`
    );
    setFile(category.image);
    setIsEditModalVisible(true);
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      const data = {
        name: values.name,
      };
      formData.append("data", JSON.stringify(data));
      if (file) {
        formData.append("image", file);
      } else {
        message.error("Please upload an image.");
        return;
      }
      console.log(currentCategory.id);
      await updateCategory({
        id: currentCategory.id,
        data: formData,
      }).unwrap();

      message.success("Category updated successfully!");
      setIsEditModalVisible(false);
      form.resetFields();
      setFile(null);
      setImgURL(null);
    } catch (error) {
      message.error(
        `Failed to update category: ${error.data?.message || error.message}`
      );
    }
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id).unwrap();
      message.success("Category deleted successfully!");
    } catch (error) {
      message.error("Failed to delete category: " + error.message);
    }
  };

  const columns = [
    {
      title: "Serial No",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          src={
            text.startsWith("http")
              ? text
              : `${import.meta.env.VITE_BASE_URL}${text}`
          }
          alt="category"
          className="w-16 h-14 object-cover rounded-lg"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Creation Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (record) => {
        return <p>{moment(record.createdAt).format("L")}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <>
            <span>
              <Button
                icon={<EditOutlined />}
                style={{ marginRight: 8 }}
                onClick={() => showEditModal(record)}
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.id)}
              />
            </span>
          </>
        );
      },
    },
  ];

  const dataSource = categories?.map((category, index) => ({
    key: index,
    id: category._id,
    image: category.image,
    name: category.name,
    createdAt: category.createdAt,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <Button
          className="py-5 bg-primary font-bold"
          icon={<PlusOutlined />}
          onClick={showAddModal}
          style={{ marginBottom: 16 }}
        >
          Add Category
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        title="Add Category"
        open={isAddModalVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex flex-col items-center mb-4">
            <input
              onChange={onChangeImage}
              type="file"
              id="img"
              style={{ display: "none" }}
            />
            <label
              htmlFor="img"
              className="relative w-full h-80 cursor-pointer border border-gray-300 bg-white bg-cover bg-center shadow-sm hover:shadow-lg transition-shadow duration-300"
              style={{
                backgroundImage: `url(${imgURL ? imgURL : whiteBg})`,
              }}
            >
              {!imgURL && (
                <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <MdOutlineAddPhotoAlternate
                    size={60}
                    className="text-gray-600"
                  />
                </div>
              )}
            </label>
            <p className="mt-2 text-sm text-gray-500">Click to upload image</p>
          </div>
        </Form>
      </Modal>
      <Modal
        title="Edit Category"
        open={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex flex-col items-center mb-4">
            <input
              onChange={onChangeImage}
              type="file"
              id="img"
              style={{ display: "none" }}
            />
            <label
              htmlFor="img"
              className="relative w-full h-80 cursor-pointer border border-gray-300 bg-white bg-cover bg-center shadow-sm hover:shadow-lg transition-shadow duration-300"
              style={{
                backgroundImage: `url(${imgURL ? imgURL : whiteBg})`,
              }}
            >
              {!imgURL && (
                <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <MdOutlineAddPhotoAlternate
                    size={60}
                    className="text-gray-600"
                  />
                </div>
              )}
            </label>
            <p className="mt-2 text-sm text-gray-500">Click to upload image</p>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
