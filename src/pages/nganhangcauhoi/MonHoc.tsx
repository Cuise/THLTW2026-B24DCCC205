import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input,InputNumber } from "antd";

const MonHoc = () => {

  const [subjects,setSubjects] = useState<any[]>([]);
  const [open,setOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(()=>{
    const data = localStorage.getItem("subjects");
    if(data) setSubjects(JSON.parse(data));
  },[]);

  useEffect(()=>{
    localStorage.setItem("subjects",JSON.stringify(subjects));
  },[subjects]);

  const addSubject = () => {

    form.validateFields().then(values=>{

      const newSubject = {
        id:Date.now(),
        ...values
      };

      setSubjects([...subjects,newSubject]);

      form.resetFields();
      setOpen(false);

    });

  };

  const deleteSubject = (id:number)=>{
    setSubjects(subjects.filter(s=>s.id!==id));
  };

  const columns = [
    {title:"Mã môn",dataIndex:"code"},
    {title:"Tên môn",dataIndex:"name"},
    {title:"Tín chỉ",dataIndex:"credit"},
    {
      title:"Action",
      render:(record:any)=>(
        <Button danger onClick={()=>deleteSubject(record.id)}>
          Xóa
        </Button>
      )
    }
  ];

  return(
    <div>

      <Button type="primary" onClick={()=>setOpen(true)}>
        Thêm môn học
      </Button>

      <Table columns={columns} dataSource={subjects} rowKey="id" style={{marginTop:20}}/>

      <Modal
        title="Thêm môn học"
        visible={open}
        onOk={addSubject}
        onCancel={()=>setOpen(false)}
      >

        <Form form={form} layout="vertical">

          <Form.Item
            label="Mã môn"
            name="code"
            rules={[{required:true}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Tên môn"
            name="name"
            rules={[{required:true}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Số tín chỉ"
            name="credit"
            rules={[{ required: true, message: "Nhập số tín chỉ" }]}
          >
            <InputNumber min={1} max={10} style={{ width: "100%" }} />
          </Form.Item>

        </Form>

      </Modal>

    </div>
  )
}

export default MonHoc;