import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
export default function Blog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [imageBlog, setImageBlog] = useState(null);
  const [imagePercent, setImagePrecent] = useState(0);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePrecent(Math.round(progress));
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, image: downloadURL });
        });
      }
    );
  };
  useEffect(() => {
    if (imageBlog) {
      handleFileUpload(imageBlog);
    }
  }, [imageBlog]);
  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/blog/createBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      }
      if (res.ok) {
        navigate(`/blog/${data.blog.slug}`);
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex justify-around min-h-screen bg-slate-900">
      <SideBar></SideBar>
      <div className="mx-auto mt-14 ">
        <h1 className="text-3xl font-semibold text-center text-white">
          Write Blog
        </h1>
        <div className="w-[500px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label id="title" className="text-white">
                Title
              </label>
              <input
                onChange={handleChanges}
                id="title"
                placeholder="Title"
                className="p-3 text-white transition-all rounded-lg outline-none bg-slate-800 focus:outline-white"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2 p-3 border border-white border-solid rounded-lg">
              <label className="text-white">Image</label>
              <div className="flex items-center justify-between">
                <input
                  onChange={(e) => setImageBlog(e.target.files[0])}
                  className="text-white cursor-pointer"
                  type="file"
                  accept="image/*"
                />
              </div>
              {imagePercent == 100 ? (
                <img className="rounded-lg" src={formData.image} alt="" />
              ) : (
                imagePercent == 0 && (
                  <p className="hidden text-center text-white">
                    {imagePercent}%
                  </p>
                )
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white">Description</label>
              <textarea
                onChange={handleChanges}
                id="description"
                className="px-3 py-12 text-white transition-all rounded-lg outline-none bg-slate-800 focus:outline-white"
                placeholder="Description Blog"
              ></textarea>
            </div>
            <button className="p-3 text-white rounded-lg bg-slate-700">
              Post a Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
