import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input } from "antd";

const KhoiKienThuc = () => {

  const [blocks, setBlocks] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const data = localStorage.getItem("blocks");
    if (data) setBlocks(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("blocks", JSON.stringify(blocks));
  }, [blocks]);

  const addBlock = () => {
    form.validateFields().then(values => {

      const newBlock = {
        id: Date.now(),
        name: values.name
      };

      setBlocks([...blocks, newBlock]);
      setOpen(false);
      form.resetFields();
    });
  };

  const deleteBlock = (id:number) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const columns = [
    { title: "Tên khối kiến thức", dataIndex: "name" },
    {
      title: "Action",
      render: (record:any)=>(
        <Button danger onClick={()=>deleteBlock(record.id)}>Xóa</Button>
      )
    }
  ];

  return (
    <div>

      <Button type="primary" onClick={()=>setOpen(true)}>
        Thêm khối kiến thức
      </Button>

      <Table columns={columns} dataSource={blocks} rowKey="id" style={{marginTop:20}}/>

      <Modal
        title="Thêm khối kiến thức"
        visible={open}
        onOk={addBlock}
        onCancel={()=>setOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên khối kiến thức"
            name="name"
            rules={[{required:true,message:"Nhập tên khối"}]}
          >
            <Input/>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default KhoiKienThuc;