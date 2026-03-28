import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import { Button, Form, Input, Modal, Select, message, Tabs } from "antd";
import { LoaderCircle } from "lucide-react";
import { Popconfirm } from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import Dragger from "antd/es/upload/Dragger";
import Password from "antd/es/input/Password";

const { Meta } = Card;
const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

function Admin() {
  const [categories, setCategories] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [items, setItems] = useState([]);

  const [form] = Form.useForm();
  const [categoryForm] = Form.useForm();

  const users = [{ username: "admin", password: "password" }];

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category_id === Number(activeCategory));

  useEffect(() => {
    if (!isAuthenticated) return;

    axios
      .get("https://shiv-kripa-project.onrender.com/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));

    axios
      .get("https://shiv-kripa-project.onrender.com/categories")
      .then((res) => setCategories(res.data));
  }, [isAuthenticated]);

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let imageUrl = editingItem?.image_url;

      if (values.image) {
        const file = values.image[0].originFileObj;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Shiv_Kripa_Photo_framing");

        const cloudName = "dxps1wjsi";

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
        );

        imageUrl = res.data.secure_url;
      }

      // 🔥 EDIT MODE
      if (editingItem) {
        const updated = await axios.put(
          `https://shiv-kripa-project.onrender.com/items/${editingItem.id}`,
          {
            title: values.title,
            description: values.description,
            image_url: imageUrl,
            category_id: Number(values.category_id),
          },
        );

        // update UI
        setItems((prev) =>
          prev.map((item) =>
            item.id === editingItem.id ? updated.data : item,
          ),
        );
      } else {
        // 🔥 CREATE MODE (your old code)
        const newItem = await axios.post(
          "https://shiv-kripa-project.onrender.com/items",
          {
            title: values.title,
            description: values.description,
            image_url: imageUrl,
            category_id: Number(values.category_id),
          },
        );

        setItems((prev) => [newItem.data, ...prev]);
      }

      // cleanup
      form.resetFields();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // 🔥 stop loading
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://shiv-kripa-project.onrender.com/items/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);

    // 🔥 pre-fill form
    form.setFieldsValue({
      title: item.title,
      description: item.description,
      category_id: item.category_id,
    });
  };

  const handleAddCategory = async (values) => {
    try {
      setLoading(true)
      let imageUrl = "";

      // 🔥 Upload image to Cloudinary
      if (values.image && values.image.length > 0) {
        const file = values.image[0].originFileObj;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Shiv_Kripa_Photo_framing");

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dxps1wjsi/image/upload",
          formData,
        );

        imageUrl = res.data.secure_url;
      }

      // 🔥 Send to backend
      const response = await axios.post("http://localhost:3000/categories", {
        name: values.name,
        image_url: imageUrl,
      });

      setCategories((prev) => [...prev, response.data]);

      message.success("Category added");
      categoryForm.resetFields();
      setIsCategoryModalOpen(false);
    } catch (err) {
      console.error(err);
      message.error("Failed to add category");
    }finally{
      setLoading(false)
    }
  };

  const handleLogin = (values) => {
    const validUser = users.find(
      (u) => u.username === values.username && u.password === values.password,
    );
    if (validUser) {
      setIsAuthenticated(true);
      message.success("Login successful");
    } else {
      message.error("Invalid credentials");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-amber-100 min-h-screen flex justify-center items-center">
        <Modal title="Verify Credentials" open={true} footer={null}>
          <Form onFinish={handleLogin}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Username required" }]}
            >
              <Input autoFocus placeholder="Enter username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password required" }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" color="default" variant="solid" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-100 p-4">
      <div className="justify-center animate__animated animate__fadeIn flex flex-col items-center">
        <div className="flex justify-between w-full">
          <h1 className="text-3xl font-bold mb-4 ">Admin Page</h1>
          <div className="flex gap-4">
            <Button
              color="primary"
              variant="solid"
              onClick={() => setIsCategoryModalOpen(true)}
            >
              <PlusCircleOutlined /> Add Category
            </Button>
            <Button
              onClick={() => setIsModalOpen(true)}
              color="default"
              variant="solid"
            >
              <PlusCircleOutlined /> New Post
            </Button>
          </div>
        </div>
        <Tabs
          activeKey={activeCategory}
          onChange={(key) => setActiveCategory(key)}
          indicator={{ size: (origin) => origin - 20, align: "center" }}
          items={[
            {
              key: "all",
              label: "All",
            },
            ...categories.map((cat) => ({
              key: cat.id,
              label: capitalize(cat.name),
            })),
          ]}
        />

        <div className="grid  grid-cols-1 sm:grid-cols-3 md:grid-cols-4 justify-items-center gap-6 max-w-full mx-auto">
          {filteredItems.map((item) => (
            <Card
              style={{ width: "300px" }}
              key={item.id}
              hoverable
              className="w-full"
              cover={
                <img
                  src={item.image_url}
                  draggable={false}
                  className="h-[200px] w-full object-cover"
                />
              }
              actions={[
                <EditOutlined key="edit" onClick={() => handleEdit(item)} />,

                <Popconfirm
                  title="Delete this item?"
                  onConfirm={() => handleDelete(item.id)}
                >
                  <DeleteOutlined key="delete" />
                </Popconfirm>,
              ]}
            >
              <Meta
                title={item.title}
                description={
                  <p className="text-sm break-words line-clamp-2">
                    {item.description}
                  </p>
                }
              />
            </Card>
          ))}
        </div>
      </div>
      <Modal
        title={editingItem ? "Edit Post" : "Create New Post"}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input autoFocus placeholder="Image Name" />
          </Form.Item>
          <Form.Item name="description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} placeholder="Image Description" />
          </Form.Item>
          <Form.Item name="category_id">
            <Select placeholder="Select Category">
              {categories.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            name="image"
          >
            <Dragger beforeUpload={() => false} maxCount={1} accept="image/*">
              <p className="ant-upload-drag-icon"></p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              htmlType="submit"
              color="default"
              variant="solid"
            >
              {editingItem ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add Category"
        open={isCategoryModalOpen}
        onCancel={() => setIsCategoryModalOpen(false)}
        footer={null}
      >
        <Form form={categoryForm} onFinish={handleAddCategory}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Category name required" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: "Please Provide Image also" }]}
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Dragger beforeUpload={() => false} maxCount={1} accept="image/*">
              <p>Click or drag category image</p>
            </Dragger>
          </Form.Item>

          <Button loading={loading} htmlType="submit" color="default" variant="solid" block>
            Add Category
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default Admin;
