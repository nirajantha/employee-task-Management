import { Table } from "antd";

const Employee: React.FC = () => {
  return (
    <>
      <section className=" flex flex-col h-[100%]">
        <Table dataSource={dataSource} columns={columns} />
      </section>
    </>
  );
};

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
    position: "Backend Developer",
    action:<div><button>edit</button> <button>delete</button></div>
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
    position: "Frontend Developer",
    action:<div><button>edit</button> <button>delete</button></div>
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

<Table dataSource={dataSource} columns={columns} />;

export default Employee;
