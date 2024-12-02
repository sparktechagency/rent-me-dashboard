import { ConfigProvider, Input, Modal, Table } from 'antd'
import React, { useState } from 'react'
import { FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/common/Title';


const data = [
    {
        key: "1",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        name: "John Doe",
        location: "New York, USA",
        email: "john.doe@example.com",
        age: 28,
    },
    {
        key: "2",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        name: "Jane Smith",
        location: "Los Angeles, USA",
        email: "jane.smith@example.com",
        age: 32,
    },
    {
        key: "3",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        name: "Michael Johnson",
        location: "Chicago, USA",
        email: "michael.johnson@example.com",
        age: 25,
    },
    {
        key: "4",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
        name: "Emily Davis",
        location: "Houston, USA",
        email: "emily.davis@example.com",
        age: 29,
    },
    {
        key: "5",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
        name: "Chris Brown",
        location: "Phoenix, USA",
        email: "chris.brown@example.com",
        age: 34,
    },
    {
        key: "6",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
        name: "Sophia Wilson",
        location: "Philadelphia, USA",
        email: "sophia.wilson@example.com",
        age: 27,
    },
    {
        key: "7",
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        name: "David Taylor",
        location: "San Antonio, USA",
        email: "david.taylor@example.com",
        age: 31,
    },
    {
        key: "8",
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        name: "Olivia Martinez",
        location: "San Diego, USA",
        email: "olivia.martinez@example.com",
        age: 26,
    },
  
];


const Users = () => {
    const [search, setSearch] = useState("") 
    const navigate = useNavigate()
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
 
    const handleUser =(id)=>{
        navigate(`/user/${id}`)
    }

    const columns = [
        {
            title: "Serial No.",
            dataIndex: "name",
            key: "name",
            render: (_,record, index) =><p>{((page - 1) * itemsPerPage) + index + 1}</p>
        },
        {
            title: "User",
            dataIndex: "user",
            key: "user",
            render: (_,record, index) => <div className='flex items-center gap-x-2'>
                <img 
                    src={record?.image}
                    style={{height: 40, width: 40, borderRadius: 8}} 
                    alt=""
                />
                <p> {record?.name}</p>
            </div>
        },
        {
            title: "EMAIL",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
           
        },
        {
            title: "ACTIONS",
            dataIndex: "actions",
            key: "actions",
            render: (_,record) => <FiEye size={22} color='#999999' onClick={() => handleUser(record?.key)} className={"cursor-pointer"}/>
            
        },
    ];
    return (
        <>
            <div className='flex items-center justify-between mb-4'>
                <Title >Users</Title>
                <Input
                    style={{
                        width: 300, 
                        height: 40,
                        outline: "none",
                        border: "1px solid #d9d9d9",
                        boxShadow: "none"
                    }}
                    placeholder="Search.."
                    onChange={(e)=>setSearch(e.target.value)}
                />
            </div>

            <ConfigProvider
                theme={{
                    components: {
                        Pagination: {
                            itemActiveBg: "#007BA5",
                            borderRadius: "100%"
                        }
                    },
                    token:{
                        colorPrimary: "white"
                    }
                }}
            >
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    pagination={{
                        current: parseInt(page),
                        onChange: (page)=> setPage(page)
                    }}
                />
            </ConfigProvider>
        </>
    )
}

export default Users;