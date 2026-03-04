import { DatePicker } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  Popconfirm,
  Tag,
} from "antd";

type Schedule = {
  id: number;
  datetime: string;
  duration: number;
  content: string;
  note: string;
};

type Subject = {
  id: number;
  name: string;
  schedules: Schedule[];
  monthlyGoal: number;
};

const StudyManager: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectModal, setSubjectModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [currentSubjectId, setCurrentSubjectId] = useState<number | null>(null);

  const [form] = Form.useForm();
  const [scheduleForm] = Form.useForm();

 

  useEffect(() => {
    const saved = localStorage.getItem("studyData");
    if (saved) setSubjects(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("studyData", JSON.stringify(subjects));
  }, [subjects]);



  const openAddSubject = () => {
    setEditingSubject(null);
    form.resetFields();
    setSubjectModal(true);
  };

  const openEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    form.setFieldsValue(subject);
    setSubjectModal(true);
  };

  const submitSubject = () => {
    form.validateFields().then((values) => {
      if (editingSubject) {
        setSubjects((prev) =>
          prev.map((s) =>
            s.id === editingSubject.id ? { ...s, ...values } : s
          )
        );
      } else {
        const newSubject: Subject = {
          id: Date.now(),
          name: values.name,
          monthlyGoal: values.monthlyGoal || 0,
          schedules: [],
        };
        setSubjects([...subjects, newSubject]);
      }
      setSubjectModal(false);
    });
  };

  const deleteSubject = (id: number) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

 

  const openAddSchedule = (subjectId: number) => {
    setCurrentSubjectId(subjectId);
    scheduleForm.resetFields();
    setScheduleModal(true);
  };

  const submitSchedule = () => {
    scheduleForm.validateFields().then((values) => {
      setSubjects((prev) =>
        prev.map((s) =>
          s.id === currentSubjectId
            ? {
                ...s,
                schedules: [
                  ...s.schedules,
                  { id: Date.now(), ...values },
                ],
              }
            : s
        )
      );
      setScheduleModal(false);
    });
  };

  const deleteSchedule = (subjectId: number, scheduleId: number) => {
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === subjectId
          ? {
              ...s,
              schedules: s.schedules.filter((sch) => sch.id !== scheduleId),
            }
          : s
      )
    );
  };

  const totalHours = (subject: Subject) =>
    subject.schedules.reduce((sum, s) => sum + s.duration, 0);



  const subjectColumns = [
    {
      title: "Tên môn",
      dataIndex: "name",
    },
    {
      title: "Tổng giờ học",
      render: (_: any, record: Subject) => totalHours(record),
    },
    {
      title: "Mục tiêu",
      dataIndex: "monthlyGoal",
    },
    {
      title: "Trạng thái",
      render: (_: any, record: Subject) =>
        totalHours(record) >= record.monthlyGoal &&
        record.monthlyGoal > 0 ? (
          <Tag color="green">Đã đạt</Tag>
        ) : (
          <Tag color="red">Chưa đạt</Tag>
        ),
    },
    {
      title: "Hành động",
      render: (_: any, record: Subject) => (
        <Space>
          <Button onClick={() => openEditSubject(record)}>Sửa</Button>
          <Button onClick={() => openAddSchedule(record.id)}>
            Thêm lịch
          </Button>
          <Popconfirm
            title="Xóa môn này?"
            onConfirm={() => deleteSubject(record.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  return (
    <div>
      <h2>Quản lý tiến độ học tập</h2>

      <Button type="primary" onClick={openAddSubject}>
        Thêm môn
      </Button>

      <Table
        rowKey="id"
        columns={subjectColumns}
        dataSource={subjects}
        expandable={{
          expandedRowRender: (subject: Subject) => (
            <Table
              rowKey="id"
              dataSource={subject.schedules}
              pagination={false}
              columns={[
                { title: "Ngày giờ", dataIndex: "datetime" },
                { title: "Thời lượng", dataIndex: "duration" },
                { title: "Nội dung", dataIndex: "content" },
                { title: "Ghi chú", dataIndex: "note" },
                {
                  title: "Xóa",
                  render: (_: any, sch: Schedule) => (
                    <Button
                      danger
                      onClick={() =>
                        deleteSchedule(subject.id, sch.id)
                      }
                    >
                      Xóa
                    </Button>
                  ),
                },
              ]}
            />
          ),
        }}
      />

      {/* Modal môn học */}
      <Modal
        title={editingSubject ? "Sửa môn" : "Thêm môn"}
        visible={subjectModal}
        onOk={submitSubject}
        onCancel={() => setSubjectModal(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên môn"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="monthlyGoal" label="Mục tiêu giờ tháng">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal lịch học */}
      <Modal
        title="Thêm lịch học"
        visible={scheduleModal}
        onOk={submitSchedule}
        onCancel={() => setScheduleModal(false)}
      >
        <Form form={scheduleForm} layout="vertical">
          <Form.Item
            name="datetime"
            label="Ngày giờ"
            rules={[{ required: true, message: "Chọn ngày giờ!" }]}
          >
            <DatePicker
              showTime
              format="DD/MM/YYYY HH:mm"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item name="duration" label="Thời lượng (giờ)" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="content" label="Nội dung">
            <Input />
          </Form.Item>
          <Form.Item name="note" label="Ghi chú">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudyManager;