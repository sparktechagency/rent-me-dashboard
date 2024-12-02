import { Table } from 'antd';
import React, {  useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6'; 
import blog from "../../assets/backgroundImage.png"
import DetailsBlog from '../../components/ui/Blogs/DetailsBlog';
import CreateBlog from '../../components/ui/Blogs/CreateBlog';
import Title from '../../components/common/Title';

const data = [
    {
      key: 1,
      id: 101,
      name: "Finding Love in the Digital Age",
      description: "Exploring how modern technology reshapes romance and the importance of authenticity.",
      date: "2024-10-01",
      image: blog
    },
    {
      key: 2,
      id: 102,
      name: "Navigating First Dates with Confidence",
      description: "Tips for making first dates comfortable and memorable experiences.",
      date: "2024-09-15",
      image: blog
    },
    {
      key: 3,
      id: 103,
      name: "Long-Distance Love Stories",
      description: "Real-life tales and tips for maintaining a long-distance relationship.",
      date: "2024-08-25",
      image: blog
    },
    {
      key: 4,
      id: 104,
      name: "The Psychology of Attraction",
      description: "Understanding what makes people attracted to each other and how it impacts relationships.",
      date: "2024-08-05",
      image: blog
    },
    {
      key: 5,
      id: 105,
      name: "Date Night Ideas for Every Season",
      description: "Creative date night ideas to keep the romance alive year-round.",
      date: "2024-07-20",
      image: blog
    },
    {
      key: 6,
      id: 106,
      name: "How to Move On from a Breakup",
      description: "Practical advice on healing and rediscovering yourself after a breakup.",
      date: "2024-06-12",
      image: blog
    }
  ];
   

const Blogs = () => { 
    const [openAddModel, setOpenAddModel] = useState(false);
    const [getNews, setGetNews] = useState(null);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [itemForEdit, setItemForEdit] = useState(null);  
    const perPageSize = 10
 

    const columns = [
        {
          title: "S.No",
          dataIndex: "key",
          key: "key", 
          render:(key)=><p>{((page-1)*perPageSize)+key}</p>
        },
        {
          title: "News Title",
          dataIndex: "image",
          key: "image",
          align: "center",
          render: (img, record) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 12,
                }} 
                className=' '
              >
              <img src={img} height={100} width={110} className="rounded-lg" />
                <p className='w-[200px] truncate'>{record?.name}</p>
              </div>
            );
          },
        },
        {
          title: "Publication Date",
          dataIndex: "date",
          key: "date",
          align: "center",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          align: "center",
          render: (_, record) => (
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
              }}
            >
              <button
                onClick={() => {
                  setOpen(true), setGetNews(record);
                }}
                style={{
                  cursor: "pointer",
                  border: "none",
                  outline: "none",
                  color: "#00809E",
                  background: "white",
                }}
              >
                <FaEye size={22} />
              </button>
    
              <button
                onClick={() => {
                  setOpenAddModel(true), setItemForEdit(record);
                }}
                style={{
                  cursor: "pointer",
                  border: "none",
                  outline: "none",
                  color: "#00809E",
                  background: "white",
                }}
              >
                <CiEdit size={25} />
              </button>
              <button
                onClick={() => handleDelete(record?.id)}
                style={{
                  cursor: "pointer",
                  border: "none",
                  outline: "none",
                  background: "white",
                  color: "red",
                }}
              >
                <FaRegTrashAlt size={20} />
              </button>
            </p>
          ),
        },
      ];


    return (
        <div>
            
            {/* header */}
            <div className='flex items-center justify-between mb-4'>
                <Title className=''>Blogs</Title>
                <button onClick={()=> setOpenAddModel(true)} className='bg-primary text-white h-10 px-4 rounded-md'>+ Add Blog</button>
            </div>

            <Table dataSource={data} pagination={false} columns={columns}  />
             <DetailsBlog open={open} setOpen={setOpen} getNews={getNews} />
      <CreateBlog itemForEdit={itemForEdit} setItemForEdit={setItemForEdit} setOpenAddModel={setOpenAddModel} openAddModel={openAddModel} />

        </div>
    )
}

export default Blogs