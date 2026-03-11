import React,{useState,useEffect} from "react";
import {Button,Table,Modal,Form,Input,Select,Tag} from "antd";

const QLCauHoi = () => {

const [questions,setQuestions] = useState<any[]>([]);
const [open,setOpen] = useState(false);
const [form] = Form.useForm();

useEffect(()=>{
  const data = localStorage.getItem("questions");
  if(data) setQuestions(JSON.parse(data));
},[]);

useEffect(()=>{
  localStorage.setItem("questions",JSON.stringify(questions));
},[questions]);

const addQuestion = () => {

form.validateFields().then(values=>{

const newQuestion = {
id:Date.now(),
...values
};

setQuestions([...questions,newQuestion]);

form.resetFields();
setOpen(false);

});

};

const deleteQuestion = (id:number)=>{
setQuestions(questions.filter(q=>q.id!==id));
};

const columns = [
{
title:"Nội dung câu hỏi",
dataIndex:"content"
},
{
title:"Độ khó",
dataIndex:"difficulty",
render:(d:string)=>{
const color =
d==="Dễ" ? "green" :
d==="Trung bình" ? "gold" :
d==="Khó" ? "orange" : "red";

return <Tag color={color}>{d}</Tag>
}
},
{
title:"Action",
render:(record:any)=>(
<Button danger onClick={()=>deleteQuestion(record.id)}>
Xóa
</Button>
)
}
];

return(

<div>

<Button type="primary" onClick={()=>setOpen(true)}>
Thêm câu hỏi
</Button>

<Table columns={columns} dataSource={questions} rowKey="id" style={{marginTop:20}}/>

<Modal
title="Thêm câu hỏi"
visible={open}
onOk={addQuestion}
onCancel={()=>setOpen(false)}
>

<Form form={form} layout="vertical">

<Form.Item
label="Nội dung câu hỏi"
name="content"
rules={[{required:true}]}
>
<Input.TextArea rows={4}/>
</Form.Item>

<Form.Item
label="Độ khó"
name="difficulty"
rules={[{required:true}]}
>
<Select>

<Select.Option value="Dễ">Dễ</Select.Option>
<Select.Option value="Trung bình">Trung bình</Select.Option>
<Select.Option value="Khó">Khó</Select.Option>
<Select.Option value="Rất khó">Rất khó</Select.Option>

</Select>
</Form.Item>

</Form>

</Modal>

</div>

);

};

export default QLCauHoi;