import { useParams } from "react-router-dom";

const EditBanners = () => {
  const { id } = useParams();

  console.log(id);
  return <div></div>;
};

export default EditBanners;
