import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { useState } from "react";

const YouTubeForm = ({ getData }) => {
  const [image, setImage] = useState("");

  const convertBase64 = (file) => {
    const reader =  new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        setImage(reader.result)
      }
  };

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      gender: "Male",
      hobbies: [],
      age: "",
    },
  });
  const { register, control, handleSubmit, formState, reset, onChange } = form;
  const { errors } = formState;
  const onSubmit = (data) => {
    data.image = image;
    axios.post("http://localhost:3000/users", data).then(() => {
      getData();
    });
    reset();
  };

  const handleImageChange = (event) => {
    convertBase64(event.target.files[0]);
  }

  return (
    <div>
      <h3>YouTube Form</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid Email",
              },
              required: "Email is required",
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control-extra">
          <div>
            <label>Select your gender</label>
            <select id="gender" {...register("gender")}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label>Select Hobies</label>
            <label>
              <input
                {...register("hobbies", { required: "select one hobbie" })}
                type="checkbox"
                value="music"
              />
              music
            </label>
            <label>
              <input {...register("hobbies")} type="checkbox" value="movies" />
              movies
            </label>
            <label>
              <input {...register("hobbies")} type="checkbox" value="sports" />
              sports
            </label>
            <p className="error">{errors.hobbies?.message}</p>
          </div>
        </div>
        <div className="form-control-extra">
          <div>
            <label>Age Group</label>
            <lable>
              <input
                {...register("age", { required: "select one age group" })}
                type="radio"
                value="child"
              />
              child
            </lable>
            <lable>
              <input {...register("age")} type="radio" value="adult" />
              adult
            </lable>
            <lable>
              <input {...register("age")} type="radio" value="older" />
              older
            </lable>
            <p className="error">{errors.age?.message}</p>
          </div>
          <div>
            <label>input image</label>
            <input type="file" {...register("image", {
                onChange: handleImageChange
            })} />
          </div>
        </div>
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
